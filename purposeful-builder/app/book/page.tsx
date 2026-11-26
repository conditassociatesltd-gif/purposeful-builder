import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Bell } from "lucide-react";

export default function BookPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-black/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-10 h-10 border-2 border-[#c4572a] flex items-center justify-center overflow-hidden bg-white">
              <Image
                src="/logo.png"
                alt="Austin Okechukwu logo"
                width={36}
                height={36}
                className="object-contain scale-110"
              />
            </div>
            <span className="font-black tracking-tight uppercase text-black hidden sm:inline">Austin Okechukwu</span>
          </Link>

          <Link href="/" className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-black/60 hover:text-black transition-colors">
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-5 border-b border-black/10">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] tracking-widest uppercase font-bold mb-6">
            Writing & Publishing
          </div>
          <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight max-w-4xl">
            Books that shape <span className="text-[#cba37c]">minds</span>, build <span className="text-[#cba37c]">character</span>, inspire <span className="text-[#cba37c]">purpose</span> and transform generations.
          </h1>
          <p className="text-xl opacity-80 leading-relaxed max-w-2xl border-l-2 border-[#c4572a] pl-6">
            Showcasing current manuscripts and future published works. Join the waitlist for updates on releases.
          </p>
        </div>
      </section>

      {/* The Boy and Addictions Section (First Book) */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 border-b border-black/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:order-last">
            <div className="relative group">
              <div className="absolute top-0 left-0 p-8 opacity-5">
                <BookOpen size={120} />
              </div>
              <div className="flex justify-center mb-6 sm:mb-10">
                <img
                  src="/boy-and-addictions-cover.png"
                  alt="The Boy and Addictions book cover"
                  className="w-48 sm:w-64 md:w-full max-w-md rounded-md shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 border border-black/10"
                />
              </div>

              <div className="bg-white p-6 sm:p-8 border border-black/10 rounded shadow-sm text-center">
                <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-4 rounded-sm text-white" style={{ background: "var(--rust)" }}>
                  Prelaunch Active
                </div>
                <h4 className="font-serif text-2xl mb-1">Order Your Copy</h4>
                <p className="text-xs mb-4 opacity-75">Official Launch: 29 November 2026</p>
                <div className="mb-6 py-2 border-y border-black/10">
                  <span className="font-serif text-3xl font-bold text-[#c4572a]">₦3,500</span>
                  <span className="text-[11px] uppercase tracking-wider block opacity-60 mt-1">Prelaunch price (increases to ₦4,500)</span>
                </div>
                <Link
                  href="/book/order"
                  className="block w-full py-4 text-xs tracking-[0.2em] uppercase text-white font-bold hover:opacity-90 transition-opacity rounded-sm shadow-md"
                  style={{ background: "var(--rust)" }}
                >
                  Order the Book
                </Link>
                <p className="text-[11px] opacity-60 mt-3">Personal copies & School Outreach Program</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-6 text-white" style={{ background: "var(--rust)" }}>
              Launch: 29 November 2026
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6">The Boy and Addictions</h2>
            <div className="prose max-w-none space-y-6 text-base sm:text-lg leading-relaxed opacity-90 font-serif">
              <p>I attended one of the best secondary schools in southeastern Nigeria — Dennis Memorial Grammar School, Onitsha. We used to brag about it, we still do and we had reason to. The school has a reputation for excellence. It has produced brilliant thinkers, successful businessmen, respected professionals, and influential politicians.</p>
              <p>We wore our white uniforms with pride, but the badge made it even more special. There was a certain pride that came with wearing it, knowing how difficult it is to earn a place in DMGS. To us, it was not just a school; it was proof that we were headed to a glorious future.</p>
              <p>Every school day, I trekked thirty minutes to get there and another thirty minutes back home. Under the sun and in the rain, with dedication and pride, that was the routine — an hour of walking every day.</p>
              <p>Back then, I thought the things that would shape my life would happen in the classroom. I thought my future would be decided only by the lessons I learned, the books I read, and the exams I passed.</p>
              <p className="font-bold text-xl">I was wrong.</p>
              <p>One sunny afternoon, I got back from school and saw something I was never meant to see. When no one else was looking, something in my own living room that had nothing to do with textbooks, teachers, or the bright future everyone around me expected me to have entered my life.</p>
              <p>That single encounter pulled me into years of struggle with addiction before I even knew what addiction meant.</p>
              <p>I wrote this book because I have never forgotten what it felt like to be that boy. Years later, I have spoken with young men, married men, pastors, professionals, business owners, and students enough to know my story is not unique.</p>
              <p>The details change: the generation, the device, the substance. Nevertheless, the pattern is the same — one moment of exposure that grows into a life of secrecy.</p>
              <p>What surprised me was not how many people struggled but how many struggled alone. Most addictions thrive in secrecy, and I have come to realize that struggling alone fundamentally prolonged my struggle and theirs.</p>

              <div className="pt-6">
                <Link
                  href="/book/order"
                  className="inline-flex items-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase text-white font-bold hover:opacity-90 transition-opacity rounded-sm shadow-md"
                  style={{ background: "var(--rust)" }}
                >
                  Continue Reading — Order the Book →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formed in Silence Section (Second Book) */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-white/30">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BookOpen size={120} />
              </div>
              <div className="flex justify-center mb-6 sm:mb-10">
                <img
                  src="/formed-in-silence-cover.png"
                  alt="Formed in Silence book cover"
                  className="w-48 sm:w-64 md:w-full max-w-md rounded-md shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 border border-black/10"
                />
              </div>

              <div className="bg-white p-6 sm:p-8 border border-black/10 rounded shadow-sm text-center">
                <Bell className="mx-auto mb-3 sm:mb-4 opacity-50 text-[#c4572a]" size={28} />
                <h4 className="font-serif text-xl sm:text-2xl mb-2">Join the Waitlist</h4>
                <p className="text-xs sm:text-sm mb-5 sm:mb-6 opacity-80">Be the first to know when Formed in Silence is published.</p>
                <form action="https://buttondown.email/api/emails/embed-subscribe/arc_austin" method="POST" target="_blank" className="flex flex-col gap-3">
                  <input type="hidden" name="metadata__waitlist" value="Formed in Silence" />
                  <input type="hidden" name="tag" value="waitlist-formed-in-silence" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your email address"
                    className="w-full px-4 py-3 border border-black/20 text-sm outline-none focus:border-[#c4572a] transition-colors"
                  />
                  <button type="submit" className="w-full py-3.5 text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-black/90 transition-colors" style={{ background: "var(--rust)" }}>
                    Notify Me
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-4 sm:mb-6 bg-black/5">
              Work In Progress
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">Formed in Silence</h2>
            <div className="prose max-w-none space-y-5 sm:space-y-6 text-base sm:text-lg leading-relaxed opacity-90 font-serif">
              <p className="text-2xl sm:text-3xl font-serif opacity-60 italic mb-6 sm:mb-8">"Some of the most important things that shape us are the things no one sees."</p>
              <p>I lost my father when I was very young, at an age when I didn't understand what his death would mean for the rest of my life. His presence had offered comfort and joy. His absence created an emptiness and a longing that stayed with me, quietly shaping patterns, reactions, and emotions I couldn't trace back to their source for years.</p>
              <p>The realisation that my father's absence had silently formed who I was becoming, was the start of my healing process. And it became the foundation of this book.</p>
              <p>A boy is always being shaped, whether intentionally or not. An intentional father becomes the primary voice in his son's formation. He sows values, identity, and a sense of belonging. But when a father is absent, through death, divorce, emotional withdrawal, migration, or conflict, other influences rush in to fill the void. There is no vacuum on Earth. The problem is that this formation is silent. It doesn't announce itself until it's too late.</p>
              <p>Think of it this way: every house has a design. If the design is not properly followed, the outcome will differ and sometimes cost far more to fix. When fathers are distant, boys absorb whatever is closest to them, often from unfathered men who are themselves poor role models. Social media fills the remaining gaps, offering twisted identities in exchange for validation. The boy is simply seeking connection, significance, and belonging. If he doesn't find it from his father, he will find it elsewhere.</p>
              <p>This boy grows into a man without knowing what his environment planted in him. His reactions, fears, and patterns in relationships, business, and leadership, even though they feel natural, were seeds sown while he slept.</p>
              <p>But here is the part that is often missed: fatherlessness is not always an empty chair at dinner. In Nigeria, where I was raised, over 70% of children grow up with both parents physically present. Yet many of these boys are still deprived of their father's love. A man can sleep under the same roof, provide financially, and discipline his children, yet never once ask his son how he is feeling. That is the invisible fatherlessness this book addresses.</p>
              <p>The men these boys become are men I have lived among and worked with. I have observed the same patterns repeating: approval addiction, people-pleasing, and a relentless pursuit of money, power, or fame that provides temporary relief before the depression returns. They recognise a problem within their soul, but since they cannot name it, they seek new distractions.</p>
              <p><strong>Formed in Silence</strong> is written for these men. It aims to help you see the silent things that formed you, understand how they continue to influence how you think, love, and lead, and show you how to navigate them and seek healing. Because weeds can be uprooted and good seeds planted in their place.</p>
              <p>A healed man can offer what was missing to him and leave a good inheritance for the next generation.</p>
              <p className="text-2xl font-serif italic opacity-70 mt-8 text-[#c4572a]">The next generation should inherit something better than you did.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
