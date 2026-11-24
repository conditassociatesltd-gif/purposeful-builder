import { NextRequest, NextResponse } from "next/server";
import { calculateOrderTotal } from "@/lib/book-config";
import { saveOrder, BookOrder } from "@/lib/db";
import { sendOrderEmails } from "@/lib/email";

// In-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes window
  const maxRequests = 100; // Generous limit for real buyers & testers

  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Input sanitization helper
function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.trim().replace(/[<>]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting check (lenient to prevent blocking mobile testers)
    const rawIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown-ip";
    const clientIp = rawIp.split(",")[0].trim();
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Honeypot check for bots
    if (body.website_hp) {
      // Bot detected, silently reject with fake success or 400
      return NextResponse.json({ success: true, message: "Order received" });
    }

    // 3. Validate Order Type
    const orderType = sanitize(body.order_type);
    if (orderType !== "personal" && orderType !== "outreach") {
      return NextResponse.json(
        { error: "Invalid order type. Must be 'personal' or 'outreach'." },
        { status: 400 }
      );
    }

    // 4. Validate Common Fields
    const fullName = sanitize(body.full_name);
    const phone = sanitize(body.phone);
    const email = sanitize(body.email).toLowerCase();
    const rawCopies = parseInt(body.copies, 10);

    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
    }

    if (!phone || phone.length < 6) {
      return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (isNaN(rawCopies) || rawCopies < 1) {
      return NextResponse.json({ error: "Minimum order is 1 copy." }, { status: 400 });
    }

    // 5. Conditional Validation for Personal Orders
    let street: string | null = null;
    let city: string | null = null;
    let state: string | null = null;
    const country = "Nigeria";

    if (orderType === "personal") {
      street = sanitize(body.street);
      city = sanitize(body.city);
      state = sanitize(body.state);

      if (!street || street.length < 3) {
        return NextResponse.json({ error: "Please provide your delivery street address." }, { status: 400 });
      }
      if (!city || city.length < 2) {
        return NextResponse.json({ error: "Please provide your city." }, { status: 400 });
      }
      if (!state) {
        return NextResponse.json({ error: "Please select your state." }, { status: 400 });
      }
    }

    // 6. Server-Side Price Calculation (NEVER trust client price)
    const pricing = calculateOrderTotal(rawCopies);

    // 7. Generate Unique Order Reference
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const timestampPart = Date.now().toString().slice(-4);
    const orderReference = `ORD-BA-${timestampPart}${randomSuffix}`;

    const orderPayload: BookOrder = {
      order_reference: orderReference,
      order_type: orderType,
      full_name: fullName,
      phone,
      email,
      copies: pricing.copies,
      unit_price: pricing.unitPrice,
      total_amount: pricing.totalAmount,
      street,
      city,
      state,
      country,
      status: "pending_payment",
    };

    // 8. Save to Database (guaranteed non-null fallback)
    const savedOrder = (await saveOrder(orderPayload)) || orderPayload;

    // 9. Dispatch Emails (author notification + buyer confirmation)
    // Run asynchronously so user receives instant response
    sendOrderEmails(savedOrder).catch((err) => {
      console.error("Background email dispatch failed:", err);
    });

    return NextResponse.json({
      success: true,
      order: {
        order_reference: savedOrder.order_reference,
        order_type: savedOrder.order_type,
        full_name: savedOrder.full_name,
        copies: savedOrder.copies,
        unit_price: savedOrder.unit_price,
        total_amount: savedOrder.total_amount,
        formatted_total: pricing.formattedTotal,
        formatted_unit: pricing.formattedUnit,
        street: savedOrder.street,
        city: savedOrder.city,
        state: savedOrder.state,
      },
    });
  } catch (error: any) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your order. Please try again." },
      { status: 500 }
    );
  }
}
