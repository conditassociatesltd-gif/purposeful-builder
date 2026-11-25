import { NextRequest, NextResponse } from "next/server";
import { isPaystackConfigured, initializePaystackPayment } from "@/lib/paystack";
import { getOrderByReference } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    if (!isPaystackConfigured()) {
      return NextResponse.json({
        configured: false,
        message: "Paystack is not configured yet. Please complete via bank transfer.",
      });
    }

    const body = await req.json();
    const { order_reference, email, amount } = body;

    if (!order_reference || !email || !amount) {
      return NextResponse.json({ error: "Missing required order parameters." }, { status: 400 });
    }

    const host = req.headers.get("host") || "www.austinokechukwu.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const callbackUrl = `${protocol}://${host}/book/order/verify?reference=${encodeURIComponent(order_reference)}`;

    const result = await initializePaystackPayment({
      email,
      amountInKobo: Math.round(amount * 100),
      reference: order_reference,
      callbackUrl,
      metadata: {
        order_reference,
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
      { error: error.message || "Failed to initialize Paystack transaction." },
      { status: 500 }
    );
  }
}
