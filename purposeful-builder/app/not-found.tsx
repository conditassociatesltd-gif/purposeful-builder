import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 text-center" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rust)" }}>404</p>
      <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">Page not found</h1>
      <p className="font-serif italic text-xl mb-10 opacity-60">
        Some things are not lost — they just haven't been written yet.
      </p>
      <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase border-b border-current/30 pb-1">
        <ArrowLeft size={14} /> Back home
      </Link>
    </main>
  );
}
