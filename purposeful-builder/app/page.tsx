import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Search, BookOpen, Building2, Users, Home, Landmark, PenLine } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { getAllEssays } from "@/lib/essays";

const categories = [
  { title: "Identity", slug: "identity", text: "Formation, healing, boyhood, masculinity.", icon: Users },
  { title: "Purpose", slug: "purpose", text: "Discipline, becoming, calling, process.", icon: Landmark },
  { title: "Faith & Process", slug: "faith-process", text: "Reflections on God, growth, and obedience.", icon: BookOpen },
  { title: "Marriage & Life", slug: "marriage-life", text: "Love, home, relationships, responsibility.", icon: Home },
  { title: "Building", slug: "building", text: "Lessons from construction and leadership.", icon: Building2 },
  { title: "Wealth", slug: "wealth", text: "Real estate, patience, value, stewardship.", icon: PenLine },
];

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

  return (
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
            <Link href="/writing" className="hover:text-[#c4572a]">Writing</Link>
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
    <Link href="/writing">Writing</Link>
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
              <Link href="/about" className="inline-flex items-center gap-3 px-8 py-5 text-xs tracking-[0.25em] uppercase text-white font-semibold transition-colors hover:bg-[#5a743e]" style={{ background: "var(--rust)" }}>
                About me <ArrowRight size={16} />
              </Link>

              <Link href="/writing" className="inline-flex items-center gap-3 px-8 py-5 text-xs tracking-[0.25em] uppercase text-white border border-white/30 backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/50">
                Read writings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 pt-10 pb-8">
  <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">
    {categories.map((item) => {
      const Icon = item.icon;
      return (
        <Link
  href={`/category/${item.slug}`}
  key={item.title}
  className="shadow-sm border p-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300" style={{ background: "var(--card)", borderColor: "var(--peach)" }}
>
  <div className="flex items-center gap-3">
    <Icon size={24} style={{ color: "var(--rust)" }} />

    <h3 className="font-bold uppercase tracking-wide text-sm">
      {item.title}
    </h3>
  </div>

  <p className="mt-3 text-sm leading-relaxed opacity-70">
    {item.text}
  </p>
</Link>
      );
    })}
  </div>
</section>
{featuredEssay && (
  <section className="max-w-7xl mx-auto px-5 pt-8 pb-12">
    <Link
      href={`/writing/${featuredEssay.slug}`}
      className="relative grid md:grid-cols-[1.1fr_0.9fr] gap-8 border border-[#d8d2bd] p-6 md:p-10 overflow-hidden group"
      style={{ minHeight: "420px" }}
    >
      {/* Background image */}
      <Image
        src="/images/featured-writing-bg.png"
        alt=""
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />

      <div className="relative z-10">
        <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "#e8a87c" }}>
          Featured writing
        </p>

        <h2 className="font-serif text-4xl md:text-6xl leading-tight text-white/95 group-hover:text-[#e8a87c] transition-colors">
          {featuredEssay.title}
        </h2>

        <p className="mt-5 text-lg leading-relaxed text-white/75 max-w-4xl">
          {featuredEssay.excerpt}
        </p>

<div className="mt-8">
  <span className="inline-flex items-center border border-white/40 text-white px-5 py-2 text-sm tracking-wide hover:bg-white hover:text-black transition-colors">
    Continue Reading →
  </span>
</div>
        <p className="mt-8 text-xs tracking-[0.25em] uppercase text-white/40">
          {featuredEssay.date} · {featuredEssay.readingTime || "4 min read"}
        </p>
      </div>
<div className="relative z-10 hidden md:flex items-end justify-end">
  <div className="max-w-sm">
    <p className="text-sm uppercase tracking-[0.3em] text-white/35 mb-4">
      Reflection
    </p>

    <p className="font-serif text-2xl leading-relaxed text-white/55 italic">
      &ldquo;Writing became a form of excavation.&rdquo;
    </p>
  </div>
</div>
    </Link>
  </section>
)}
<section className="max-w-7xl mx-auto px-5 pt-8 pb-12">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-bold uppercase tracking-wide">Latest writings</h3>
          <Link href="/writing" className="hidden md:flex items-center gap-3 text-xs tracking-[0.25em] uppercase">
            View all writings <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {essays.map((essay) => (
            <Link key={essay.slug} href={`/writing/${essay.slug}`} className="group border p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300" style={{ background: "var(--card)", borderColor: "var(--peach)" }}>

              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--rust)" }}>
                  {essay.category}
                </p>
                <h4 className="font-serif text-3xl leading-tight group-hover:text-[#c4572a] transition-colors">
                  {essay.title}
                </h4>
                <p className="mt-4 text-sm leading-relaxed opacity-70">
                  {essay.excerpt}
                </p>
                <p className="mt-6 text-xs tracking-[0.2em] uppercase opacity-50">
                  {essay.date} · {essay.readingTime || "4 min read"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
  className="max-w-7xl mx-auto px-5 py-12">
        <div
  className="grid lg:grid-cols-[1fr_1.2fr] gap-10 border p-8 md:p-12 rounded-sm"
  style={{ background: "var(--soft-green)", borderColor: "var(--peach)" }}
>
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "var(--rust)" }}>
              What I’m building
            </p>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              A personal portfolio of work, ideas, business, and formation.
            </h3>
            <p className="mt-5 leading-relaxed opacity-70">
              Beyond writing, this space connects the businesses, books, mentorship, and construction work that shape my life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {portfolio.map((item) => (
              <div key={item.title} className="border p-5" style={{ borderColor: "var(--peach)" }}>
                <h4 className="font-bold uppercase tracking-wide">{item.title}</h4>
                <p className="mt-3 text-sm leading-relaxed opacity-70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <footer className="border-t" style={{ background: "#121310", color: "var(--parchment)", borderColor: "rgba(255,255,255,0.06)" }}>
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
  <a href="https://www.instagram.com/arc__austin?igsh=bGp6M3hpdm5sNXgz" target="_blank" className="hover:text-[#c4572a] transition-colors">
    Instagram
  </a>
</li>
              <li>
  <a href="https://www.facebook.com/share/17MLSQKYLg/" target="_blank" className="hover:text-[#c4572a] transition-colors">
    Facebook
  </a>
</li>
              <li>
  <a href="https://www.instagram.com/conditassociatesltd?igsh=MWduM3lzcGd1eGZtag==" target="_blank" className="hover:text-[#c4572a] transition-colors">
    Condit Associates Ltd
  </a>
</li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}