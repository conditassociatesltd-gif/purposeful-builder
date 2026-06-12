import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EmotionalIntelligencePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-5" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/mentorship" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-16">
          <ArrowLeft size={16} /> Back to Mentorship
        </Link>

        <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] tracking-widest uppercase font-bold mb-6">
          Emotional Intelligence
        </div>

        <h1 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
          Boys Don't Cry, Until They Do
        </h1>

        <article className="essay-content prose">
          <p>
            I remember the first time I saw my father cry.
          </p>
          <p>
            I was young — maybe nine or ten. It was at a funeral. And the sight of it disturbed me in a way I could not explain. Not because it was sad. But because it was <em>him</em>. The person who was supposed to have no cracks. The person who was supposed to be unmoved by the things that moved the rest of us.
          </p>
          <p>
            He was human. He grieved. Of course he did. But I had been watching men my whole life hold their faces together in a way that told me tears were weakness. So the sight of his tears made me feel two things at the same time: tenderness for him, and a kind of quiet panic. Like a rule had been broken that I did not know how to replace.
          </p>
          <p>
            That is what many of us were handed. Not a map for our emotions. A lid.
          </p>
          <p>
            Push it down. Control yourself. Be a man. Don't let them see you break.
          </p>
          <p>
            And so we became very skilled at the lid. We learned to carry anger without naming it. Hurt without examining it. Loneliness without admitting it. We learned to convert almost every emotion into one of the two that society permitted us — silence or aggression.
          </p>
          <p>
            And then we became men. And we married women. And we raised children. And we brought all of that unprocessed weight into every room we walked into.
          </p>

          <blockquote>
            The emotions a man refuses to face do not disappear. They transfer. To his wife, his children, his colleagues, his friends. The pain goes somewhere. It always goes somewhere.
          </blockquote>

          <p>
            I have seen this pattern repeat so many times now it almost looks inevitable. The man who never learned to grieve carries that grief into his marriage. The boy who was told to toughen up grows into the father who cannot say "I love you" to his own son without it feeling like something foreign in his mouth. The teenager who had no safe space to ask his questions becomes the adult who pretends he has no questions.
          </p>
          <p>
            It does not have to go this way.
          </p>
          <p>
            When we sit with boys in our mentorship sessions, one of the things we are deliberately creating is a space where they can say what they actually feel without it being used against them. That sounds simple. But for many of these boys, it is something they have never experienced. Their homes are loud but not honest. Their schools are structured but not safe. The streets have rules, but none of them allow for vulnerability.
          </p>
          <p>
            We try to give them language. Because one of the cruelest things we do to boys is give them big emotions and no words for them. A boy who cannot name what he is feeling will express it with his hands. With his silence. With his withdrawal. With his rage. But give a boy the words — teach him the difference between disappointment and despair, between frustration and fury — and you have given him power over his own interior life.
          </p>
          <p>
            Jesus wept. That is the shortest verse in the Bible, and one of the most important for men to sit with. The Son of God stood at a tomb and allowed himself to grieve publicly. He did not explain it away. He did not say "I am fine." He felt what He felt, and He felt it fully.
          </p>
          <p>
            That is not weakness. That is wholeness.
          </p>
          <p>
            We are not trying to raise boys who cry at everything. We are trying to raise boys who know what they feel, why they feel it, and what to do with it — boys who can process their pain before God instead of unleashing it on the people around them.
          </p>
          <p>
            Emotional intelligence is not soft. It is one of the hardest disciplines a man can build. It requires honesty. It requires the courage to look at what is actually happening inside you without flinching. It requires the willingness to be known.
          </p>
          <p>
            But the man who builds it — the man who knows himself deeply enough to manage himself wisely — that man is not fragile. That man is free. And freedom is the only foundation from which a man can truly love the people around him.
          </p>
          <p>
            My father's tears at that funeral did not make him less. Looking back now, they made him more. I just needed someone to tell me that earlier.
          </p>
          <p>
            We are trying to tell the boys now.
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
