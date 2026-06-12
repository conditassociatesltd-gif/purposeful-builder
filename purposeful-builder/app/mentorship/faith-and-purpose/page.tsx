import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FaithAndPurposePage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-5" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/mentorship" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-16">
          <ArrowLeft size={16} /> Back to Mentorship
        </Link>

        <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] tracking-widest uppercase font-bold mb-6">
          Faith & Purpose
        </div>

        <h1 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
          Whose Are You?
        </h1>

        <article className="essay-content prose">
          <p>
            The question that changed everything for me was not "Who are you?"
          </p>
          <p>
            It was "Whose are you?"
          </p>
          <p>
            I spent years trying to answer the first question. I tried on different identities the way you try on clothes in a market — holding each one up, looking at it, putting it back when it didn't quite fit. The identity of the achiever. The identity of the one who had made it out. The identity of the person who had answers. None of them held. There is a particular kind of exhaustion that comes from building your self on things that cannot bear the weight.
          </p>
          <p>
            What steadied me was not finding a better identity. It was realising that my identity had already been settled by Someone else — and that all my searching was just me running from the answer that was already there.
          </p>
          <p>
            You are not your performance. You are not your background. You are not your failures, your father's opinion of you, your neighbourhood, your tribe, or your bank account. You are a person made on purpose by a God who does not make things without intention. That is not a greeting card truth. That is the most load-bearing fact a man can build his life on.
          </p>

          <blockquote>
            When a boy knows whose he is, he knows who he is. And when a man knows who he is, he stops looking for his identity in places that cannot give it to him.
          </blockquote>

          <p>
            I think about the boys I have sat with who carry a kind of restlessness they cannot explain. They are not bad boys. They are searching boys. Looking for something solid to stand on in a world that keeps shifting. And so they look for it in belonging — in gangs, in peer groups, in performances of toughness that protect the softness underneath. They look for it in dominance, in aggression, in the false certainty that if you control enough people you will eventually feel secure.
          </p>
          <p>
            None of it works. Because the thing they are actually searching for is not the thing they are reaching for.
          </p>
          <p>
            They are searching for significance. And significance is not earned — it is received. It was placed in you the moment God decided to create you.
          </p>
          <p>
            Jeremiah 1:5 is one of the verses I return to often: <em>"Before I formed you in the womb I knew you, before you were born I set you apart."</em> God is speaking to a young man who felt too young, too small, too unqualified to be called. And God's response is not an argument. It is a declaration. <em>I knew you before you knew yourself.</em> You were not a surprise. You were a plan.
          </p>
          <p>
            When we teach this to boys, we are not just giving them a theological framework. We are giving them a foundation. A boy who knows he was made on purpose will not throw his life away carelessly. A boy who understands that he was known before he was formed will not spend his adulthood trying to prove that he deserves to exist.
          </p>
          <p>
            Purpose is connected to this deeply. Not purpose in the motivational sense — the "follow your passion" kind that tends to collapse the moment passion runs dry. Purpose in the biblical sense: the specific, irreplaceable assignment that God has placed on your life, that only you can fulfil, in your generation, with your particular gifts and experiences.
          </p>
          <p>
            Dr. Myles Munroe said it this way: <em>"The greatest tragedy in life is not death, but a life without purpose."</em> I have seen that tragedy play out in men who are still breathing. Men who are technically alive but are not actually building anything. Not because they lack ability. Because they never understood what they were made for.
          </p>
          <p>
            What we are doing in our mentorship work is trying to interrupt that trajectory early. Before the pattern sets. Before the identity gets built on sand. We are sitting with boys and pointing them toward the God who made them, because that is the only place where the question "Who am I?" gets a true answer.
          </p>
          <p>
            It is the answer I needed someone to give me at fourteen.
          </p>
          <p>
            It is the answer I am still anchoring my own life to now.
          </p>
          <p>
            Whose are you? Settle that, and so much else becomes clearer.
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
