import { getAllEssays, getEssayBySlug } from "@/lib/essays";
import MdxRenderer from "@/components/MdxRenderer";
import ListenButton from "@/components/ListenButton";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ReadingProgress from "@/components/ReadingProgress";
import ThemeToggle from "@/components/ThemeToggle";
import ReaderControls from "@/components/ReaderControls";

export async function generateStaticParams() {
  const essays = getAllEssays();
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) return { title: "Essay Not Found" };

  return {
    title: `${essay.title} — Austin Okechukwu`,
    description: essay.excerpt,
  };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) notFound();

  const listenText = `${essay.title}. ${essay.excerpt}. ${essay.content}`;

  return (
    <>
  <ReadingProgress />
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <header className="border-b border-black/10 dark:border-white/10">
  <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-4">
      <Image src="/logo.png" alt="Austin Okechukwu logo" width={44} height={44} />
      <span className="font-black tracking-tight uppercase">Austin Okechukwu</span>
    </Link>

    <div className="flex items-center gap-4">
      <ThemeToggle />

      <Link
        href="/writing"
        className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase opacity-50"
      >
        <ArrowLeft size={14} /> All essays
      </Link>
    </div>
  </div>
</header>

      <section className="max-w-3xl mx-auto px-5 pt-16 pb-12 border-b border-black/10 dark:border-white/10">
        <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rust)" }}>
          {essay.category}
        </p>

        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight mb-6">
          {essay.title}
        </h1>

        <p className="font-serif italic text-xl leading-relaxed mb-8 opacity-60">
          {essay.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <p className="text-xs tracking-[0.25em] uppercase opacity-50">
            {essay.date} · {essay.readingTime || "4 min read"}
          </p>

          <ListenButton text={listenText} />
          <ReaderControls />
        </div>

        {essay.heroImage && (
          <div className="relative w-full h-[520px] mt-12 overflow-hidden rounded-sm">
            <Image
              src={essay.heroImage}
              alt={essay.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        )}
      </section>

      <article className="essay-content max-w-3xl mx-auto px-5 py-14 prose prose-lg dark:prose-invert">
        <MdxRenderer content={essay.content} />
      </article>
      <section className="mt-20 border-t border-black/10 dark:border-white/10 pt-12">
  <div className="max-w-3xl">
    <p className="font-serif text-2xl leading-relaxed">
      If something here resonated with you, challenged you, or even unsettled you,
      I'd genuinely like to hear your thoughts.
    </p>

    <p className="mt-6 text-lg leading-relaxed opacity-75">
      Feel free to reply, disagree, ask questions, or share your own experience.
    </p>

    <p className="mt-6 text-lg leading-relaxed opacity-75">
      And if these reflections speak to something deeper in you, subscribe below.
      I'll continue writing honestly about faith, formation, masculinity, purpose,
      and the quiet process of becoming.
    </p>

    <div className="mt-8 flex flex-wrap gap-4">
      <a
        href="mailto:hello@austinokechukwu.com"
        className="border border-current/30 px-5 py-3 text-sm tracking-wide uppercase hover:bg-[var(--ink)] hover:text-[var(--parchment)] transition"
      >
        Send a Message
      </a>

      <a
        href="/#subscribe"
        className="border border-current/30 px-5 py-3 text-sm tracking-wide uppercase hover:bg-[var(--ink)] hover:text-[var(--parchment)] transition"
      >
        Subscribe
      </a>
    </div>
  </div>
</section>
      <section className="max-w-3xl mx-auto px-5 pb-16">
    <div className="border-t pt-10" style={{ borderColor: "var(--peach)" }}>
    <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rust)" }}>
      Related writings
    </p>

    <div className="space-y-6">
      {getAllEssays()
        .filter(
          (item) =>
            item.slug !== essay.slug &&
            item.category === essay.category
        )
        .slice(0, 3)
        .map((item) => (
          <Link key={item.slug} href={`/writing/${item.slug}`} className="block group">
            <h3 className="font-serif text-2xl group-hover:text-[#6f8f4e] transition-colors">
              {item.title}
            </h3>
            <p className="mt-2 text-sm opacity-70">
              {item.excerpt}
            </p>
          </Link>
        ))}
    </div>
  </div>
</section>

      <div className="border-t" style={{ borderColor: "rgba(17,17,15,0.1)", background: "var(--rust)" }}>
        <div className="max-w-3xl mx-auto px-5 py-12 text-center" style={{ color: "var(--cream)" }}>
          <p className="font-serif italic text-2xl mb-6">Enjoyed this essay? Get more in your inbox.</p>
          <Link href="/#subscribe" className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase border-b border-white pb-1">
            Subscribe to the newsletter
          </Link>
        </div>
      </div>

      <footer style={{ background: "var(--night)", color: "var(--parchment)" }}>
        <div className="max-w-6xl mx-auto px-5 py-10 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Austin Okechukwu logo" width={40} height={40} />
            <span className="font-black text-2xl uppercase">Austin</span>
          </Link>

          <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2026 Austin Okechukwu
          </p>
        </div>
      </footer>
    </main>
    </>
  );
}