/**
 * Pricing & Launch Configuration for "The Boy and Addictions"
 * 
 * Edit prices, launch dates, or bank details here.
 * Any environment variables set in Vercel will take precedence over defaults.
 */

export const BOOK_CONFIG = {
  title: "The Boy and Addictions",
  author: "Awoke Okechukwu Austin",
  
  // Pricing in NGN (Nigerian Naira)
  pricing: {
    prelaunchPrice: 3500,
    launchPrice: 4500,
    // 29 November 2026, 00:00 Africa/Lagos (UTC+1)
    launchDateIso: "2026-11-29T00:00:00+01:00",
  },

  // Bank & Contact Details (Can be overridden by Vercel Environment Variables)
  payment: {
    accountName: process.env.BANK_ACCOUNT_NAME || "Awoke Okechukwu Austin",
    accountNumber: process.env.BANK_ACCOUNT_NUMBER || "2158990084",
    bankName: process.env.BANK_NAME || "United Bank of Africa",
    whatsappNumber: "2348137862124",
    whatsappDisplay: "08137862124",
    notificationEmail: "hello@austinokechukwu.com",
  },
};

/**
 * 36 Nigerian States + FCT
 */
export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Federal Capital Territory (Abuja)",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
] as const;

/**
 * Get current pricing based on current time or specified date.
 * Switches automatically on 29 November 2026 00:00 Africa/Lagos time.
 */
export function getCurrentPriceInfo(currentDate?: Date) {
  const now = currentDate || new Date();
  const launchDate = new Date(BOOK_CONFIG.pricing.launchDateIso);
  const isPrelaunch = now.getTime() < launchDate.getTime();
  
  const unitPrice = isPrelaunch
    ? BOOK_CONFIG.pricing.prelaunchPrice
    : BOOK_CONFIG.pricing.launchPrice;

  return {
    unitPrice,
    isPrelaunch,
    label: isPrelaunch ? "Prelaunch price" : "Standard price",
    formattedPrice: `₦${unitPrice.toLocaleString()}`,
    launchDate,
  };
}

/**
 * Calculate order total securely on server or client display
 */
export function calculateOrderTotal(copies: number, currentDate?: Date) {
  const validCopies = Math.max(1, Math.floor(copies || 1));
  const priceInfo = getCurrentPriceInfo(currentDate);
  const totalAmount = priceInfo.unitPrice * validCopies;

  return {
    copies: validCopies,
    unitPrice: priceInfo.unitPrice,
    isPrelaunch: priceInfo.isPrelaunch,
    priceLabel: priceInfo.label,
    totalAmount,
    formattedUnit: `₦${priceInfo.unitPrice.toLocaleString()}`,
    formattedTotal: `₦${totalAmount.toLocaleString()}`,
  };
}
