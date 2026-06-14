import Link from "next/link";
import Image from "next/image";
import { getAllEssays } from "@/lib/essays";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Writing",
  description:
    "Essays by Austin Okechukwu on identity, faith, purpose, building, masculinity, and the quiet work of becoming.",
  openGraph: {
    title: "Writing — Austin Okechukwu",
    description:
      "Essays by Austin Okechukwu on identity, faith, purpose, building, masculinity, and the quiet work of becoming.",
    url: "https://austinokechukwu.com/writing",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Writing — Austin Okechukwu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Austin Okechukwu",
    description:
      "Essays by Austin Okechukwu on identity, faith, purpose, building, masculinity, and the quiet work of becoming.",
    images: ["/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://austinokechukwu.com/writing",
  },
};

export default function WritingPage() {
  const essays = getAllEssays();

  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <header className="border-b border-black/10 dark:border-white/10">
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

          <Link href="/about" className="text-xs tracking-[0.3em] uppercase opacity-50">
            About
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-5 py-20 border-b border-black/10 dark:border-white/10">
        <div className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start">
          {/* Left Side: Main Header */}
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rust)" }}>
              Writing
            </p>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Essays on building, becoming, and the quiet work beneath visible success.
            </h1>
          </div>

          {/* Right Side: What I'm Thinking About */}
          <div className="md:border-l border-black/10 dark:border-white/10 md:pl-12 lg:pl-16">
            <h3 className="font-bold uppercase tracking-widest mb-8 text-black" style={{ fontSize: '0.85rem' }}>
              What I'm Thinking About
            </h3>
            
            <p className="text-sm opacity-60 mb-8 italic">
              A glimpse into thoughts and essays currently taking shape...
            </p>

            <ul className="space-y-8">
              <li className="group">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-2 opacity-40">Anticipate</p>
                <h4 className="font-serif text-xl leading-snug group-hover:text-[#c4572a] transition-colors cursor-default">
                  The Stereotyping in Church and How Church Elders Contribute to It
                </h4>
              </li>
              <li className="group">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-2 opacity-40">Anticipate</p>
                <h4 className="font-serif text-xl leading-snug group-hover:text-[#c4572a] transition-colors cursor-default">
                  Charismatic Thoughts Against the Holy Spirit
                </h4>
                <p className="mt-2 text-sm opacity-60">Exploring what it is and what it is not.</p>
              </li>
              <li className="group">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-2 opacity-40">Anticipate</p>
                <h4 className="font-serif text-xl leading-snug group-hover:text-[#c4572a] transition-colors cursor-default">
                  How Religion Thrives on the Selfishness of Men
                </h4>
                <p className="mt-2 text-sm opacity-60">And how that selfishness directly contributes to their exploitation.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Grid of Essays Below */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {essays.map((essay, index) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="group flex flex-col justify-between border border-black/10 dark:border-white/10 p-8 hover:border-[#c4572a]/50 transition-colors bg-white/50"
            >
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--rust)" }}>
                  {essay.category}
                </p>
                <h2 className="font-serif text-3xl leading-tight group-hover:text-[#9a4c2b] transition-colors mb-4">
                  {essay.title}
                </h2>
                <p className="text-sm leading-relaxed opacity-60 mb-8">
                  {essay.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-4 mt-auto">
                <p className="text-[10px] tracking-[0.2em] uppercase opacity-40">
                  {essay.date} · {essay.readingTime || "4 min read"}
                </p>
                <ArrowRight size={16} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}