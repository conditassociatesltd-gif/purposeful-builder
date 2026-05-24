"use client";

import Link from "next/link";
import { useState } from "react";

const essays = [
  {
    slug: "the-boy-before-the-man",
    title: "The Boy Before the Man",
    excerpt: "A man does not become dangerous in one day.",
  },
  {
    slug: "what-foundations-taught-me",
    title: "What Foundations Taught Me About Character",
    excerpt: "The parts nobody sees are often the parts carrying everything.",
  },
  {
    slug: "we-walk-by-faith",
    title: "We Walk By Faith, We Don't Jump By Faith",
    excerpt: "Faith is not an excuse to bypass formation.",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = essays.filter((essay) =>
    `${essay.title} ${essay.excerpt}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <section className="max-w-5xl mx-auto px-5 py-16">
        <p className="text-xs tracking-[0.35em] uppercase mb-5" style={{ color: "var(--rust)" }}>
          Search writings
        </p>

        <input
          type="text"
          placeholder="Search essays..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-[#d8d2bd] bg-[#fffaf0] px-5 py-5 outline-none mb-10"
        />

        <div className="space-y-6">
          {results.map((essay) => (
            <Link
              key={essay.slug}
              href={`/writing/${essay.slug}`}
              className="block border-b border-[#d8d2bd] pb-6"
            >
              <h2 className="font-serif text-3xl">{essay.title}</h2>
              <p className="mt-3 opacity-70">{essay.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}