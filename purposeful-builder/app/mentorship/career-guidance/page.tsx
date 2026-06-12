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
            I used to think work was something you endured.
          </p>
          <p>
            Growing up, the adults around me talked about jobs the way they talked about rainy seasons — something you prepared for, survived, and waited to get through. The dream was to work hard enough that eventually you wouldn't have to. The goal of labour was the absence of labour. Rest was the reward. Work was the sentence.
          </p>
          <p>
            Nobody told me that work was given to man before the fall. Before sin, before the curse, before any of the groaning that fills the world now — God placed Adam in a garden and gave him something to tend. <em>Work was the first human assignment.</em> Not a punishment. A participation. God was building, and He invited man into the building.
          </p>
          <p>
            That changed something in me when I finally understood it.
          </p>
          <p>
            It changed how I looked at my own gifts. I had always been someone who built things — not with his hands at first, but with ideas. With words. With structure. I could look at something broken or absent and see what it could become. For a long time, I treated that like a hobby. Something I did on the side. A nice thing about me that didn't really count.
          </p>
          <p>
            Nobody had told me that gifts are not decorative. They are directional. The thing you do naturally that produces fruit when you apply it — that is not an accident. That is a clue. God does not waste material.
          </p>

          <blockquote>
            Every young man carries gifts he has not yet learned to name. Part of mentorship is helping him see what is already there.
          </blockquote>

          <p>
            When we sit with boys and talk about careers, we try not to do what most career counselling does — which is look at the economy and work backwards. "Here are the growing industries. Here are the safe paths. Here is the checklist." That is not useless. But it is incomplete. Because a boy who builds a career on economic trends without knowing his own design will one day be successful at something that slowly empties him.
          </p>
          <p>
            We start from the inside. What do you love to do so much that you lose track of time doing it? What problem in the world makes you angry? What do people keep coming to you for, even when you haven't offered? Those questions are not soft questions. They are some of the most practically useful questions a young man can sit with.
          </p>
          <p>
            Then we talk about the marketplace — not as a threat, but as a field. You have something to offer. The world has needs. Your career is the point where those two things meet. But you have to know what you are carrying before you can figure out where to carry it.
          </p>
          <p>
            I think about the boys we have sat with who have been told, explicitly or implicitly, that their options are limited. That success looks like one thing and that thing is probably not available to someone like them. That their background determines their ceiling. Those messages do not arrive as speeches. They arrive quietly — in the schools that don't invest in them, in the adults who don't ask them about their dreams, in the environments that have given up on the future even while the future is still sitting in the room.
          </p>
          <p>
            One of the things mentorship does — real mentorship — is interrupt that story. It says: your beginning is not your boundary. It says: the gifts inside you are not cancelled by the difficulty around you. It says: work is not a punishment, and building is not arrogance — it is obedience.
          </p>
          <p>
            Proverbs 22:29 asks a question that has stayed with me: <em>"Do you see a man skilled in his work? He will serve before kings; he will not serve before officials of low rank."</em> That is not elitism. That is an invitation. The man who develops what God placed in him will not be invisible. Excellence, built on divine calling, creates its own room.
          </p>
          <p>
            We are trying to help boys find their calling before the world convinces them they don't have one.
          </p>
          <p>
            Because they all do. Every single one of them.
          </p>
          <p>
            The boy who can barely sit still in class but assembles things with his hands in a way that makes adults stop and watch. The quiet boy who writes better than he speaks and doesn't know yet that writing is one of the most powerful tools on the planet. The boy who leads his peers without trying, who other boys look to when they don't know what to do next.
          </p>
          <p>
            They are carrying something. We are just trying to help them see it.
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
