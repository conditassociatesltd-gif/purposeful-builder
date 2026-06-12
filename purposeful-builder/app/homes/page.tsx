import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HomesPage() {
  return (
    <main className="min-h-screen pt-32 px-5 max-w-4xl mx-auto" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <Link href="/" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-16">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] tracking-widest uppercase font-bold mb-6">
        Real Estate
      </div>
      <h1 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">Condit <span className="text-[#cba37c]">Homes Ltd</span></h1>
      <p className="text-lg opacity-80 leading-relaxed max-w-2xl border-l-2 border-[#c4572a] pl-6">
        This page is currently being built. It will serve as the digital home for Condit Homes Ltd, highlighting our work in real estate, property development, and long-term housing solutions.
      </p>
    </main>
  );
}
