import fs from 'fs';
import path from 'path';
import { BOOK_CONFIG } from './book-config';
import { getAllPodcasts } from './podcasts';

let cachedContent: string | null = null;
let lastLoadedTime = 0;

export function getAllContent(): string {
  const now = Date.now();
  // Cache for 60 seconds in dev, indefinite in prod until server restarts
  if (cachedContent && process.env.NODE_ENV === 'production') {
    return cachedContent;
  }
  if (cachedContent && now - lastLoadedTime < 30000) {
    return cachedContent;
  }

  let allText = '';

  // 1. Core Website Overview & Author Identity
  allText += `\n\n=== WEBSITE & AUTHOR PROFILE ===\n`;
  allText += `Author Name: Austin Okechukwu (Full Legal Name: Awoke Okechukwu Austin)\n`;
  allText += `Known as: The Purposeful Builder\n`;
  allText += `Websites: https://austinokechukwu.com and https://books.austinokechukwu.com\n`;
  allText += `Tagline: Books and writings that shape minds, build character, inspire purpose, and transform generations.\n`;
  allText += `Contact Email: ${BOOK_CONFIG.payment.notificationEmail} (hello@austinokechukwu.com)\n`;
  allText += `Official WhatsApp: +${BOOK_CONFIG.payment.whatsappNumber} (${BOOK_CONFIG.payment.whatsappDisplay})\n`;
  allText += `Instagram: @arc__austin\n\n`;

  // 2. Books & Book Launch Information (Dynamic from book-config)
  allText += `=== BOOKS & BOOK LAUNCH DETAILS ===\n`;
  allText += `Book 1: "${BOOK_CONFIG.title}"\n`;
  allText += `- Author: ${BOOK_CONFIG.author}\n`;
  allText += `- Official Launch Date: 29 November 2026 (Launch Day: 29 November 2026)\n`;
  allText += `- Prelaunch Status: Active right now! Preorders are open.\n`;
  allText += `- Prelaunch Price: ₦${BOOK_CONFIG.pricing.prelaunchPrice.toLocaleString()} (discounted prelaunch copy price)\n`;
  allText += `- Official Launch Price: ₦${BOOK_CONFIG.pricing.launchPrice.toLocaleString()} (increases to ₦${BOOK_CONFIG.pricing.launchPrice.toLocaleString()} on launch day, 29 November 2026)\n`;
  allText += `- How to Order: Orders can be placed directly on the website at https://books.austinokechukwu.com or https://austinokechukwu.com/book/order.\n`;
  allText += `- Ordering Options:\n`;
  allText += `  1. Personal Copy: Delivered directly to the buyer's doorstep anywhere in Nigeria. (Courier delivery fee is confirmed separately by Austin after order submission based on destination state).\n`;
  allText += `  2. School Outreach Program: Buyers/supporters can sponsor copies to be donated to secondary school students in Nigeria. The School Outreach Program officially starts in January 2027.\n`;
  allText += `- Payment Options:\n`;
  allText += `  1. Online Payment via Paystack: Instant confirmation using Debit Card, Bank Transfer, USSD, or Apple Pay.\n`;
  allText += `  2. Direct Bank Transfer: Bank: ${BOOK_CONFIG.payment.bankName}, Account Name: ${BOOK_CONFIG.payment.accountName}, Account Number: ${BOOK_CONFIG.payment.accountNumber}. After transferring, proof of payment receipt should be submitted on WhatsApp (${BOOK_CONFIG.payment.whatsappDisplay}) or emailed to ${BOOK_CONFIG.payment.notificationEmail}.\n`;
  allText += `- What "The Boy and Addictions" is about: A deeply honest, redemptive book about the silent struggles boys and men face with addiction, secrecy, and shame, tracing back to childhood exposure, Dennis Memorial Grammar School (DMGS) Onitsha, and the journey toward healing, wholeness, and breaking patterns in secrecy.\n\n`;

  allText += `Book 2: "Formed in Silence"\n`;
  allText += `- Status: Work in progress (upcoming book).\n`;
  allText += `- Theme: How unseen wounds, father absence (both physical and emotional/distant fathers), and silent formation shape young boys into men, and how healing breaks generational trauma.\n`;
  allText += `- Waitlist: Visitors can join the waitlist on https://austinokechukwu.com/book to be notified upon publication.\n\n`;

  // 3. Businesses & Ventures
  allText += `=== BUSINESSES & ORGANIZATIONS ===\n`;
  allText += `1. Condit Associates Ltd: Design, architecture, construction, engineering, and project management with an obsession for precision and purposeful execution.\n`;
  allText += `2. Condit Homes Ltd: Real estate, housing development, land, and long-term property investments.\n`;
  allText += `3. Mentorship Programs: Boy Child Mentorship, Character and Integrity, Career Guidance, Faith and Purpose, and Emotional Intelligence.\n\n`;

  // 4. About Austin & Vision 2043
  allText += `=== ABOUT AUSTIN & VISION 2043 ===\n`;
  allText += `Background: Austin grew up in southeastern Nigeria. He spent years in construction and building, which taught him that structural integrity in buildings mirrors the foundations of human character. He writes from personal experience, faith, and practical wisdom.\n`;
  allText += `Vision 2043 Mission: "I grew up in a poor home with no blueprint, but I am committed to building a purposeful, wealthy, and healthy home. Though I lacked mentorship as a young man, I will be the mentor I never had, guiding others with wisdom, love, and truth. By God's grace, my life will be a blueprint for others to follow."\n`;
  allText += `6 Pillars of Vision 2043: Faith & Character, Marriage & Family, Purposeful Mentorship & Leadership, Condit Ecosystem (Associates, Homes, Capital), Wealth & Legacy, Life of Quiet Impact.\n\n`;

  // 5. Podcasts
  try {
    const podcasts = getAllPodcasts();
    if (podcasts.length > 0) {
      allText += `=== PODCAST EPISODES ===\n`;
      for (const p of podcasts) {
        allText += `- Episode: "${p.title}" (Duration: ${p.duration})\n`;
        if (p.excerpt) allText += `  Excerpt: ${p.excerpt}\n`;
        if (p.content) allText += `  Notes: ${p.content.slice(0, 300)}...\n`;
      }
      allText += `\n`;
    }
  } catch (err) {
    console.error('Error loading podcasts for AI context:', err);
  }

  // 6. Manuscripts and Content Files
  const contentDir = path.join(process.cwd(), 'content');
  const manuscriptDir = path.join(process.cwd(), 'manuscript');

  const readFiles = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readFiles(fullPath);
      } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const text = fs.readFileSync(fullPath, 'utf-8');
        allText += `\n\n--- Document: ${file} ---\n\n` + text;
      }
    }
  };

  readFiles(contentDir);
  readFiles(manuscriptDir);

  cachedContent = allText;
  lastLoadedTime = now;
  return allText;
}
