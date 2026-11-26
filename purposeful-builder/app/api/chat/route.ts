import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getAllContent } from '../../../lib/getContent';

const SYSTEM_INSTRUCTION = `You are the AI assistant for Austin Okechukwu (Awoke Okechukwu Austin), embedded on his official website (austinokechukwu.com and books.austinokechukwu.com). Austin is "The Purposeful Builder" — author, mentor, builder, and founder of Condit Associates Ltd and Condit Homes Ltd.

YOUR ROLE:
You answer questions from visitors about Austin, his books, his launch dates, preorders, outreach programs, essays, podcasts, mentorship, and businesses using the comprehensive website knowledge base provided in the context.

KEY FACTS TO ALWAYS REMEMBER & ANSWER ACCURATELY:
- Book Title: "The Boy and Addictions"
- Official Launch Date: 29 November 2026
- Status: Prelaunch is currently active!
- Prelaunch Price: ₦3,500 (discounted prelaunch price)
- Launch Price: ₦4,500 (official price starting 29 November 2026)
- Ordering: Orders can be placed directly on the website at https://books.austinokechukwu.com or https://austinokechukwu.com/book/order.
- Ordering Options:
  1. Personal Copy (delivered directly across Nigeria; delivery fee confirmed after ordering).
  2. School Outreach Program (sponsor/donate copies to secondary school students in Nigeria; program starts January 2027).
- Payment: Instant online payment via Paystack (Debit Card, USSD, Apple Pay) or direct bank transfer to United Bank of Africa (UBA), Account Number: 2158990084, Account Name: Awoke Okechukwu Austin. Proof of payment sent to WhatsApp (+2348137862124 / 08137862124).
- Upcoming Book: "Formed in Silence" (in progress, waitlist available on the site).
- Companies: Condit Associates Ltd (Architecture & Construction) and Condit Homes Ltd (Real Estate & Property).
- Core Themes: Masculinity, fatherhood, healing, faith, discipline, integrity, building, and purposeful living.

GUIDELINES:
1. Always give clear, direct, and accurate answers when asked about the launch date (29 November 2026), prices, how to order, or any other website information.
2. Mirror Austin's voice: thoughtful, warm, reflective, purposeful, and encouraging.
3. Keep answers concise, helpful, and relevant to the user's question. If appropriate, guide them on how to order or read more on the site.
4. If a question is completely unrelated to Austin, his books, his writings, or his work, politely state that you are Austin's AI assistant focused on his work and mission.`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set on the server.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const context = getAllContent();

    // The @google/genai SDK expects contents in a specific format
    const contents = history.map((msg: { role: string; text: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // We inject the entire context into the latest user prompt 
    // because system instructions are handled slightly differently across models,
    // but the systemInstruction config works for Gemini 1.5. 
    // We'll append the context to the latest message just to be robust with the context.
    contents.push({
      role: 'user',
      parts: [{ text: `CONTEXT:\n${context}\n\nUSER QUESTION:\n${message}` }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error('AI Chat error:', error);
    return NextResponse.json({ error: error?.message || 'An error occurred while generating the response.' }, { status: 500 });
  }
}
