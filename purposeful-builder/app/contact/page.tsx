import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Contact",
  description: "Get in touch. I'd genuinely like to hear your thoughts.",
  openGraph: {
    title: "Contact — Austin Okechukwu",
    description: "Get in touch. I'd genuinely like to hear your thoughts.",
    url: "https://austinokechukwu.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      {/* GLOBAL HEADER */}
      <header className="w-full z-50 border-b border-black/10 dark:border-white/10" style={{ background: "transparent" }}>
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
              <Link href="/#portfolio" className="hover:text-[var(--rust)] transition-colors">Portfolio</Link>
              <Link href="/about" className="hover:text-[var(--rust)] transition-colors">About</Link>
              <Link href="/contact" className="hover:text-[var(--rust)] transition-colors">Contact</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-5 py-24 md:py-32 flex flex-col justify-center">
        <h1 className="font-serif text-3xl md:text-5xl tracking-tight mb-16 uppercase border-b border-black/10 dark:border-white/10 pb-8">
          Contact
        </h1>

        <div className="grid md:grid-cols-2 gap-16 md:gap-32">
          {/* Left Column */}
          <div className="max-w-md">
            <p className="font-serif italic text-xl md:text-2xl leading-relaxed opacity-80 mb-12">
              If something here resonated with you, challenged you, or even unsettled you,
              I'd genuinely like to hear your thoughts. Feel free to reply, disagree, ask questions, or share your own experience.
            </p>
            
            <a 
              href="https://austinokechukwu.com" 
              className="text-xs tracking-[0.35em] uppercase font-bold hover:text-[var(--rust)] transition-colors border-b border-black/20 dark:border-white/20 pb-1"
            >
              austinokechukwu.com
            </a>
          </div>

          {/* Right Column */}
          <div className="border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 pt-16 md:pt-0 md:pl-16 flex flex-col justify-center">
            <h2 className="text-xs tracking-[0.35em] uppercase mb-10 opacity-50 font-bold">
              Elsewhere
            </h2>
            
            <ul className="space-y-6 text-sm tracking-[0.2em] uppercase font-semibold">
              <li>
                <a href="https://www.instagram.com/arc__austin" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--rust)] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/austinokechukwu" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--rust)] transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/17MLSQKYLg/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--rust)] transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="mailto:hello@austinokechukwu.com" className="hover:text-[var(--rust)] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
