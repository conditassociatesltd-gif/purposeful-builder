import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About — Austin Okechukwu",
  description: "About Austin Okechukwu, The Purposeful Builder.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <header className="border-b" style={{ borderColor: "rgba(17,17,15,0.1)" }}>
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/logo.png" alt="Austin Okechukwu logo" width={44} height={44} />
            <span className="font-black tracking-tight uppercase">Austin Okechukwu</span>
          </Link>

          <Link href="/" className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase" style={{ color: "rgba(17,17,15,0.5)" }}>
            <ArrowLeft size={14} /> Home
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-20">
        <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rust)" }}>
          About me
        </p>

        <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight mb-10">
          I spend most of my life building.
        </h1>

        <div className="space-y-7 text-xl leading-relaxed font-serif" style={{ color: "rgba(17,17,15,0.75)" }}>
          <p>Sometimes it’s buildings. Sometimes businesses. Sometimes ideas. And sometimes, it’s myself.</p>

          <p>
            For years, construction has been the language through which I’ve understood life. Working on projects,
            supervising sites, managing people, and solving problems under pressure slowly taught me that structures
            and human beings are not as different as we think.
          </p>

          <p>
            I’m deeply fascinated by foundations, not just in buildings, but in people — and how small compromises
            eventually reveal themselves.
          </p>

          <p>
            I’m the founder of Condit Associates Ltd and Condit Homes Ltd, where we design, build, and manage projects
            with a strong obsession for precision, quality, and purposeful execution.
          </p>

          <p>But beyond architecture and construction, I’m deeply interested in the quieter questions beneath ambition:</p>

          <blockquote className="border-l-4 pl-6 italic" style={{ borderColor: "var(--rust)" }}>
            What builds a man internally before success becomes visible?<br />
            Why do some people collapse under pressure while others become stronger?<br />
            What does purpose actually look like in everyday life?
          </blockquote>

          <p>This space is where those thoughts meet.</p>

          <p>
            Here, I write about construction and leadership, masculinity, faith, discipline, growth, marriage and
            relationships, business, and the invisible seasons that shape people long before the world recognizes them.
          </p>

          <p>
            Some posts will come from the construction site. Others will come from silence, observation, failure,
            conversations, or questions that refuse to leave my mind.
          </p>

          <p>
            I’m not writing because I have life perfectly figured out. It’s about thinking out loud in public through
            architecture, business, life, faith, and human development, in the hope that someone else out there is
            wrestling with the same questions too.
          </p>
        </div>
      </section>
    </main>
  );
}