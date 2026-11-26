import { Resend } from "resend";
import { BookOrder } from "./db";
import { BOOK_CONFIG } from "./book-config";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "orders@orders.austinokechukwu.com";
const ADMIN_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL || "hello@austinokechukwu.com";

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/** ============================================================
 *  sendConfirmedOrderEmails
 *  Called ONLY after Paystack server-side verification succeeds.
 *  Sends:
 *    1. Customer confirmation email
 *    2. Admin notification email
 * ============================================================ */
/** Escape text so anything a buyer typed can never break or inject into the email HTML */
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendConfirmedOrderEmails(
  rawOrder: BookOrder,
  paystackReference?: string
): Promise<{ success: boolean; error?: string }> {
  // `order` is a safe-to-print copy. Use `rawOrder.email` for the real "to" address.
  const order: BookOrder = {
    ...rawOrder,
    full_name: esc(rawOrder.full_name),
    phone: esc(rawOrder.phone),
    email: esc(rawOrder.email),
    street: rawOrder.street ? esc(rawOrder.street) : rawOrder.street,
    city: rawOrder.city ? esc(rawOrder.city) : rawOrder.city,
    state: rawOrder.state ? esc(rawOrder.state) : rawOrder.state,
  };
  const paidByPaystack = Boolean(paystackReference);
  const resend = getResend();

  if (!resend) {
    console.log("[EMAIL MOCK] No RESEND_API_KEY set. Would send confirmed emails for:", {
      order_reference: order.order_reference,
      paystack_ref: paystackReference,
      to_customer: order.email,
      to_admin: ADMIN_EMAIL,
    });
    return { success: true };
  }

  const isPersonal = order.order_type === "personal";
  const orderTypeLabel = isPersonal ? "Personal Copy" : "School Outreach Support";

  const dateFormatted = new Date().toLocaleString("en-US", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "medium",
  });

  // ─────────────────────────────────────────────
  // 1. CUSTOMER CONFIRMATION EMAIL
  // ─────────────────────────────────────────────
  const customerSubject = `✅ Payment Confirmed – Your Order for "The Boy and Addictions" (${order.order_reference})`;

  const customerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #111; color: #fff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px;">THE PURPOSEFUL BUILDER</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.8;">Order Confirmed – Payment Received</p>
      </div>

      <div style="padding: 28px;">
        <div style="display: inline-block; padding: 6px 14px; background: #d1fae5; color: #065f46; font-size: 12px; font-weight: 700; text-transform: uppercase; border-radius: 4px; margin-bottom: 20px; border: 1px solid #a7f3d0;">
          ✅ Payment Confirmed
        </div>

        <p style="font-size: 16px;">Dear <strong>${order.full_name}</strong>,</p>
        <p>Great news! Your payment has been verified and your order for <em><strong>The Boy and Addictions</strong></em> is now <strong>confirmed</strong>.</p>

        <div style="background-color: #f9f9f9; border-left: 4px solid #c4572a; padding: 16px; margin: 20px 0; font-size: 14px;">
          <p style="margin: 0 0 8px 0;"><strong>Order Reference:</strong> ${order.order_reference}</p>
          <p style="margin: 0 0 8px 0;"><strong>Book Title:</strong> The Boy and Addictions</p>
          <p style="margin: 0 0 8px 0;"><strong>Order Type:</strong> ${orderTypeLabel}</p>
          <p style="margin: 0 0 8px 0;"><strong>Quantity:</strong> ${order.copies} ${order.copies === 1 ? "copy" : "copies"}</p>
          <p style="margin: 0 0 8px 0;"><strong>Amount Paid:</strong> <span style="color: #c4572a; font-size: 16px; font-weight: 700;">₦${order.total_amount.toLocaleString()}</span></p>
          ${
            isPersonal
              ? `<p style="margin: 8px 0 0 0; color: #555;"><strong>Delivery Address:</strong> ${order.street}, ${order.city}, ${order.state}, Nigeria</p>`
              : `<p style="margin: 8px 0 0 0; color: #059669;"><strong>Destination:</strong> School Outreach Program (starting January 2027)</p>`
          }
          ${paystackReference ? `<p style="margin: 8px 0 0 0; color: #666; font-size: 12px;"><strong>Payment Reference:</strong> ${paystackReference}</p>` : ""}
        </div>

        ${
          isPersonal
            ? `
        <div style="background-color: #faf5f0; border: 1px solid #e5d5c5; border-radius: 6px; padding: 16px; margin: 20px 0; font-size: 14px;">
          <p style="margin: 0;"><strong>📦 Next Step:</strong> Austin will confirm your delivery fee and schedule shipment. You will receive a follow-up message on WhatsApp or email shortly.</p>
        </div>`
            : `
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 16px; margin: 20px 0; font-size: 14px; color: #065f46;">
          <p style="margin: 0;">🎓 <strong>Thank you for supporting the School Outreach Program.</strong> Your sponsored copies will reach students in secondary schools starting January 2027.</p>
        </div>`
        }

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
          Austin Okechukwu — The Purposeful Builder<br />
          ${ADMIN_EMAIL}
        </p>
      </div>
    </div>
  `;

  // ─────────────────────────────────────────────
  // 2. ADMIN NOTIFICATION EMAIL
  // ─────────────────────────────────────────────
  const adminSubject = `💰 [PAID] New Confirmed Order: ${order.order_reference} – ${order.full_name} (${order.copies} ${order.copies === 1 ? "copy" : "copies"})`;

  const adminHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #111; color: #fff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px;">THE PURPOSEFUL BUILDER</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.8;">New Confirmed & Paid Order</p>
      </div>

      <div style="padding: 28px;">
        <div style="display: inline-block; padding: 6px 14px; background: #d1fae5; color: #065f46; font-size: 12px; font-weight: 700; text-transform: uppercase; border-radius: 4px; margin-bottom: 20px; border: 1px solid #a7f3d0;">
          ${paidByPaystack ? "✅ Payment Verified via Paystack" : "✅ Bank Transfer Confirmed by You"}
        </div>

        <h2 style="font-size: 18px; margin: 0 0 16px 0;">Order Reference: <strong>${order.order_reference}</strong></h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Customer Name:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.full_name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Email:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Phone:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Order Type:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${orderTypeLabel}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Quantity:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.copies} ${order.copies === 1 ? "copy" : "copies"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #111; font-weight: 700;">Amount Paid:</td>
            <td style="padding: 10px 0; font-size: 18px; font-weight: 700; color: #c4572a; text-align: right;">₦${order.total_amount.toLocaleString()}</td>
          </tr>
          ${
            paystackReference
              ? `<tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Paystack Reference:</td>
            <td style="padding: 10px 0; font-family: monospace; font-weight: 600; text-align: right; color: #059669;">${paystackReference}</td>
          </tr>`
              : ""
          }
          ${
            isPersonal
              ? `<tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Delivery Address:</td>
            <td style="padding: 10px 0; text-align: right;">${order.street}, ${order.city}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">State:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.state}, Nigeria</td>
          </tr>`
              : `<tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Destination:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right; color: #059669;">School Outreach Program (Jan 2027)</td>
          </tr>`
          }
          <tr>
            <td style="padding: 10px 0; color: #666;">Date (WAT):</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${dateFormatted}</td>
          </tr>
        </table>

        <div style="background-color: #d1fae5; border: 1px solid #a7f3d0; padding: 16px; border-radius: 6px; font-size: 13px; color: #065f46;">
          <strong>✅ No action required for payment.</strong> ${paidByPaystack ? "Paystack has confirmed the payment automatically." : "You confirmed this bank transfer yourself."}
          ${isPersonal ? " Please arrange delivery and confirm delivery fee with the customer." : " Copies for the School Outreach Program."}
        </div>
      </div>
    </div>
  `;

  // Send the two emails one after the other, so one failing never blocks the other.
  // Resend does NOT throw on most problems: it returns an `error` object, so we check it.
  const problems: string[] = [];

  try {
    const customerResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: rawOrder.email,
      replyTo: ADMIN_EMAIL,
      subject: customerSubject,
      html: customerHtml,
    });
    if (customerResult.error) problems.push(`customer email: ${customerResult.error.message}`);
  } catch (error: any) {
    problems.push(`customer email: ${error?.message || "failed"}`);
  }

  try {
    const adminResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: rawOrder.email,
      subject: adminSubject,
      html: adminHtml,
    });
    if (adminResult.error) problems.push(`admin email: ${adminResult.error.message}`);
  } catch (error: any) {
    problems.push(`admin email: ${error?.message || "failed"}`);
  }

  if (problems.length > 0) {
    console.error("[Email] Problems for", rawOrder.order_reference, problems);
    return { success: false, error: problems.join(" | ") };
  }
  return { success: true };
}

/**
 * sendOrderEmails — legacy alias kept for the admin manual-confirm route.
 * Calls sendConfirmedOrderEmails without a Paystack reference.
 */
export async function sendOrderEmails(
  order: BookOrder
): Promise<{ success: boolean; error?: string }> {
  return sendConfirmedOrderEmails(order, undefined);
}
