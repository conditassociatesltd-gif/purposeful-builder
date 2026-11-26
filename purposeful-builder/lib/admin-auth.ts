import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

function passwordMatches(given: string, correct: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(correct);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Checks the admin password.
 * Returns a ready-made error response if access must be refused, or null if the password is correct.
 * The password lives ONLY in the Vercel setting ADMIN_PASSWORD (there is deliberately no default).
 * It is sent in the "x-admin-password" header, never in the web address.
 */
export async function checkAdmin(req: NextRequest): Promise<NextResponse | null> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  if (!correctPassword) {
    return NextResponse.json(
      { error: "Admin password is not set up yet. Add ADMIN_PASSWORD in your Vercel Environment Variables, then redeploy." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const password = req.headers.get("x-admin-password") || "";
  if (!password || !passwordMatches(password, correctPassword)) {
    // Small delay makes password guessing very slow
    await new Promise((resolve) => setTimeout(resolve, 800));
    return NextResponse.json(
      { error: "Unauthorized. Invalid admin password." },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }

  return null;
}
