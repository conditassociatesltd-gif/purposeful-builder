import { getAllPodcasts, getPodcastBySlug } from "@/lib/podcasts";
import MdxRenderer from "@/components/MdxRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, PlayCircle, PauseCircle, SkipForward, SkipBack, Volume2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export async function generateStaticParams() {
  const podcasts = getAllPodcasts();
  return podcasts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const podcast = getPodcastBySlug(slug);

  if (!podcast) return { title: "Podcast Not Found" };

  return {
    title: podcast.title,
    description: podcast.excerpt,
  };
}

export default async function PodcastEpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const podcast = getPodcastBySlug(slug);

  if (!podcast) notFound();

  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-black/10 dark:border-white/10" style={{ background: "var(--parchment)" }}>
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/logo.png" alt="Austin Okechukwu logo" width={44} height={44} priority />
            <span className="font-black tracking-tight uppercase">Austin Okechukwu</span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-[10px] tracking-[0.25em] uppercase font-semibold">
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
      <div className="h-[77px]" />

      {/* EPISODE HERO */}
      <section className="max-w-4xl mx-auto px-5 pt-16 pb-12">
        <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-center border-b border-black/10 dark:border-white/10 pb-16">
          
          {/* Cover Image */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-black/10">
            {podcast.coverImage && (
              <Image src={podcast.coverImage} alt={podcast.title} fill className="object-cover" priority />
            )}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer hover:bg-black/40 transition-colors">
               <PlayCircle size={80} className="text-white opacity-90 group-hover:scale-110 transition-transform" />
            </div>
          </div>

          {/* Details & Player */}
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "var(--rust)" }}>
              Episode · {podcast.date}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-tight mb-6">
              {podcast.title}
            </h1>
            <p className="font-serif italic text-xl leading-relaxed opacity-70 mb-10">
              {podcast.excerpt}
            </p>

            {/* Custom Audio Player UI (Static Mockup for now, ready for ElevenLabs audio) */}
            <div className="bg-[var(--card)] p-6 rounded-xl border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-wider opacity-50 font-medium">00:00</span>
                <span className="text-xs tracking-wider opacity-50 font-medium">{podcast.duration}</span>
              </div>
              <div className="h-2 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden mb-6 cursor-pointer">
                <div className="h-full w-0 bg-[var(--rust)] rounded-full" />
              </div>
              <div className="flex items-center justify-center gap-8">
                <button className="opacity-50 hover:opacity-100 transition-opacity"><SkipBack size={24} /></button>
                <button className="text-[var(--rust)] hover:scale-110 transition-transform"><PlayCircle size={48} /></button>
                <button className="opacity-50 hover:opacity-100 transition-opacity"><SkipForward size={24} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOW NOTES */}
      <article className="essay-content max-w-3xl mx-auto px-5 py-8 prose prose-lg dark:prose-invert">
        <h3 className="font-serif text-2xl mb-6">Show Notes</h3>
        <MdxRenderer content={podcast.content} />
      </article>

      <div className="h-32" />
    </main>
  );
}
