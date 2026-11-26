import { NextRequest, NextResponse } from "next/server";
import { isPaystackConfigured, initializePaystackPayment, newAttemptReference } from "@/lib/paystack";
import { getOrderByReference, PAID_STATUSES } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * POST /api/paystack/initialize   body: { order_reference }
 *
 * The amount and the email ALWAYS come from the order saved in our database,
 * never from the browser, so nobody can pay a smaller amount for an order.
 */
export async function POST(req: NextRequest) {
  try {
    if (!isPaystackConfigured()) {
      return NextResponse.json({
        configured: false,
        message: "Online payment is not available right now. Please pay by bank transfer below.",
      });
    }

    const body = await req.json();
    const orderReference = typeof body?.order_reference === "string" ? body.order_reference.trim() : "";
    if (!orderReference) {
      return NextResponse.json({ error: "Missing order reference." }, { status: 400 });
    }

    const order = await getOrderByReference(orderReference);
    if (!order) {
      return NextResponse.json({ error: "We could not find this order." }, { status: 404 });
    }
    if (order.status && PAID_STATUSES.includes(order.status)) {
      return NextResponse.json({ error: "This order has already been paid. Thank you!" }, { status: 409 });
    }

    const host = req.headers.get("host") || "www.austinokechukwu.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    // Paystack adds ?reference=...&trxref=... to this address when the customer comes back
    const callbackUrl = `${protocol}://${host}/book/order/verify`;

    const result = await initializePaystackPayment({
      email: order.email,
      amountInKobo: Math.round(order.total_amount * 100),
      reference: newAttemptReference(order.order_reference),
      callbackUrl,
      metadata: {
        order_reference: order.order_reference,
        order_type: order.order_type,
        full_name: order.full_name,
        phone: order.phone,
        copies: order.copies,
        custom_fields: [
          { display_name: "Customer", variable_name: "customer", value: order.full_name },
          { display_name: "Phone", variable_name: "phone", value: order.phone },
          {
            display_name: "Order type",
            variable_name: "order_type",
            value: order.order_type === "personal" ? "Personal copies" : "School Outreach Program",
          },
          { display_name: "Copies", variable_name: "copies", value: String(order.copies) },
        ],
      },
    });

    return NextResponse.json({
      configured: true,
      authorization_url: result.authorization_url,
      reference: result.reference,
    });
  } catch (error: any) {
    console.error("Paystack init error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to start the online payment. Please try again or use bank transfer." },
      { status: 500 }
    );
  }
}
