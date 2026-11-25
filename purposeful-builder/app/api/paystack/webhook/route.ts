import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getOrderByReference, updateOrderStatus } from "@/lib/db";
import { sendConfirmedOrderEmails } from "@/lib/email";

/**
 * Paystack Webhook Handler
 * - Validates the Paystack signature (HMAC SHA512)
 * - Processes charge.success events only
 * - Updates order status to paid_and_confirmed
 * - Sends confirmation emails ONLY after server-side verification
 * - Idempotent: does nothing if order already confirmed (prevents duplicates)
 */
export async function POST(req: NextRequest) {
  try {
    const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("[Webhook] PAYSTACK_WEBHOOK_SECRET is not set.");
      // Return 200 so Paystack does not keep retrying; log the issue
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // 1. Read raw body for signature verification
    const rawBody = await req.text();
    const paystackSignature = req.headers.get("x-paystack-signature");

    if (!paystackSignature) {
      return NextResponse.json({ error: "Missing signature header" }, { status: 400 });
    }

    // 2. Validate HMAC SHA512 signature
    const expectedSignature = crypto
      .createHmac("sha512", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (paystackSignature !== expectedSignature) {
      console.warn("[Webhook] Invalid signature. Possible spoofed request.");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 3. Parse the event
    const event = JSON.parse(rawBody);

    // Only process successful charge events
    if (event.event !== "charge.success") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const data = event.data;
    const paystackReference = data?.reference as string | undefined;
    const paidAmountKobo = data?.amount as number | undefined;
    const customerEmail = data?.customer?.email as string | undefined;

    if (!paystackReference) {
      return NextResponse.json({ error: "Missing transaction reference" }, { status: 400 });
    }

    // 4. Look up order in DB by reference
    const order = await getOrderByReference(paystackReference);

    if (!order) {
      console.warn(`[Webhook] No order found for reference: ${paystackReference}`);
      // Still return 200 — Paystack should not retry for unknown refs
      return NextResponse.json({ received: true }, { status: 200 });
    }

    // 5. Idempotency check — prevent duplicate processing
    if (order.status === "paid_and_confirmed") {
      console.log(`[Webhook] Order ${paystackReference} already confirmed. Skipping.`);
      return NextResponse.json({ received: true, skipped: true }, { status: 200 });
    }

    // 6. Verify amount matches what we expect (anti-fraud check)
    const expectedAmountKobo = order.total_amount * 100;
    if (paidAmountKobo !== undefined && paidAmountKobo < expectedAmountKobo) {
      console.error(
        `[Webhook] Amount mismatch for ${paystackReference}. ` +
          `Expected: ${expectedAmountKobo} kobo, Got: ${paidAmountKobo} kobo`
      );
      // Log and skip — do not confirm underpaid orders
      return NextResponse.json({ received: true, error: "Amount mismatch" }, { status: 200 });
    }

    // 7. Mark order as paid and confirmed in DB
    const confirmedOrder = await updateOrderStatus(paystackReference, "paid_and_confirmed");

    if (!confirmedOrder) {
      console.error(`[Webhook] Failed to update status for order: ${paystackReference}`);
      return NextResponse.json({ error: "DB update failed" }, { status: 500 });
    }

    // 8. Send confirmation emails (customer + author) AFTER verification
    sendConfirmedOrderEmails(confirmedOrder, paystackReference).catch((err) => {
      console.error("[Webhook] Email send error:", err);
    });

    console.log(`[Webhook] Order ${paystackReference} confirmed successfully.`);
    return NextResponse.json({ received: true, confirmed: true }, { status: 200 });
  } catch (error: any) {
    console.error("[Webhook] Unexpected error:", error);
    // Return 500 so Paystack retries
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
