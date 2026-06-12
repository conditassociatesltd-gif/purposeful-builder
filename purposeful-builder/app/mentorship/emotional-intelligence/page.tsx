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
            The first time I remember crying voluntarily — without being beaten or disciplined — I was watching a movie.
          </p>
          <p>
            It was a deeply emotional film, and I was sitting in a neighbor's house. As the story unfolded on the screen, I wept. Almost every one of us in that room was crying. It felt natural. Over time, as I grew, I continued to express my emotions freely. If I was excited, I showed it. If I was hurt, I cried. It was simply human.
          </p>
          <p>
            Then, at some point, the messaging began to change. I started hearing the unwritten rule of society: <em>Men don't cry.</em>
          </p>
          <p>
            It was strange to me because crying was something I did naturally, and something I had seen other men do. But when a boy hears that lie repeated enough times, and if he buys into that idea, something dangerous happens. He begins to withhold his emotions. He learns to build a dam.
          </p>
          <p>
            But emotions do not disappear just because you refuse to express them. They just change form.
          </p>
          
          <blockquote>
            If you do not express your emotions safely, you will be forced to express them through unhealthy ways — through anger, sudden outbursts, and sometimes, through violence.
          </blockquote>

          <p>
            This is the root of so much of the pain we see in men today. We took boys who had a natural capacity to feel and taught them to suppress it. We handed them a lid instead of language. A boy who cannot name what he is feeling will express it with his fists. A man who has never been allowed to grieve will convert his unexamined pain into aggression against the people who love him most.
          </p>
          <p>
            But here is the truth: Men cry. Boys cry. 
          </p>
          <p>
            If you look at the ultimate standard of manhood — if you look at the life of Jesus — you see a man who was deeply acquainted with his own emotions. The shortest verse in the Bible is also one of the most profound: <em>Jesus wept.</em> When His friend Lazarus died, the Son of God stood before the tomb and cried publicly. He didn't hide his face. He didn't feign strength. He felt the weight of the moment and He expressed it.
          </p>
          <p>
            Tears are not a bad thing. They are not a sign of weakness. They are proof of wholeness. 
          </p>
          <p>
            When we sit with boys in our mentorship sessions, we are deliberate about breaking the false narrative that boys shouldn't cry. We want to raise boys who know what they feel, why they feel it, and what to do with it. Emotional intelligence is not soft; it requires incredible courage to look at what is actually happening inside you without flinching.
          </p>
          <p>
            A boy who knows how to cry is a boy who will not have to break the world to prove he is strong. He will grow into a man who is free. And a free man is the only kind of man who can truly love.
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
