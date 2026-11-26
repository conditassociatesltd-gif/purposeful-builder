import { NextRequest, NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/db";
import { sendConfirmedOrderEmails } from "@/lib/email";
import { checkAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/**
 * You confirm a BANK TRANSFER payment by hand (after checking your bank app).
 * Marks the order paid and emails the buyer their thank-you message.
 * Paystack payments are confirmed automatically and never need this.
 */
export async function POST(req: NextRequest) {
  const denied = await checkAdmin(req);
  if (denied) return denied;

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const reference = typeof body?.order_reference === "string" ? body.order_reference.trim() : "";
  if (!reference) {
    return NextResponse.json({ error: "Order reference is required." }, { status: 400 });
  }
  const resend = body?.resend === true; // true = send the thank-you email again

  try {
    const result = await markOrderPaid(reference, "bank_transfer");
    if (!result.order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Already paid and no re-send asked for: do nothing twice
    if (!result.changed && !resend) {
      return NextResponse.json({ success: true, already_confirmed: true, email_sent: false, order: result.order });
    }

    const email = await sendConfirmedOrderEmails(result.order);
    return NextResponse.json({
      success: true,
      already_confirmed: !result.changed,
      email_sent: email.success,
      email_error: email.error,
      order: result.order,
    });
  } catch (err: any) {
    console.error("Confirm order error:", err);
    return NextResponse.json({ error: err?.message || "Failed to update order" }, { status: 500 });
  }
}
