import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Check if request is coming from the subdomain 'books.austinokechukwu.com'
  // (also support localhost testing e.g. books.localhost:3000)
  const isBooksSubdomain =
    hostname.startsWith("books.austinokechukwu.com") ||
    hostname.startsWith("books.localhost");

  if (isBooksSubdomain) {
    const pathname = url.pathname;

    // Don't rewrite API routes, Next internal files, or static public assets
    if (
      pathname.startsWith("/api") ||
      pathname.startsWith("/_next") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // If accessing the root of books.austinokechukwu.com, rewrite to /book
    if (pathname === "/" || pathname === "") {
      return NextResponse.rewrite(new URL("/book", req.url));
    }

    // If accessing /order or other relative paths on the subdomain
    if (pathname.startsWith("/order")) {
      return NextResponse.rewrite(new URL(`/book${pathname}`, req.url));
    }

    // If path doesn't already start with /book, prefix with /book
    if (!pathname.startsWith("/book")) {
      return NextResponse.rewrite(new URL(`/book${pathname}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, or static files with extension
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
