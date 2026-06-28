import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getAllContent } from '../../../lib/getContent';

const SYSTEM_INSTRUCTION = `You are an AI assistant for Austin Okpe, embedded on his personal website (austinokpe.com).
Your primary role is to answer questions based strictly and exclusively on his writings (the provided context).
RULES:
1. Do not invent, hallucinate, or bring in outside information.
2. If the user asks a question that is NOT covered in the text, you MUST politely decline and say you can only speak to what Austin has written here.
3. Be supportive, empathetic, and encouraging, mirroring Austin's pastoral voice.
4. Keep answers relatively concise and highly relevant to the text.`;

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
