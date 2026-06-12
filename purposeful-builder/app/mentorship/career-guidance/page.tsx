import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CareerGuidancePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-5" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/mentorship" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-16">
          <ArrowLeft size={16} /> Back to Mentorship
        </Link>

        <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] tracking-widest uppercase font-bold mb-6">
          Career Guidance
        </div>

        <h1 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
          Work Is Not a Punishment
        </h1>

        <article className="essay-content prose">
          <p>
            I began to work very early in my life, especially after the death of my father.
          </p>
          <p>
            As early as Primary Two, I found myself doing something unusual for a child my age: I started copying notes for people. And to my surprise, they would pay me for it. But the truth is, I didn't do it just for the money. I actually loved copying notes. It helped me retain information, and as a byproduct, it made my handwriting exceptionally good. 
          </p>
          <p>
            Because I loved doing it, it was effortless. It didn't feel like a burden. I was solving a problem for others, doing something I genuinely enjoyed, and being rewarded for it. 
          </p>
          <p>
            That early experience shaped my entire philosophy of work. It taught me that work is at its best when it comes from the inside out. You should seek to do the things you love—the things that align with your natural design—and use them to solve problems for people.
          </p>
          <p>
            Unfortunately, that is not how most of us are taught to view work. Growing up, the adults around me talked about jobs as something you endured. The goal of labour was the absence of labour. You worked so you could eventually stop working. Rest was the reward. Work was the sentence.
          </p>
          <p>
            Nobody told me that work was given to man <em>before</em> the fall. 
          </p>
          
          <blockquote>
            Work is not a punishment for sin. God placed Adam in a garden and gave him something to tend before sin ever entered the world. Work was the first human assignment.
          </blockquote>

          <p>
            God Himself is still actively working. He is a builder, and He invited man to participate in that building. That changes everything. It means we don't just work to get rest; we work because it is in our nature to create, to order, and to solve problems.
          </p>
          <p>
            This is what every young boy needs to know: a man is designed to work. But that work should not be a lifelong prison sentence doing something you hate. It should come from the inside out. It starts with knowing who you are, recognizing what you love doing, and finding the specific problems you are supposed to solve in the world.
          </p>
          <p>
            When we sit with boys and talk about their careers, we start from the inside. What do you love doing so much that it feels easy to you? What problem in the world bothers you enough that you want to fix it? What are the things you can do even into your old age—where even if you aren't actively doing the heavy lifting, you'll happily be coaching others how to do it?
          </p>
          <p>
            A career built on economic trends without an understanding of your own design will eventually empty you. But a career built from the inside out—doing what you love to solve real problems—is sustainable. 
          </p>
          <p>
            The boy who can barely sit still in class but assembles things with his hands, the quiet boy who writes better than he speaks, the boy whose handwriting makes others ask him to copy their notes—they are all carrying something. 
          </p>
          <p>
            We are just trying to help them see it, so they can spend the rest of their lives building with it.
          </p>
        </article>

        <div className="mt-16 pt-8 border-t border-black/10">
          <Link href="/mentorship" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
            <ArrowLeft size={16} /> Back to Mentorship
          </Link>
        </div>
      </div>
    </main>
  );
}
