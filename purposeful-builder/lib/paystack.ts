/**
 * Paystack Integration Helper
 * 
 * Uses standard Paystack API:
 * - Initialize transaction (generates secure checkout URL)
 * - Verify transaction (verifies payment on server)
 */

export interface PaystackInitParams {
  email: string;
  amountInKobo: number; // NGN * 100
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, any>;
}

export function isPaystackConfigured(): boolean {
  return !!process.env.PAYSTACK_SECRET_KEY;
}

export async function initializePaystackPayment(params: PaystackInitParams) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured in environment variables.");
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountInKobo,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata,
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    throw new Error(data.message || "Failed to initialize Paystack payment");
  }

  return {
    authorization_url: data.data.authorization_url,
    access_code: data.data.access_code,
    reference: data.data.reference,
  };
}

export async function verifyPaystackPayment(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured in environment variables.");
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok || !data.status) {
    return {
      success: false,
      message: data.message || "Payment verification failed",
    };
  }

  const isSuccess = data.data.status === "success";

  return {
    success: isSuccess,
    status: data.data.status,
    amount: data.data.amount / 100, // back to NGN
    reference: data.data.reference,
    paid_at: data.data.paid_at,
    customer_email: data.data.customer?.email,
  };
}
