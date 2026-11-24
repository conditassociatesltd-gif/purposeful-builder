import { Resend } from "resend";
import { BookOrder } from "./db";
import { BOOK_CONFIG } from "./book-config";

/**
 * Send order notifications via Resend
 */
export async function sendOrderEmails(order: BookOrder): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[EMAIL MOCK] No RESEND_API_KEY set. Logging email payload to console:");
    console.log({
      to_author: BOOK_CONFIG.payment.notificationEmail,
      to_buyer: order.email,
      order_reference: order.order_reference,
      type: order.order_type,
      total: order.total_amount,
    });
    return { success: true };
  }

  const resend = new Resend(apiKey);
  
  // Use custom domain sender if configured, or Resend's verified test sender
  const fromEmail = process.env.RESEND_FROM_EMAIL || "The Purposeful Builder <onboarding@resend.dev>";
  const dateFormatted = new Date().toLocaleString("en-US", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const isPersonal = order.order_type === "personal";
  const subjectPrefix = isPersonal ? "[PERSONAL]" : "[OUTREACH]";
  const orderTypeLabel = isPersonal ? "Personal Copy Order" : "School Outreach Support";

  // 1. Author Notification Email HTML
  const authorSubject = `${subjectPrefix} [Payment Pending] New Order: ${order.order_reference} (${order.copies} ${order.copies === 1 ? "copy" : "copies"})`;
  
  const authorHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #111; color: #fff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px;">THE PURPOSEFUL BUILDER</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.8;">New Order Pending Payment Validation</p>
      </div>

      <div style="padding: 28px;">
        <div style="display: inline-block; padding: 4px 12px; background: #fef3c7; color: #92400e; font-size: 12px; font-weight: 700; text-transform: uppercase; border-radius: 4px; margin-bottom: 20px;">
          Pending Payment Validation (${orderTypeLabel})
        </div>

        <h2 style="font-size: 18px; margin: 0 0 16px 0;">Order Reference: <strong>${order.order_reference}</strong></h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Buyer Name:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.full_name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Phone:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Email:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Number of Copies:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.copies}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Price per Copy:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">₦${order.unit_price.toLocaleString()}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #111; font-weight: 700;">Total Amount:</td>
            <td style="padding: 10px 0; font-size: 18px; font-weight: 700; color: #c4572a; text-align: right;">₦${order.total_amount.toLocaleString()}</td>
          </tr>
          ${isPersonal ? `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Delivery Address:</td>
            <td style="padding: 10px 0; text-align: right;">${order.street}, ${order.city}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">State & Country:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${order.state}, Nigeria</td>
          </tr>
          ` : `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #666;">Destination:</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right; color: #059669;">School Outreach Program (Jan 2027)</td>
          </tr>
          `}
          <tr>
            <td style="padding: 10px 0; color: #666;">Date & Time (WAT):</td>
            <td style="padding: 10px 0; font-weight: 600; text-align: right;">${dateFormatted}</td>
          </tr>
        </table>

        <div style="background-color: #fef3c7; border: 1px solid #fde68a; padding: 16px; border-radius: 6px; font-size: 13px; color: #92400e;">
          <strong>Action Required:</strong> Awaiting buyer's bank transfer proof. Validate payment to officially confirm this order.
        </div>
      </div>
    </div>
  `;

  // 2. Buyer Confirmation Email HTML
  const buyerSubject = `[Action Required] Pay ₦${order.total_amount.toLocaleString()} to Validate Your Order (${order.order_reference})`;
  
  const buyerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; line-height: 1.6; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #111; color: #fff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px;">THE PURPOSEFUL BUILDER</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.8;">Order Pending Payment Validation</p>
      </div>

      <div style="padding: 28px;">
        <p style="font-size: 16px;">Dear <strong>${order.full_name}</strong>,</p>
        <p>Thank you for placing an order for <em>The Boy and Addictions</em>.</p>
        
        <div style="background-color: #fffbeb; border: 1px solid #fef3c7; padding: 14px; border-radius: 6px; font-size: 14px; color: #92400e; margin: 16px 0;">
          ⚠️ <strong>Please Note:</strong> Your order is currently <strong>PENDING</strong> and is not yet confirmed. Payment validates your order.
        </div>

        <div style="background-color: #f9f9f9; border-left: 4px solid #c4572a; padding: 16px; margin: 20px 0; font-size: 14px;">
          <p style="margin: 0 0 8px 0;"><strong>Order Reference:</strong> ${order.order_reference}</p>
          <p style="margin: 0 0 8px 0;"><strong>Order Type:</strong> ${orderTypeLabel}</p>
          <p style="margin: 0 0 8px 0;"><strong>Copies:</strong> ${order.copies}</p>
          <p style="margin: 0 0 8px 0;"><strong>Price per Copy:</strong> ₦${order.unit_price.toLocaleString()}</p>
          <p style="margin: 0; font-size: 16px; font-weight: 700; color: #c4572a;"><strong>Total:</strong> ₦${order.total_amount.toLocaleString()}</p>
          ${isPersonal ? `
          <p style="margin: 8px 0 0 0; color: #666; font-size: 12px;"><em>Delivery address: ${order.street}, ${order.city}, ${order.state}, Nigeria</em></p>
          ` : `
          <p style="margin: 8px 0 0 0; color: #059669; font-size: 12px;"><em>These copies will go directly to students in the School Outreach Program starting in January 2027.</em></p>
          `}
        </div>

        <div style="background-color: #faf5f0; border: 1px solid #e5d5c5; border-radius: 6px; padding: 20px; margin: 24px 0;">
          <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #111;">Payment Instructions</h3>
          <p style="margin: 0 0 12px 0; font-size: 14px;">Please transfer the total of <strong>₦${order.total_amount.toLocaleString()}</strong> to the bank account below:</p>
          
          <table style="width: 100%; font-size: 14px; margin-bottom: 12px;">
            <tr>
              <td style="color: #666; padding: 4px 0;">Account Name:</td>
              <td style="font-weight: 600; padding: 4px 0;">${BOOK_CONFIG.payment.accountName}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 4px 0;">Account Number:</td>
              <td style="font-weight: 700; font-size: 16px; letter-spacing: 1px; padding: 4px 0;">${BOOK_CONFIG.payment.accountNumber}</td>
            </tr>
            <tr>
              <td style="color: #666; padding: 4px 0;">Bank:</td>
              <td style="font-weight: 600; padding: 4px 0;">${BOOK_CONFIG.payment.bankName}</td>
            </tr>
          </table>

          <p style="margin: 12px 0 0 0; font-size: 13px; color: #555;">
            After making payment, please send your proof of payment along with your order reference (<strong>${order.order_reference}</strong>) to WhatsApp: <strong>${BOOK_CONFIG.payment.whatsappDisplay}</strong> or reply to this email.
          </p>
        </div>

        <div style="text-align: center; margin: 28px 0;">
          <a href="https://wa.me/${BOOK_CONFIG.payment.whatsappNumber}?text=${encodeURIComponent(`Hello Austin, I have made payment for my book order: ${order.order_reference} (₦${order.total_amount.toLocaleString()}). Here is my proof of payment:`)}" 
             style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: 600; border-radius: 6px; font-size: 14px;">
            Send Proof of Payment on WhatsApp
          </a>
        </div>

        ${isPersonal ? `
        <p style="font-size: 13px; color: #666; margin-top: 16px;">
          <em>Note: The delivery fee will be confirmed by me shortly once payment is received.</em>
        </p>
        ` : `
        <p style="font-size: 13px; color: #059669; margin-top: 16px;">
          <em>Thank you for supporting our School Outreach Program. Your copies will reach students starting in January 2027.</em>
        </p>
        `}

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
          Austin Okechukwu — The Purposeful Builder<br />
          ${BOOK_CONFIG.payment.notificationEmail}
        </p>
      </div>
    </div>
  `;

  try {
    // Send to author
    await resend.emails.send({
      from: fromEmail,
      to: BOOK_CONFIG.payment.notificationEmail,
      subject: authorSubject,
      html: authorHtml,
    });

    // Send to buyer
    await resend.emails.send({
      from: fromEmail,
      to: order.email,
      subject: buyerSubject,
      html: buyerHtml,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Resend error sending order emails:", error);
    return { success: false, error: error?.message || "Failed to send emails" };
  }
}
