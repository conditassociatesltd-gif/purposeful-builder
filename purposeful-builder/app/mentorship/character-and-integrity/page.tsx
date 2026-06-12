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
            There was a day I did something wrong and nobody saw it.
          </p>
          <p>
            I was maybe fourteen. I broke something in the house — I don't even remember what it was now — but I remember what happened next. I quietly put it back where it was. Arranged it to look normal. Walked away and said nothing.
          </p>
          <p>
            Nobody ever found out. But I knew. And for weeks, every time I passed that spot, something in me felt off. Not the guilt of being caught. Worse than that — the quiet awareness that I had chosen the easier thing, and it had cost me something I couldn't name yet.
          </p>
          <p>
            That is what nobody tells boys about integrity. They make it sound like a rule. Like something you do because someone is watching. But integrity is not about the watcher. It is about who you are becoming in the moments when no one is looking.
          </p>
          <p>
            I grew up hearing a lot of talk about character. Church taught it. School preached it. But what I rarely saw was adults living it in the small, unglamorous spaces. The adult who cheated his customers but showed up to Sunday service. The uncle who spoke loudly about hard work but cut every corner he could find. The teacher who demanded honesty from students but marked attendance for colleagues who were absent.
          </p>
          <p>
            Boys notice everything. They just don't always say what they see.
          </p>
          <p>
            What we were watching, without even knowing we were watching, was a definition of manhood being written in front of us every day. And many of us absorbed the wrong definition — that character is what you perform for the crowd, and the private self is negotiable.
          </p>

          <blockquote>
            A man who leads with a double life will eventually be undone by it. The cracks always show.
          </blockquote>

          <p>
            I have seen it enough times now to believe it completely. A man who is generous in public and cruel in private. A man who preaches discipline but is secretly addicted to his own comfort. A man who teaches his sons about God but treats his wife like she is a burden. Those fractures between the public self and the private self — they are not sustainable. They cost you your children's trust. They cost you your own peace. They cost you the very thing you spent your whole life trying to build.
          </p>
          <p>
            When we work with boys, one of the first things we try to establish is this: <em>you are always becoming someone</em>. Every choice you make in private is forming the person you will be in public. The boy who lies in small matters will find it easier to lie in big ones. The boy who takes shortcuts in the small things will carry that habit into the large ones.
          </p>
          <p>
            But the reverse is also true.
          </p>
          <p>
            The boy who tells the truth about the broken thing, even when no one is watching, is building something inside himself that will serve him for the rest of his life. He is practicing what it means to be a man of his word. He is learning that his conscience is not his enemy — it is his compass.
          </p>
          <p>
            Biblical truth is clear about this. Solomon wrote in Proverbs 11:3, <em>"The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity."</em> I love that word — destroyed. Not slowed. Not inconvenienced. Destroyed. The man who builds his life on a foundation of double standards is not building at all. He is just delaying the collapse.
          </p>
          <p>
            What we want for the boys we mentor is simpler than it sounds. We want them to be the same person in every room. Not perfect — we are not chasing perfection. But consistent. Whole. A man whose private self and public self are not at war with each other.
          </p>
          <p>
            That is the kind of man who can lead a family without fear. Who can build a business without shame. Who can face his own reflection at the end of the day and not have to look away.
          </p>
          <p>
            That is the kind of man who can actually be trusted with the things that matter.
          </p>
          <p>
            And it starts — it always starts — with the small moments. The broken thing. The honest word. The choice made when no one is watching.
          </p>
          <p>
            The boy who was watching all those years was me. I was watching to see what kind of man I was supposed to become. I hope we can be better examples for the boys who are watching us now.
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
