import type { Metadata } from "next";
import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { ArrowLeft } from "lucide-react";

const categoryNames: Record<string, string> = {
  identity: "Identity",
  purpose: "Purpose",
  "faith-process": "Faith & Process",
  "marriage-life": "Marriage & Life",
  building: "Building",
  wealth: "Wealth",
};

const categoryDescriptions: Record<string, string> = {
  identity: "Essays on formation, healing, boyhood, and masculinity by Austin Okechukwu.",
  purpose: "Essays on discipline, calling, becoming, and purposeful living by Austin Okechukwu.",
  "faith-process": "Reflections on God, spiritual growth, and obedience by Austin Okechukwu.",
  "marriage-life": "Essays on love, home, relationships, and responsibility by Austin Okechukwu.",
  building: "Lessons from construction and leadership by Austin Okechukwu.",
  wealth: "Essays on real estate, patience, value, and stewardship by Austin Okechukwu.",
};

const BASE_URL = "https://austinokechukwu.com";

export function generateStaticParams() {
  return [
    { slug: "identity" },
    { slug: "purpose" },
    { slug: "faith-process" },
    { slug: "marriage-life" },
    { slug: "building" },
    { slug: "wealth" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = categoryNames[slug] || slug;
  const description = categoryDescriptions[slug] || `Essays on ${title} by Austin Okechukwu.`;
  const url = `${BASE_URL}/category/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — Austin Okechukwu`,
      description,
      url,
      images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: `${title} — Austin Okechukwu` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Austin Okechukwu`,
      description,
      images: ["/images/og-default.jpg"],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categoryTitle = categoryNames[slug] || slug;

  const essays = getAllEssays().filter(
    (essay) =>
      (essay.category || "").toLowerCase() === categoryTitle.toLowerCase()
  );

  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <section className="max-w-5xl mx-auto px-5 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase mb-10">
          <ArrowLeft size={14} /> Home
        </Link>

        <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "var(--rust)" }}>
          Category
        </p>

        <h1 className="font-serif text-5xl md:text-7xl mb-12">
          {categoryTitle}
        </h1>

        <div className="divide-y border-y" style={{ borderColor: "var(--peach)" }}>
          {essays.map((essay) => (
            <Link key={essay.slug} href={`/writing/${essay.slug}`} className="block py-8 group">
              <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--rust)" }}>
                {essay.date} · {essay.readingTime || "4 min read"}
              </p>

              <h2 className="font-serif text-3xl md:text-4xl group-hover:text-[#6f8f4e] transition-colors">
                {essay.title}
              </h2>

              <p className="mt-4 opacity-70 max-w-2xl">
                {essay.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}