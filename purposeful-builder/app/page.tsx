import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Mail, Search, BookOpen, Building2, Users, Home, Landmark, PenLine, Headphones, PlayCircle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { getAllEssays } from "@/lib/essays";
import { getAllPodcasts } from "@/lib/podcasts";
import EcosystemCarousel from "@/components/EcosystemCarousel";

const portfolio = [
  { title: "Condit Associates Ltd", text: "Design, construction, project management, and purposeful execution." },
  { title: "Condit Homes Ltd", text: "Real estate, housing, land, and long-term property thinking." },
  { title: "Formed in Silence", text: "A book project on men, identity, wounds, becoming, and healing." },
  { title: "Boy Child Mentorship", text: "Teaching boys identity, discipline, responsibility, and safe masculinity." },
];

export default function HomePage() {
  const allEssays = getAllEssays();
  const featuredEssay =
    allEssays.find((essay) => essay.featured) || allEssays[0];
  const essays = allEssays
    .filter((essay) => essay.slug !== featuredEssay.slug)
    .slice(0, 3);
  
  const allPodcasts = getAllPodcasts();
  const latestPodcast = allPodcasts[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://austinokechukwu.com/#person",
        name: "Austin Okechukwu",
        url: "https://austinokechukwu.com",
        description:
          "Founder of Condit Associates Ltd and Condit Homes Ltd. Writer on identity, faith, masculinity, building, and wealth.",
        sameAs: [
          "https://www.instagram.com/arc__austin",
          "https://www.facebook.com/share/17MLSQKYLg/",
        ],
        jobTitle: "Founder & Builder",
        worksFor: [
          { "@type": "Organization", name: "Condit Associates Ltd" },
          { "@type": "Organization", name: "Condit Homes Ltd" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://austinokechukwu.com/#website",
        url: "https://austinokechukwu.com",
        name: "The Purposeful Builder",
        description:
          "Writing for boys becoming men, men becoming whole, and builders learning that structure begins in silence.",
        publisher: { "@id": "https://austinokechukwu.com/#person" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://austinokechukwu.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <header className="sticky top-0 z-40 border-b backdrop-blur-md border-black/10 dark:border-white/10" style={{ background: "color-mix(in srgb, var(--parchment) 90%, transparent)" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4 overflow-hidden">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-14 h-14 border-2 border-[#c4572a] flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="Austin Okechukwu logo" width={52} height={52} className="object-contain scale-110" />
            </div>

            <div>
              <p className="text-[20px] tracking-[0.35em] uppercase" style={{ color: "var(--rust)" }}>
                Austin
              </p>
              <h1 className="text-2xl md:text-3xl font-black uppercase leading-none">
                Okechukwu
              </h1>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.25em] uppercase">
            <Link href="/podcast" className="hover:text-[#c4572a]">Podcast</Link>
            <Link href="/writing" className="hover:text-[#c4572a]">Writing</Link>
            <Link href="/#portfolio" className="hover:text-[#c4572a]">Portfolio</Link>
            <Link href="/about" className="hover:text-[#c4572a]">About</Link>
            <a href="mailto:austinokey@gmail.com" className="hover:text-[#c4572a]">Contact</a>
            <Link href="/search" className="hover:text-[#c4572a]">
  Search
</Link>
            <a href="#subscribe" className="px-4 py-3 border border-black/20 hover:border-[#c4572a]">Subscribe</a>
            <ThemeToggle />
          </nav>

          <div className="lg:hidden w-full flex items-center justify-between gap-3 text-[10px] tracking-[0.18em] uppercase">
  <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase">
    <Link href="/podcast">Podcast</Link>
    <Link href="/writing">Writing</Link>
    <Link href="/#portfolio">Portfolio</Link>
    <Link href="/about">About</Link>
    <a href="mailto:austinokey@gmail.com">Contact</a>
  </div>

  <ThemeToggle />
</div>
        </div>
      </header>

      <section className="relative border-b overflow-hidden border-black/10 dark:border-white/10 min-h-[80vh] flex items-center group">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-bg.jpg"
            alt="Welcome to my digital space"
            fill
            priority
            className="object-cover object-[75%_15%] group-hover:scale-105 transition-transform duration-[2s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 py-20 w-full z-10">
          <div className="max-w-3xl pt-16">
            <p className="text-xs md:text-sm tracking-[0.35em] uppercase mb-6" style={{ color: "var(--peach)" }}>
              The Purposeful Builder
            </p>

            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1] md:leading-[0.92] tracking-tight text-[#fdfbf7] drop-shadow-lg">
              Welcome to my digital space
            </h2>

            <p className="mt-8 text-xl md:text-2xl leading-relaxed max-w-xl text-[#fdfbf7]/80 drop-shadow-md">
              A builder’s reflections on identity, faith, family, masculinity, discipline, wealth, and the quiet work of becoming.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/podcast" className="inline-flex items-center gap-3 px-8 py-5 text-xs tracking-[0.25em] uppercase text-white font-semibold transition-colors hover:bg-[#a64a23]" style={{ background: "var(--rust)" }}>
                Listen to podcast <Headphones size={16} />
              </Link>

              <Link href="/writing" className="inline-flex items-center gap-3 px-8 py-5 text-xs tracking-[0.25em] uppercase text-white border border-white/30 backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/50">
                Read writings <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

{featuredEssay && (
  <section className="max-w-7xl mx-auto px-5 pt-8 pb-12">
    <Link
      href={`/writing/${featuredEssay.slug}`}
      className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#d8d2bd] p-6 md:p-8 overflow-hidden group"
    >
      {/* Background image */}
      <Image
        src="/images/featured-writing-bg.png"
        alt="Featured essay background"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 flex-1">
        <p className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: "#e8a87c" }}>
          Featured writing
        </p>
        <h2 className="font-serif text-3xl md:text-4xl leading-tight text-white/95 group-hover:text-[#e8a87c] transition-colors mb-2">
          {featuredEssay.title}
        </h2>
        <p className="text-sm text-white/60 line-clamp-2 md:line-clamp-1 max-w-3xl">
          {featuredEssay.excerpt}
        </p>
      </div>

      <div className="relative z-10 shrink-0 md:text-right mt-4 md:mt-0">
        <span className="inline-flex items-center text-[#e8a87c] text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors mb-2 border border-[#e8a87c]/30 px-6 py-3 hover:bg-white/10">
          Continue Reading <ArrowRight size={14} className="ml-3" />
        </span>
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mt-3 md:mt-2">
          {featuredEssay.readingTime || "4 min read"}
        </p>
      </div>
    </Link>
  </section>
)}
      {/* Latest Writings List */}
      {essays.length > 0 && (
        <section className="bg-[var(--parchment)] border-b border-black/5" style={{ color: "var(--ink)" }}>
          <div className="max-w-[1600px] mx-auto px-5 md:px-10 py-12 md:py-20">
            {/* Header matching the image */}
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight whitespace-nowrap">Recent Writings</h2>
              <div className="flex-1 h-[1px] bg-black/10"></div>
              <Link href="/writing" className="hidden md:block text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-[var(--rust)] transition-colors whitespace-nowrap">
                View All Writings
              </Link>
            </div>

            {/* 3-column minimal grid with vertical dividers */}
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 border-b border-black/10">
              {essays.map((essay, index) => (
                <Link
                  key={essay.slug}
                  href={`/writing/${essay.slug}`}
                  className="group flex flex-col p-6 md:p-8 hover:bg-black/5 transition-colors"
                >
                  {/* Huge faded number */}
                  <span className="font-serif text-6xl font-bold opacity-[0.08] mb-6 group-hover:opacity-20 transition-opacity">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Category */}
                  <p className="text-[9px] tracking-[0.3em] uppercase mb-4 font-bold" style={{ color: "var(--rust)" }}>
                    {essay.category || "Reflection"}
                  </p>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold leading-snug mb-4 group-hover:text-[var(--rust)] transition-colors">
                    {essay.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm opacity-60 leading-relaxed line-clamp-3 mb-10 flex-1">
                    {essay.excerpt}
                  </p>

                  {/* Date & Read Time */}
                  <p className="text-[9px] tracking-[0.2em] uppercase opacity-40 font-semibold mt-auto">
                    {essay.date} · {essay.readingTime || "4 MIN READ"}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link href="/writing" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-[var(--rust)] transition-colors border-b border-black/20 pb-1">
                View All Writings <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PODCAST */}
      {latestPodcast && (
        <section className="bg-[#121310] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-5 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 bg-black border border-white/5 p-6 md:p-8 rounded-3xl group">
              <div className="relative shrink-0 w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl">
                 <Image src={latestPodcast.coverImage || "/images/austin-podcast-headset.png"} alt={latestPodcast.title} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                 <div className="absolute bottom-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-[var(--rust)] shadow-lg">
                   <PlayCircle size={16} className="text-white" />
                 </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: "var(--rust)" }}>New Episode · {latestPodcast.duration}</p>
                <h2 className="font-serif text-2xl md:text-4xl text-white leading-tight mb-4">{latestPodcast.title}</h2>
                <p className="text-sm md:text-base opacity-60 text-white mb-6 leading-relaxed max-w-2xl">{latestPodcast.excerpt}</p>
                <Link href={`/podcast/${latestPodcast.slug}`} className="inline-flex items-center gap-3 border border-white/20 hover:border-[var(--rust)] text-white px-6 py-3 rounded-full transition-all uppercase tracking-widest text-[10px] font-bold hover:bg-white/5">
                  Listen to full episode
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <div id="portfolio">
        <EcosystemCarousel />
      </div>

      <section id="subscribe" style={{ background: "var(--rust)", color: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-5 py-6">
  <div className="grid md:grid-cols-[1fr_380px] gap-10 items-center border border-white/10 p-5 md:p-6">

    <div>
      <p
        className="text-[10px] tracking-[0.35em] uppercase mb-4 opacity-70"
      >
        Subscribe
      </p>

      <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-xl">
        Reflections worth returning to.
      </h2>

      <p className="mt-2 text-sm md:text-base opacity-70 max-w-lg leading-relaxed">
        Occasional essays on identity, faith, discipline, masculinity, building, and the quiet work of becoming.
      </p>
    </div>

    <form
      action="https://buttondown.email/api/emails/embed-subscribe/arc_austin"
      method="post"
      className="flex flex-col gap-3"
    >
      <input
        type="email"
        name="email"
        placeholder="email address"
        required
        className="bg-transparent border px-5 py-4 outline-none placeholder:text-white/40 text-white text-sm"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      />

      <button
        type="submit"
        className="px-5 py-4 text-[10px] tracking-[0.3em] uppercase font-semibold"
        style={{ background: "var(--peach)", color: "var(--rust-deep)" }}
      >
        Subscribe
      </button>
    </form>

  </div>
</div>
      </section>
<div className="border-t border-white/5">
  <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.25em] uppercase opacity-40">
    <p>© 2026 Austin Okechukwu</p>
    <p>The Purposeful Builder</p>
  </div>
</div>
      <footer className="border-t" style={{ background: "#121310", color: "#f4efe3", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-5 py-16 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 border-2 border-[#c4572a] flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="Austin Okechukwu logo" width={52} height={52} className="object-contain scale-110" />
              </div>
              <div>
                <h5 className="text-3xl font-black uppercase leading-none">Austin</h5>
                <p className="text-[10px] tracking-[0.35em] uppercase mt-1" style={{ color: "var(--rust)" }}>
                  Mind in formation
                </p>
              </div>
            </div>
            <p className="font-serif italic text-lg md:text-xl max-w-xl leading-relaxed opacity-55">
              Writing for boys becoming men, men becoming whole, couples navigating life and marriage, and builders learning that structure begins in silence.
            </p>
          </div>

          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "var(--rust)" }}>Quick access</p>
            <ul className="space-y-3 opacity-65 text-sm">
              <li>
  <Link href="/podcast" className="hover:text-[#c4572a] transition-colors">
    Podcast
  </Link>
</li>
              <li>
  <Link href="/writing" className="hover:text-[#c4572a] transition-colors">
    Writing
  </Link>
</li>
              <li>
  <Link href="/about" className="hover:text-[#c4572a] transition-colors">
    About
  </Link>
</li>
              <li>
  <a href="mailto:austinokey@gmail.com" className="hover:text-[#c4572a] transition-colors">
    Contact
  </a>
</li>
              <li>
  <a href="#subscribe" className="hover:text-[#c4572a] transition-colors">
    Subscribe
  </a>
</li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "var(--rust)" }}>Platforms</p>
            <ul className="space-y-3 opacity-65">
              <li>
  <a href="https://www.instagram.com/arc__austin?igsh=bGp6M3hpdm5sNXgz" target="_blank" rel="noopener noreferrer" className="hover:text-[#c4572a] transition-colors">
    Instagram
  </a>
</li>
              <li>
  <a href="https://www.facebook.com/share/17MLSQKYLg/" target="_blank" rel="noopener noreferrer" className="hover:text-[#c4572a] transition-colors">
    Facebook
  </a>
</li>
              <li>
  <a href="https://www.instagram.com/conditassociatesltd?igsh=MWduM3lzcGd1eGZtag==" target="_blank" rel="noopener noreferrer" className="hover:text-[#c4572a] transition-colors">
    Condit Associates Ltd
  </a>
</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}