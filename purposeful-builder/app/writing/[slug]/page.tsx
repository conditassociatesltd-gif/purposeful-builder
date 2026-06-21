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

  const BASE_URL = "https://austinokechukwu.com";
  const url = `${BASE_URL}/writing/${slug}`;
  const ogImage = essay.heroImage
    ? `${BASE_URL}${essay.heroImage}`
    : `${BASE_URL}/images/og-default.jpg`;

  return {
    title: essay.title,
    description: essay.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: essay.title,
      description: essay.excerpt,
      publishedTime: essay.date ? new Date(essay.date).toISOString() : undefined,
      authors: ["Austin Okechukwu"],
      tags: [essay.category],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: essay.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: essay.title,
      description: essay.excerpt,
      images: [ogImage],
      creator: "@arc__austin",
    },
  };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) notFound();

  const listenText = `${essay.title}. ${essay.excerpt}. ${essay.content}`;

  const BASE_URL = "https://austinokechukwu.com";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.excerpt,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Austin Okechukwu",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Austin Okechukwu",
      url: BASE_URL,
    },
    url: `${BASE_URL}/writing/${slug}`,
    datePublished: essay.date ? new Date(essay.date).toISOString() : undefined,
    dateModified: essay.date ? new Date(essay.date).toISOString() : undefined,
    image: essay.heroImage
      ? `${BASE_URL}${essay.heroImage}`
      : `${BASE_URL}/images/og-default.jpg`,
    articleSection: essay.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/writing/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
  <ReadingProgress />
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <header className="fixed top-0 left-0 w-full z-50 border-b border-black/10 dark:border-white/10" style={{ background: "var(--parchment)" }}>
  <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-4">
      <Image src="/logo.png" alt="Austin Okechukwu logo" width={44} height={44} priority />
      <span className="font-black tracking-tight uppercase">Austin Okechukwu</span>
    </Link>

            <nav className="hidden md:flex items-center gap-6 text-[10px] tracking-[0.25em] uppercase font-semibold">
              <Link href="/" className="hover:text-[var(--rust)] transition-colors">Home</Link>
              <Link href="/podcast" className="hover:text-[var(--rust)] transition-colors">Podcast</Link>
              <Link href="/writing" className="hover:text-[var(--rust)] transition-colors">Writing</Link>
              <Link href="/#portfolio" className="hover:text-[var(--rust)] transition-colors">Portfolio</Link>
              <Link href="/about" className="hover:text-[var(--rust)] transition-colors">About</Link>
            </nav>

    <div className="flex items-center gap-3">
      <ReaderControls />
      <ThemeToggle />

      <Link
        href="/writing"
        className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase opacity-50 ml-2"
      >
        <ArrowLeft size={14} /> All essays
      </Link>
    </div>
  </div>
</header>
<div className="h-[77px]" />

      <section className="max-w-3xl mx-auto px-5 pt-16 pb-12 border-b border-black/10 dark:border-white/10">
        <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rust)" }}>
          {essay.category}
        </p>

        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight mb-6">
          {essay.title}
        </h1>

        {essay.subtitle && (
          <h2 className="font-serif text-2xl md:text-3xl leading-relaxed mb-6 opacity-80">
            {essay.subtitle}
          </h2>
        )}

        <p className="font-serif italic text-xl leading-relaxed mb-8 opacity-60">
          {essay.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <p className="text-xs tracking-[0.25em] uppercase opacity-50">
            {essay.date} · {essay.readingTime || "4 min read"}
          </p>

          <ListenButton text={listenText} />
        </div>

        {essay.heroImage && (
          <div className="relative w-full h-[340px] mt-12 overflow-hidden rounded-sm">
            <Image
              src={essay.heroImage}
              alt={essay.title}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        )}
      </section>

      <article className="essay-content max-w-3xl mx-auto px-5 py-14 prose prose-lg dark:prose-invert">
        <MdxRenderer content={essay.content} />
      </article>
      <section className="mt-16 border-t border-black/10 dark:border-white/10 pt-16">
        <div className="max-w-3xl mx-auto">
          <div className="p-8 md:p-10 border-l-4 bg-black/[0.03] dark:bg-white/[0.03] rounded-r-sm" style={{ borderColor: "var(--rust)" }}>
            <p className="font-serif italic text-lg leading-relaxed opacity-80">
              If something here resonated with you, challenged you, or even unsettled you,
              I'd genuinely like to hear your thoughts. Feel free to reply, disagree, ask questions, or share your own experience.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="font-bold" style={{ color: "var(--rust)" }}>→</span>
              <a
                href="mailto:hello@austinokechukwu.com"
                className="text-sm tracking-wide opacity-60 hover:opacity-100 hover:text-[var(--rust)] transition-colors font-medium lowercase"
              >
                hello@austinokechukwu.com
              </a>
            </div>
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

      <footer style={{ background: "var(--night)", color: "#f4efe3" }}>
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