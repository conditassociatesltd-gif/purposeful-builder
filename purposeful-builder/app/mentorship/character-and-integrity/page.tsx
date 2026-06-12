import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CharacterAndIntegrityPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-5" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/mentorship" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-16">
          <ArrowLeft size={16} /> Back to Mentorship
        </Link>

        <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] tracking-widest uppercase font-bold mb-6">
          Character & Integrity
        </div>

        <h1 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
          The Boy Who Was Watching
        </h1>

        <article className="essay-content prose">
          <p>
            Growing up, we had a specific set of breakable plates in our house. They were not for everyday use. They were reserved strictly for my mother or for special guests who came to visit. As children, we were not allowed to use them because, well, we could break them.
          </p>
          <p>
            In our house, we took turns washing the dishes. One day, when it was my turn, the inevitable happened: I broke one of those special plates. 
          </p>
          <p>
            I panicked. Instead of bringing it to my mother's notice, I hid it. I was terrified of speaking the truth because I knew exactly what the punishment would be. By keeping quiet, I thought I had saved myself. But what I didn't realize at the time was the silent cost of that decision.
          </p>
          <p>
            When you hide one truth to avoid a consequence, it never stops at one. That single event opens the door to other events where you have to hide things. It sets a pattern in motion. 
          </p>
          <p>
            This is something we see often in young boys. Boys are frequently afraid of the punishment that comes with telling the truth. It is a natural fear. But when they choose not to say those things, they are actively creating an internal environment where hiding becomes their default response. 
          </p>
          
          <blockquote>
            If a boy does not learn to tell the truth when it costs him, he will grow into a man who hides the truth when it costs others.
          </blockquote>

          <p>
            We see the result of this everywhere. Men who, even in their old age, are still hiding the truth because they are afraid of what it will do to them. They become men who are not keepers of their word. They become men who cannot be trusted in business, in marriage, or in leadership. And it all traces back to the patterns built when they were young.
          </p>
          <p>
            Character is not something that suddenly appears when you turn thirty. It is built at a very young age, in the small, quiet moments when you have to choose between facing the music or hiding the pieces of a broken plate.
          </p>
          <p>
            Over time, I had to learn the hard way: you must tell the truth and face the consequences. There were times my mother would punish us for doing something wrong, but I learned to own it. Because if you do not face the consequence of the truth in that moment, you will end up living a very long time with the heavy, exhausting weight of guilt. 
          </p>
          <p>
            When we mentor boys, we don't just tell them "don't lie." We try to show them the freedom of honesty. We try to teach them that the temporary pain of a consequence is always better than the permanent stain of deception. 
          </p>
          <p>
            A man of integrity is simply a boy who learned that his word is his true currency, and that no mistake is worth trading it away.
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
