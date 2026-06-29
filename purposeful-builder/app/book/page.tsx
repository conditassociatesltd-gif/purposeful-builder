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
            Books to shape <span className="text-[#cba37c]">men</span> and build <span className="text-[#cba37c]">structure</span>.
          </h1>
          <p className="text-xl opacity-80 leading-relaxed max-w-2xl border-l-2 border-[#c4572a] pl-6">
            Showcasing current manuscripts and future published works. Join the waitlist for updates on releases.
          </p>
        </div>
      </section>

      {/* Formed in Silence Section */}
      <section className="py-24 px-5 border-b border-black/10 bg-white/30">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 sticky top-32">
            <div className="relative group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BookOpen size={120} />
              </div>
              <div className="flex justify-center mb-10">
                <img 
                  src="/formed-in-silence-cover.png" 
                  alt="Formed in Silence book cover" 
                  className="w-full max-w-md rounded-md shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 border border-black/10"
                />
              </div>
              
              <div className="bg-white p-8 border border-black/10 rounded shadow-sm text-center">
                <Bell className="mx-auto mb-4 opacity-50 text-[#c4572a]" size={32} />
                <h4 className="font-serif text-2xl mb-2">Join the Waitlist</h4>
                <p className="text-sm mb-6 opacity-80">Be the first to know when Formed in Silence is published.</p>
                <form action="https://buttondown.email/api/emails/embed-subscribe/arc_austin" method="POST" target="_blank" className="flex flex-col gap-3">
                  <input type="hidden" name="metadata__waitlist" value="Formed in Silence" />
                  <input type="hidden" name="tag" value="waitlist-formed-in-silence" />
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="Your email address"
                    className="w-full px-5 py-3 border border-black/20 text-sm outline-none focus:border-[#c4572a] transition-colors"
                  />
                  <button type="submit" className="w-full py-3 text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-black/90 transition-colors" style={{ background: "var(--rust)" }}>
                    Notify Me
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-6 bg-black/5">
              Work In Progress
            </div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Formed in Silence</h2>
            <div className="prose max-w-none space-y-6 text-lg leading-relaxed opacity-90 font-serif">
              <p className="text-3xl font-serif opacity-60 italic mb-8">"Some of the most important things that shape us are the things no one sees."</p>
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

      {/* The Boy and Addictions Section */}
      <section className="py-24 px-5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 sticky top-32 lg:order-last">
            <div className="relative group">
              <div className="absolute top-0 left-0 p-8 opacity-5">
                <BookOpen size={120} />
              </div>
              <div className="flex justify-center mb-10">
                <img 
                  src="/boy-and-addictions-cover.png" 
                  alt="The Boy and Addictions book cover" 
                  className="w-full max-w-md rounded-md shadow-2xl group-hover:scale-[1.02] transition-transform duration-500 border border-black/10"
                />
              </div>
              
              <div className="bg-white p-8 border border-black/10 rounded shadow-sm text-center">
                <Bell className="mx-auto mb-4 opacity-50 text-[#c4572a]" size={32} />
                <h4 className="font-serif text-2xl mb-2">Join the Waitlist</h4>
                <p className="text-sm mb-6 opacity-80">Be notified when The Boy and Addictions is ready.</p>
                <form action="https://buttondown.email/api/emails/embed-subscribe/arc_austin" method="POST" target="_blank" className="flex flex-col gap-3">
                  <input type="hidden" name="metadata__waitlist" value="The Boy and Addictions" />
                  <input type="hidden" name="tag" value="waitlist-boy-and-addictions" />
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="Your email address"
                    className="w-full px-5 py-3 border border-black/20 text-sm outline-none focus:border-[#c4572a] transition-colors"
                  />
                  <button type="submit" className="w-full py-3 text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-black/90 transition-colors" style={{ background: "var(--rust)" }}>
                    Notify Me
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-6 bg-black/5">
              Work In Progress
            </div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">The Boy and Addictions</h2>
            <div className="prose max-w-none space-y-6 text-lg leading-relaxed opacity-90 font-serif">
              <p className="text-3xl font-serif opacity-60 italic mb-8">"Every addiction has a first moment. A spark no one sees."</p>
              <p>A boy walks home from one of the best schools in southeastern Nigeria. Thirty minutes under the hot sun, every day. His life is built on discipline, education, and pride. But one sunny afternoon, he comes home to find something he wasn't looking for.</p>
              <p>There was electricity that day, a rare occurence in those days. A CD was lying in the living room. Curiosity did the rest. In the minutes that followed, something shifted inside that boy. Something he couldn't name, undo, or talk about.</p>
              <p>That boy was me.</p>
              <p>What started as an accidental encounter with a pornographic disc became a quiet, consuming obsession. I began timing my life around it, calculating when my brothers would be away, living a double life that drained me in ways I didn't yet understand. When the source was taken from me, the hunger didn't stop. It evolved. My eyes began searching for what my mind craved, and the world seemed to show me exactly where to find it.</p>
              <p>Over time, the addiction spilled beyond pornography. There was smoking. There was alcohol. Each vice opened the door to the next, and none of them announced themselves. They crept in quietly, disguised as curiosity, boredom, or just something to do when no one was watching.</p>
              <p>Since those years, I have spoken with countless boys and men who share the same story. The details change, sometimes it starts with a friend's phone, a social media link, or a dare behind the school building, but the pattern is always the same. A first contact. A secret. A cycle that feels impossible to break.</p>
              <p><strong>The Boy and Addictions</strong> is not a lecture or a sermon. It is one boy talking honestly to another about the things we were too ashamed to say out loud. This book walks through the full journey: how addiction begins, how it rewires what you see and desire, how it spills into other areas of your life, and most importantly, how you can break free and stay free.</p>
              <p>If you are a boy carrying a secret that you've never told anyone, this book is for you. If you are a parent, mentor, or pastor wondering why the boys around you are struggling in silence, this book will open your eyes.</p>
              <p className="text-2xl font-serif italic opacity-70 mt-8 text-[#c4572a]">Because the things that trap us in the dark can only be defeated when we drag them into the light.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
