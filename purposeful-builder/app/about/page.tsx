import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight, PenTool, Mic } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Austin Okechukwu is the founder of Condit Associates Ltd and Condit Homes Ltd. He writes about identity, faith, masculinity, building, and the quiet work of becoming.",
  openGraph: {
    title: "About — Austin Okechukwu",
    description:
      "Austin Okechukwu is the founder of Condit Associates Ltd and Condit Homes Ltd. He writes about identity, faith, masculinity, building, and the quiet work of becoming.",
    url: "https://austinokechukwu.com/about",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Austin Okechukwu — The Purposeful Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Austin Okechukwu",
    description:
      "Austin Okechukwu is the founder of Condit Associates Ltd and Condit Homes Ltd. He writes about identity, faith, masculinity, building, and the quiet work of becoming.",
    images: ["/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://austinokechukwu.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      {/* GLOBAL HEADER */}
      <header className="absolute top-0 w-full z-50 border-b border-black/10 dark:border-white/10" style={{ background: "transparent" }}>
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/logo.png" alt="Austin Okechukwu logo" width={44} height={44} priority />
            <span className="font-black tracking-tight uppercase">Austin Okechukwu</span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-xs tracking-[0.25em] uppercase">
              <Link href="/" className="hover:text-[var(--rust)] transition-colors">Home</Link>
              <Link href="/podcast" className="hover:text-[var(--rust)] transition-colors">Podcast</Link>
              <Link href="/writing" className="hover:text-[var(--rust)] transition-colors">Writing</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-black/10 dark:border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.35em] uppercase mb-6 font-bold" style={{ color: "var(--rust)" }}>
              The Purposeful Builder
            </p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8 text-balance">
              I spend most of my life building.
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed opacity-75 font-serif italic text-balance">
              Sometimes it’s buildings. Sometimes businesses. Sometimes ideas. And sometimes, it’s myself.
            </p>
          </div>
        </div>

        {/* Hero Background Image (Portrait) */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-[60vh] md:h-full opacity-20 md:opacity-100 z-0 mask-image-gradient-left">
          <Image 
            src="/images/austin-portrait.jpg" 
            alt="Austin Okechukwu Portrait" 
            fill 
            priority
            className="object-cover object-top"
          />
          {/* Gradient overlay to blend left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--parchment)] via-[var(--parchment)]/60 to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--parchment)] to-transparent md:hidden block" />
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-5">
          <div className="space-y-10 text-lg md:text-xl leading-relaxed font-serif opacity-80">
            
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[var(--rust)]">
              For years, construction has been the language through which I’ve understood life. Working on projects,
              supervising sites, managing people, and solving problems under pressure slowly taught me that structures
              and human beings are not as different as we think.
            </p>

            <p>
              I’m deeply fascinated by foundations, not just in buildings, but in people — and how small compromises
              eventually reveal themselves.
            </p>

            <div className="bg-[var(--card)] p-8 my-12 border-l-4 rounded-r-2xl border-black/5 dark:border-white/5" style={{ borderLeftColor: "var(--rust)" }}>
              <p className="text-sm tracking-[0.2em] uppercase font-sans font-bold opacity-50 mb-4">Professional Background</p>
              <p className="text-lg opacity-90 italic">
                I’m the founder of Condit Associates Ltd and Condit Homes Ltd, where we design, build, and manage projects
                with a strong obsession for precision, quality, and purposeful execution.
              </p>
            </div>

            <p>But beyond architecture and construction, I’m deeply interested in the quieter questions beneath ambition:</p>

            <blockquote className="my-16 py-8 border-y border-black/10 dark:border-white/10 text-center relative">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--parchment)] px-4 text-[var(--rust)] opacity-50">
                <ArrowRight size={24} className="rotate-90" />
              </span>
              <p className="text-2xl md:text-3xl leading-snug font-serif text-balance">
                What builds a man internally before success becomes visible?
              </p>
              <p className="text-2xl md:text-3xl leading-snug font-serif text-balance mt-6">
                Why do some people collapse under pressure while others become stronger?
              </p>
              <p className="text-2xl md:text-3xl leading-snug font-serif text-balance mt-6 italic opacity-80">
                What does purpose actually look like in everyday life?
              </p>
            </blockquote>

            <p>This space is where those thoughts meet.</p>

            <p>
              Here, I write about construction and leadership, masculinity, faith, discipline, growth, marriage and
              relationships, business, and the invisible seasons that shape people long before the world recognizes them.
            </p>

            <p>
              Some posts will come from the construction site. Others will come from silence, observation, failure,
              conversations, or questions that refuse to leave my mind.
            </p>

            <p className="pt-8 mt-8 border-t border-black/10 dark:border-white/10 opacity-70 italic">
              I’m not writing because I have life perfectly figured out. It’s about thinking out loud in public through
              architecture, business, life, faith, and human development, in the hope that someone else out there is
              wrestling with the same questions too.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24" style={{ background: "var(--night)", color: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto px-5 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: "var(--rust)" }}>
            Explore the content
          </p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-12">
            Where to go next
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/writing" className="group flex flex-col items-center justify-center p-12 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all">
              <PenTool size={32} className="mb-6 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all text-[var(--rust)]" />
              <h3 className="font-serif text-2xl mb-2">Read the Essays</h3>
              <p className="text-sm opacity-60">Articles on faith, structure, and manhood.</p>
            </Link>

            <Link href="/podcast" className="group flex flex-col items-center justify-center p-12 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all">
              <Mic size={32} className="mb-6 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all text-[var(--rust)]" />
              <h3 className="font-serif text-2xl mb-2">Listen to the Podcast</h3>
              <p className="text-sm opacity-60">Audio reflections formed in silence.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}