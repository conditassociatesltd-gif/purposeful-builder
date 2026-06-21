import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, PlayCircle, PauseCircle, FastForward, Rewind, Volume2, CloudDrizzle, Headphones } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { getAllPodcasts } from "@/lib/podcasts";

export const metadata = {
  title: "Podcast",
  description: "Listen to the Purposeful Builder podcast. Audio essays on identity, faith, and masculinity.",
};

export default function PodcastPage() {
  const podcasts = getAllPodcasts();
  const trendingPodcasts = podcasts.slice(0, 3);
  const latestPodcasts = podcasts.slice(3);

  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      {/* HEADER */}
      <header className="absolute top-0 w-full z-50 border-b border-black/10 dark:border-white/10" style={{ background: "transparent" }}>
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/logo.png" alt="Austin Okechukwu logo" width={44} height={44} priority />
            <span className="font-black tracking-tight uppercase">Austin Okechukwu</span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-xs tracking-[0.25em] uppercase">
              <Link href="/" className="hover:text-[var(--rust)] transition-colors">Home</Link>
              <Link href="/writing" className="hover:text-[var(--rust)] transition-colors">Writing</Link>
              <Link href="/about" className="hover:text-[var(--rust)] transition-colors">About</Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* HERO SECTION (Apricot Style) */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="max-w-xl">
            <p className="font-serif italic text-3xl md:text-4xl text-[var(--rust)] mb-2 tracking-wide opacity-90">
              The
            </p>
            <h1 className="font-serif text-6xl md:text-7xl leading-[0.95] tracking-tight mb-8">
              Formation Podcast
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-75 mb-10">
              I love exploring the quiet work of becoming—helping men and builders attract their true identity, purpose, and impact.
            </p>
            
            <p className="text-[10px] tracking-[0.3em] uppercase mb-4 opacity-60 font-bold">Watch and Listen</p>
            <div className="flex flex-wrap gap-3">
              {['Apple', 'Spotify', 'Soundcloud', 'Podbean'].map(platform => (
                <span key={platform} className="px-6 py-2 border border-black/20 dark:border-white/20 rounded-full text-xs tracking-[0.2em] uppercase hover:bg-[var(--rust)] hover:text-white hover:border-[var(--rust)] transition-all cursor-pointer">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Background Image (Portrait) */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-[60vh] md:h-full opacity-20 md:opacity-100 z-0 mask-image-gradient-left">
          <Image 
            src="/images/austin-podcast-headset.png" 
            alt="Austin Okechukwu Portrait" 
            fill 
            priority
            className="object-cover object-top"
          />
          {/* Gradient overlay to blend left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--parchment)] via-[var(--parchment)]/50 to-transparent md:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--parchment)] to-transparent md:hidden block" />
        </div>
      </section>

      {/* WELCOME SECTION (Dark Theme) */}
      <section className="py-24" style={{ background: "var(--night)", color: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: "var(--rust)" }}>
            Welcome to my podcast
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] mb-8">
            Formation Podcast <br/>
            <span className="italic opacity-75">The Architecture of Men.</span>
          </h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto leading-relaxed mb-16">
            A deep dive into the unspoken struggles, the quiet victories, and the structural foundations required to build a purposeful life, faith, and legacy.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 opacity-50 grayscale">
            <p className="text-[10px] tracking-[0.3em] uppercase">As heard on:</p>
            <div className="flex items-center gap-8">
              <span className="font-bold flex items-center gap-2"><Headphones size={20}/> Spotify</span>
              <span className="font-bold flex items-center gap-2"><CloudDrizzle size={20}/> Apple</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING TOPICS (Combination of Apricot and Tusant) */}
      <section className="py-32" style={{ background: "var(--parchment)" }}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">
            
            {/* Left Side: Mobile Phone Mockup */}
            <div className="relative mx-auto w-full max-w-[320px]">
              {/* Phone Frame */}
              <div className="relative border-[12px] border-[#1a1a1a] rounded-[3rem] overflow-hidden bg-white shadow-2xl aspect-[9/19]">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-3xl z-20" />
                
                {/* Screen Content */}
                <div className="relative h-full w-full bg-black flex flex-col justify-end text-white">
                  {/* Full Screen Image */}
                  <Image src="/images/austin-podcast-headset.png" alt="Podcast listening" fill className="object-cover object-top z-0 opacity-80" />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/70 to-transparent z-10" />

                  {/* Player Content Over Image */}
                  <div className="relative z-20 p-6 text-center">
                    <p className="text-[9px] tracking-widest uppercase text-[var(--rust)] font-bold mb-2">Now Playing</p>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-1 leading-snug">The Architecture of Men</h3>
                    <p className="text-[11px] uppercase tracking-widest opacity-60 mb-6 font-medium">Formation Podcast</p>
                    
                    {/* Mock Audio Player inside Phone */}
                    <div className="space-y-2">
                      <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
                        <div className="absolute top-0 left-0 h-full w-[15%] bg-[var(--rust)] rounded-full shadow-[0_0_10px_var(--rust)]" />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-medium opacity-60 pb-2 tracking-wider">
                        <span>02:14</span>
                        <span>-42:15</span>
                      </div>
                      <div className="flex justify-center gap-6 items-center pt-2">
                        <Rewind size={22} className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
                        <PauseCircle size={46} className="text-[var(--rust)] hover:scale-105 transition-transform cursor-pointer shadow-xl rounded-full" />
                        <FastForward size={22} className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Tusant Dark Episode List */}
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 opacity-50">What you will learn here</p>
              <h2 className="font-serif text-5xl md:text-6xl tracking-tight mb-12">Trending Topics</h2>

              <div className="space-y-6">
                {trendingPodcasts.map((podcast, idx) => (
                  <div key={podcast.slug} className="flex flex-col sm:flex-row gap-6 p-6 rounded-xl shadow-lg border border-white/5 group" style={{ background: "var(--night)", color: "var(--cream)" }}>
                    {/* Episode Thumbnail */}
                    <div className="relative w-full sm:w-48 aspect-video sm:aspect-square shrink-0 overflow-hidden rounded-lg bg-black/50">
                      {podcast.coverImage && (
                        <Image src={podcast.coverImage} alt={podcast.title} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                      )}
                    </div>

                    {/* Episode Info & Player */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/podcast/${podcast.slug}`}>
                          <h3 className="font-serif text-2xl group-hover:text-[var(--rust-dark)] transition-colors mb-2">
                            Episode 0{idx + 1}: {podcast.title}
                          </h3>
                        </Link>
                        <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mb-3">
                          {podcast.date} · ADMIN · {podcast.category || "PODCAST"} · {podcast.duration}
                        </p>
                        <p className="text-sm opacity-70 leading-relaxed mb-6 line-clamp-2">
                          {podcast.excerpt}
                        </p>
                      </div>

                      {/* TUSANT Style Player Bar */}
                      <div className="flex items-center gap-4 mt-auto">
                        <button className="text-[var(--rust-dark)] hover:text-white transition-colors">
                          <PlayCircle size={32} />
                        </button>
                        <div className="flex-1 flex items-center gap-3">
                          <span className="text-[10px] opacity-50">00:00</span>
                          <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                            <div className="h-full w-0 bg-[var(--rust-dark)]" />
                          </div>
                          <span className="text-[10px] opacity-50">{podcast.duration}</span>
                        </div>
                        <Volume2 size={16} className="opacity-50" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
