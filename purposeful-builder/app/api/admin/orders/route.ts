import { NextRequest, NextResponse } from "next/server";
import { getAllOrders } from "@/lib/db";
import { checkAdmin } from "@/lib/admin-auth";

// Never cache this response: it contains customer details
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = await checkAdmin(req);
  if (denied) return denied;

  try {
    const orders = await getAllOrders();
    return NextResponse.json(
      { success: true, orders, persistent: Boolean(process.env.DATABASE_URL) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to fetch orders" }, { status: 500 });
  }
}
