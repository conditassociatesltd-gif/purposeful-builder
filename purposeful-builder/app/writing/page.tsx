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
  
  // Get the most recent essay for the hero section
  const featuredEssay = essays.length > 0 ? essays[0] : null;
  const remainingEssays = essays.length > 0 ? essays.slice(1) : [];

  // Extract unique categories for the "Browse By Topic" section
  const uniqueCategories = Array.from(new Set(essays.map(essay => essay.category))).filter(Boolean);

  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-[#c4572a] flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Austin Okechukwu logo"
                width={46}
                height={46}
                className="object-contain scale-110"
                priority
              />
            </div>
            <span className="font-black tracking-tight uppercase">Austin Okechukwu</span>
          </Link>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/about" className="text-xs tracking-[0.3em] uppercase opacity-50 hover:opacity-100 transition-opacity">
              About
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Section */}
      <section className="max-w-[1400px] mx-auto px-5 py-16 lg:py-20 border-b border-black/10 dark:border-white/10">
        
        {/* Top: Minimal Featured Essay */}
        <div className="mb-16 lg:mb-20 max-w-4xl">
          {featuredEssay ? (
            <div className="flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] tracking-[0.2em] font-bold uppercase" style={{ color: "var(--rust)" }}>{featuredEssay.category}</span>
                <div className="h-px w-12 bg-[#c4572a] opacity-50"></div>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-[4.5rem] leading-[1.05] tracking-tight mb-8 text-balance">
                {featuredEssay.title}
              </h1>

              <p className="text-lg md:text-xl leading-relaxed opacity-80 mb-10 max-w-2xl line-clamp-3">
                {featuredEssay.excerpt}
              </p>

              <Link href={`/writing/${featuredEssay.slug}`} className="group inline-flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-bold text-black dark:text-white pb-2 border-b border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-all w-fit">
                Read Essay
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col py-12 opacity-50">
              <p>No essays published yet.</p>
            </div>
          )}
        </div>

        {/* Bottom: 3-Column Meta Spread */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 pt-12 border-t border-black/10 dark:border-white/10">
          
          {/* ABOUT THIS MIND */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] font-bold uppercase mb-6 opacity-40">About This Mind</h3>
            <p className="text-[13px] leading-relaxed mb-6 opacity-80">
              I am the founder of Condit Associates Ltd and Condit Homes Ltd. I write about identity, faith, masculinity, building, and the quiet work of becoming.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://linkedin.com/in/austinokechukwu" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] uppercase font-bold hover:opacity-50 transition-opacity flex items-center gap-1 border-b border-black/20 dark:border-white/20 pb-1">LinkedIn <ArrowRight size={10} className="-rotate-45" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] uppercase font-bold hover:opacity-50 transition-opacity flex items-center gap-1 border-b border-black/20 dark:border-white/20 pb-1">Facebook <ArrowRight size={10} className="-rotate-45" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] uppercase font-bold hover:opacity-50 transition-opacity flex items-center gap-1 border-b border-black/20 dark:border-white/20 pb-1">Instagram <ArrowRight size={10} className="-rotate-45" /></a>
            </div>
          </div>

          {/* BROWSE BY TOPIC */}
          {uniqueCategories.length > 0 && (
            <div>
              <h3 className="text-[10px] tracking-[0.25em] font-bold uppercase mb-6 opacity-40">Browse By Topic</h3>
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((topic, i) => (
                  <Link key={topic} href={`/category/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} className={`text-[9px] tracking-[0.1em] uppercase border border-black/15 dark:border-white/15 px-3 py-1.5 transition-colors ${i === 0 ? 'bg-[#c4572a] text-white border-[#c4572a]' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CURRENTLY THINKING ABOUT */}
          <div>
            <h3 className="text-[10px] tracking-[0.25em] font-bold uppercase mb-6 opacity-40">Currently Thinking About</h3>
            <ul className="space-y-4">
              <li>
                <p className="font-serif text-[15px] leading-snug italic opacity-80 hover:opacity-100 transition-opacity">
                  "Blasphemous Thoughts Against the Holy Spirit — Exploring what it is and what it is not."
                </p>
              </li>
              <li>
                <p className="font-serif text-[15px] leading-snug italic opacity-80 hover:opacity-100 transition-opacity">
                  "The Stereotyping in Church and How Church Elders Contribute to It."
                </p>
              </li>
              <li>
                <p className="font-serif text-[15px] leading-snug italic opacity-80 hover:opacity-100 transition-opacity">
                  "How Religion Thrives on the Selfishness of Men, and how that selfishness directly contributes to their exploitation."
                </p>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Grid of Essays Below */}
      <section className="max-w-[1400px] mx-auto px-5 py-24">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {remainingEssays.map((essay, index) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="group flex flex-col h-full hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors p-4 -mx-4 rounded-xl"
            >
              <div>
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "var(--rust)" }}>
                  {essay.category}
                </p>
                <h2 className="font-serif text-2xl leading-[1.1] group-hover:text-[#c4572a] transition-colors mb-4">
                  {essay.title}
                </h2>
                <p className="text-xs leading-relaxed opacity-60 mb-6 line-clamp-4">
                  {essay.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 mt-auto opacity-40 group-hover:opacity-100 transition-opacity">
                <p className="text-[9px] tracking-[0.1em] uppercase font-bold">
                  {essay.date}
                </p>
                <ArrowRight size={14} className="-rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}