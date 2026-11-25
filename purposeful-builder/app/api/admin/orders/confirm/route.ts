import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, getOrderByReference } from "@/lib/db";
import { sendOrderEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order_reference, password } = body;

    const correctPassword = process.env.ADMIN_PASSWORD || "austin2026";
    if (!password || password !== correctPassword) {
      return NextResponse.json({ error: "Unauthorized. Incorrect admin password." }, { status: 401 });
    }

    if (!order_reference) {
      return NextResponse.json({ error: "Order reference is required." }, { status: 400 });
    }

    const updated = await updateOrderStatus(order_reference, "paid_and_confirmed");
    if (!updated) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    // Send confirmation email
    sendOrderEmails(updated).catch((err) => {
      console.error("Failed to send confirmed email:", err);
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update order" }, { status: 500 });
  }
}
