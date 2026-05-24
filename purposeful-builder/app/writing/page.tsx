import Link from "next/link";
import Image from "next/image";
import { getAllEssays } from "@/lib/essays";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Writing — Austin Okechukwu",
  description: "Essays by Austin Okechukwu on identity, faith, purpose, building, and becoming.",
};

export default function WritingPage() {
  const essays = getAllEssays();

  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <header className="border-b" style={{ borderColor: "rgba(17,17,15,0.1)" }}>
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-[#c4572a] flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Austin Okechukwu logo"
                width={46}
                height={46}
                className="object-contain scale-110"
              />
            </div>
            <span className="font-black tracking-tight uppercase">Austin Okechukwu</span>
          </Link>

          <Link href="/about" className="text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(17,17,15,0.5)" }}>
            About
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 py-20 border-b" style={{ borderColor: "rgba(17,17,15,0.1)" }}>
        <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rust)" }}>
          Writing
        </p>

        <h1 className="font-serif text-6xl md:text-8xl leading-[0.95] tracking-tight max-w-4xl">
          Essays on building, becoming, and the quiet work beneath visible success.
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-12">
        <div className="divide-y divide-black/10 border-y border-black/10">
          {essays.map((essay, index) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="group grid md:grid-cols-[0.25fr_1fr_0.2fr] gap-6 py-10"
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "var(--rust)" }}>
                  {essay.category}
                </p>
                <p className="mt-3 text-xs tracking-[0.2em] uppercase text-black/40">
                  {essay.date} · {essay.readingTime || "4 min read"}
                </p>
              </div>

              <div>
                <h2 className="font-serif text-4xl md:text-5xl leading-tight group-hover:text-[#9a4c2b] transition-colors">
                  {essay.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-black/60 max-w-3xl">
                  {essay.excerpt}
                </p>
              </div>

              <div className="flex md:justify-end items-start">
                <ArrowRight className="mt-2 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}