import { NextRequest, NextResponse } from "next/server";
import { getAllOrders } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const password = searchParams.get("password") || req.headers.get("x-admin-password");

  const correctPassword = process.env.ADMIN_PASSWORD || "austin2026";

  if (!password || password !== correctPassword) {
    return NextResponse.json({ error: "Unauthorized. Invalid admin password." }, { status: 401 });
  }

  try {
    const orders = await getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to fetch orders" }, { status: 500 });
  }
}
