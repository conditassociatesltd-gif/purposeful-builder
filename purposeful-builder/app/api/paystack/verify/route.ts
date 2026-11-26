import { NextRequest, NextResponse } from "next/server";
import { isPaystackConfigured, verifyPaystackPayment, baseOrderReference } from "@/lib/paystack";
import { getOrderByReference, markOrderPaid, PAID_STATUSES, BookOrder } from "@/lib/db";
import { sendConfirmedOrderEmails } from "@/lib/email";

export const dynamic = "force-dynamic";

/** Only the details the customer's own thank-you page needs (never the email or internal ids) */
function publicOrder(o: BookOrder | null) {
  if (!o) return null;
  return {
    order_reference: o.order_reference,
    order_type: o.order_type,
    full_name: o.full_name,
    phone: o.phone,
    copies: o.copies,
    total_amount: o.total_amount,
    street: o.street,
    city: o.city,
    state: o.state,
    status: o.status,
  };
}

/**
 * GET /api/paystack/verify?reference=<paystack reference>
 *
 * Called after Paystack sends the customer back to the site.
 * - Checks the payment with Paystack on the server (the redirect alone is never trusted)
 * - Checks the amount paid is at least the order total
 * - Safe to call many times: the thank-you emails are sent only once
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const paystackReference = (searchParams.get("reference") || "").trim();

    if (!paystackReference) {
      return NextResponse.json({ error: "Reference parameter missing." }, { status: 400 });
    }

    const orderReference = baseOrderReference(paystackReference);
    const existingOrder = await getOrderByReference(orderReference);

    if (!existingOrder) {
      return NextResponse.json({ success: false, status: "not_found", message: "We could not find this order." }, { status: 404 });
    }

    // Already paid (for example the webhook got there first): just show the thank-you page
    if (existingOrder.status && PAID_STATUSES.includes(existingOrder.status)) {
      return NextResponse.json({
        success: true,
        status: "paid_and_confirmed",
        already_confirmed: true,
        order: publicOrder(existingOrder),
      });
    }

    if (!isPaystackConfigured()) {
      return NextResponse.json({
        success: false,
        status: existingOrder.status || "pending_payment",
        message: "Online payment is not available. Please contact the author to confirm your payment.",
        order: publicOrder(existingOrder),
      });
    }

    const verification = await verifyPaystackPayment(paystackReference);

    if (!verification.success) {
      return NextResponse.json({
        success: false,
        status: verification.status || "failed",
        message: verification.message || "Payment verification did not succeed.",
        order: publicOrder(existingOrder),
      });
    }

    // Anti-fraud: the money received must cover the order, in naira
    const paidAmount = verification.amount ?? 0;
    if ((verification.currency && verification.currency !== "NGN") || paidAmount < existingOrder.total_amount) {
      console.error(
        `[Verify] Amount/currency problem for ${orderReference}: paid ${paidAmount} ${verification.currency}, expected ${existingOrder.total_amount} NGN`
      );
      return NextResponse.json({
        success: false,
        status: "amount_mismatch",
        message: `The amount paid does not match your order total. Please contact the author and quote reference ${orderReference}.`,
        order: publicOrder(existingOrder),
      });
    }

    const { order: paidOrder, changed } = await markOrderPaid(orderReference, "paystack");

    // Only the request that actually changed the status sends the emails (no duplicates).
    // We wait for them: on Vercel a function can be stopped as soon as it replies.
    if (changed && paidOrder) {
      try {
        const result = await sendConfirmedOrderEmails(paidOrder, paystackReference);
        if (!result.success) console.error("[Verify] Email problem:", result.error);
      } catch (err) {
        console.error("[Verify] Email send error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      status: "paid_and_confirmed",
      order: publicOrder(paidOrder || existingOrder),
    });
  } catch (error: any) {
    console.error("[Verify] Unexpected error:", error);
    return NextResponse.json({ error: "Verification failed. Please try again in a moment." }, { status: 500 });
  }
}
