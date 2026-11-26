import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getOrderByReference, markOrderPaid, PAID_STATUSES } from "@/lib/db";
import { baseOrderReference } from "@/lib/paystack";
import { sendConfirmedOrderEmails } from "@/lib/email";

export const dynamic = "force-dynamic";

/**
 * Paystack Webhook: Paystack calls this itself when a payment succeeds, even if the customer
 * closed their browser before coming back to the site. This is what makes sure no paid order is missed.
 *
 * Paystack signs every webhook with YOUR SECRET KEY (PAYSTACK_SECRET_KEY). There is no separate webhook secret.
 * In the Paystack dashboard set the webhook URL to:  https://www.austinokechukwu.com/api/paystack/webhook
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      console.error("[Webhook] PAYSTACK_SECRET_KEY is not set, cannot check the signature.");
      return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }

    // 1. Raw body is needed to check the signature
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature") || "";

    const expected = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      console.warn("[Webhook] Invalid signature. Possible spoofed request.");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2. Only successful charges matter
    const event = JSON.parse(rawBody);
    if (event.event !== "charge.success") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const data = event.data;
    const paystackReference = (data?.reference as string | undefined) || "";
    const paidAmountKobo = data?.amount as number | undefined;
    const currency = data?.currency as string | undefined;

    if (!paystackReference) {
      return NextResponse.json({ error: "Missing transaction reference" }, { status: 400 });
    }

    // 3. Find our order (the metadata we sent, or the reference prefix)
    const orderReference =
      (typeof data?.metadata?.order_reference === "string" && data.metadata.order_reference) ||
      baseOrderReference(paystackReference);

    const order = await getOrderByReference(orderReference);
    if (!order) {
      console.warn(`[Webhook] No order found for reference: ${orderReference}`);
      return NextResponse.json({ received: true }, { status: 200 }); // do not make Paystack retry forever
    }

    // 4. Already paid: nothing to do (prevents duplicate emails)
    if (order.status && PAID_STATUSES.includes(order.status)) {
      return NextResponse.json({ received: true, skipped: true }, { status: 200 });
    }

    // 5. Anti-fraud: the amount must cover the order
    const expectedKobo = Math.round(order.total_amount * 100);
    if ((currency && currency !== "NGN") || paidAmountKobo === undefined || paidAmountKobo < expectedKobo) {
      console.error(`[Webhook] Amount mismatch for ${orderReference}. Expected ${expectedKobo} kobo NGN, got ${paidAmountKobo} ${currency}`);
      return NextResponse.json({ received: true, error: "Amount mismatch" }, { status: 200 });
    }

    // 6. Mark paid (only one caller can win this, so emails go out once)
    const { order: paidOrder, changed } = await markOrderPaid(orderReference, "paystack");
    if (!paidOrder) {
      console.error(`[Webhook] Failed to update status for order: ${orderReference}`);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 }); // Paystack will retry
    }

    // 7. Thank-you email to the customer + notification to you. We wait for it on Vercel.
    if (changed) {
      try {
        const result = await sendConfirmedOrderEmails(paidOrder, paystackReference);
        if (!result.success) console.error("[Webhook] Email problem:", result.error);
      } catch (err) {
        console.error("[Webhook] Email send error:", err);
      }
    }

    console.log(`[Webhook] Order ${orderReference} confirmed.`);
    return NextResponse.json({ received: true, confirmed: true }, { status: 200 });
  } catch (error: any) {
    console.error("[Webhook] Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 }); // Paystack retries
  }
}
