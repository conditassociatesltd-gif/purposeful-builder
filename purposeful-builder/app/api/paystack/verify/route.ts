import { NextRequest, NextResponse } from "next/server";
import { isPaystackConfigured, verifyPaystackPayment } from "@/lib/paystack";
import { updateOrderStatus, getOrderByReference } from "@/lib/db";
import { sendConfirmedOrderEmails } from "@/lib/email";

/**
 * GET /api/paystack/verify?reference=<order_reference>
 *
 * Called after Paystack redirects the customer back to the site.
 * - Verifies payment on the server (never trusts the redirect alone)
 * - Idempotent: safe to call multiple times for the same reference
 * - Sends emails only on FIRST successful verification (not duplicates)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json({ error: "Reference parameter missing." }, { status: 400 });
    }

    // 1. Look up existing order
    const existingOrder = await getOrderByReference(reference);

    // 2. Idempotency: if already confirmed, return success without re-emailing
    if (existingOrder?.status === "paid_and_confirmed") {
      return NextResponse.json({
        success: true,
        status: "paid_and_confirmed",
        already_confirmed: true,
        order: existingOrder,
      });
    }

    if (!isPaystackConfigured()) {
      return NextResponse.json({
        success: false,
        status: existingOrder?.status || "pending_payment",
        message: "Paystack is not configured. Please contact the author to confirm payment.",
        order: existingOrder,
      });
    }

    // 3. Server-side verification — NEVER trust client redirect alone
    const verification = await verifyPaystackPayment(reference);

    if (verification.success) {
      // 4. Update order status in DB
      const confirmedOrder = await updateOrderStatus(reference, "paid_and_confirmed");

      // 5. Send emails (webhook may also fire — idempotency above prevents double-send on next call)
      if (confirmedOrder) {
        sendConfirmedOrderEmails(confirmedOrder, reference).catch((err) => {
          console.error("[Verify] Email send error:", err);
        });
      }

      return NextResponse.json({
        success: true,
        status: "paid_and_confirmed",
        order: confirmedOrder || existingOrder,
      });
    } else {
      return NextResponse.json({
        success: false,
        status: verification.status || "failed",
        message: verification.message || "Payment verification did not succeed.",
        order: existingOrder,
      });
    }
  } catch (error: any) {
    console.error("[Verify] Unexpected error:", error);
    return NextResponse.json({ error: error.message || "Verification failed." }, { status: 500 });
  }
}
