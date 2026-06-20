import type { Metadata } from "next";
import Link from "next/link";
import { getAllEssays } from "@/lib/essays";
import { ArrowLeft } from "lucide-react";

const BASE_URL = "https://austinokechukwu.com";

// Helper to convert category string to slug
function getSlug(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export function generateStaticParams() {
  const essays = getAllEssays();
  const uniqueCategories = Array.from(new Set(essays.map(essay => essay.category))).filter(Boolean);
  
  return uniqueCategories.map((category) => ({
    slug: getSlug(category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Find the actual category name from the essays
  const essays = getAllEssays();
  const categoryEssay = essays.find(e => getSlug(e.category) === slug);
  const title = categoryEssay ? categoryEssay.category : slug.replace(/-/g, ' ');
  
  const description = `Essays on ${title} by Austin Okechukwu.`;
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

  const allEssays = getAllEssays();
  const essays = allEssays.filter(
    (essay) => getSlug(essay.category || "") === slug
  );

  const categoryTitle = essays.length > 0 ? essays[0].category : slug.replace(/-/g, ' ');

  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <section className="max-w-5xl mx-auto px-5 py-16">
        <Link href="/writing" className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase mb-10 hover:opacity-70 transition-opacity">
          <ArrowLeft size={14} /> Back to Writing
        </Link>

        <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "var(--rust)" }}>
          Category
        </p>

        <h1 className="font-serif text-5xl md:text-7xl mb-12">
          {categoryTitle}
        </h1>

        {essays.length > 0 ? (
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
        ) : (
          <div className="py-12 opacity-50">
            <p>No essays found in this category.</p>
          </div>
        )}
      </section>
    </main>
  );
}