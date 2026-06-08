"use client";

import { useState } from "react";
import { X, ArrowRight, BookOpen, Bell } from "lucide-react";

const formedInSilenceExcerpt = (
  <div className="space-y-4 text-lg leading-relaxed opacity-90 font-serif">
    <p className="text-2xl font-serif opacity-60 italic">Some of the most important things that shape us are the things no one sees.</p>
    <p>I lost my father when I was very young, at an age when I didn't understand what his death would mean for the rest of my life. His presence had offered comfort and joy. His absence created an emptiness and a longing that stayed with me, quietly shaping patterns, reactions, and emotions I couldn't trace back to their source for years.</p>
    <p>The realisation that my father's absence had silently formed who I was becoming, was the start of my healing process. And it became the foundation of this book.</p>
    <p>A boy is always being shaped, whether intentionally or not. An intentional father becomes the primary voice in his son's formation. He sows values, identity, and a sense of belonging. But when a father is absent, through death, divorce, emotional withdrawal, migration, or conflict, other influences rush in to fill the void. There is no vacuum on Earth. The problem is that this formation is silent. It doesn't announce itself until it's too late.</p>
    <p>Think of it this way: every house has a design. If the design is not properly followed, the outcome will differ and sometimes cost far more to fix. When fathers are distant, boys absorb whatever is closest to them, often from unfathered men who are themselves poor role models. Social media fills the remaining gaps, offering twisted identities in exchange for validation. The boy is simply seeking connection, significance, and belonging. If he doesn't find it from his father, he will find it elsewhere.</p>
    <p>This boy grows into a man without knowing what his environment planted in him. His reactions, fears, and patterns in relationships, business, and leadership, even though they feel natural, were seeds sown while he slept.</p>
    <p>But here is the part that is often missed: fatherlessness is not always an empty chair at dinner. In Nigeria, where I was raised, over 70% of children grow up with both parents physically present. Yet many of these boys are still deprived of their father's love. A man can sleep under the same roof, provide financially, and discipline his children, yet never once ask his son how he is feeling. That is the invisible fatherlessness this book addresses.</p>
    <p>The men these boys become are men I have lived among and worked with. I have observed the same patterns repeating: approval addiction, people-pleasing, and a relentless pursuit of money, power, or fame that provides temporary relief before the depression returns. They recognise a problem within their soul, but since they cannot name it, they seek new distractions.</p>
    <p><strong>Formed in Silence</strong> is written for these men. It aims to help you see the silent things that formed you, understand how they continue to influence how you think, love, and lead, and show you how to navigate them and seek healing. Because weeds can be uprooted and good seeds planted in their place.</p>
    <p>A healed man can offer what was missing to him and leave a good inheritance for the next generation.</p>
    <p className="text-xl font-serif italic opacity-70">The next generation should inherit something better than you did.</p>
  </div>
);

const boyAndAddictionsExcerpt = (
  <div className="space-y-4 text-lg leading-relaxed opacity-90 font-serif">
    <p className="text-2xl font-serif opacity-60 italic">Every addiction has a first moment. A spark no one sees.</p>
    <p>A boy walks home from one of the best schools in southeastern Nigeria. Thirty minutes under the hot sun, every day. His life is built on discipline, education, and pride. But one sunny afternoon, he comes home to find something he wasn't looking for.</p>
    <p>There was electricity that day, a rare occurence in those days. A CD was lying in the living room. Curiosity did the rest. In the minutes that followed, something shifted inside that boy. Something he couldn't name, undo, or talk about.</p>
    <p>That boy was me.</p>
    <p>What started as an accidental encounter with a pornographic disc became a quiet, consuming obsession. I began timing my life around it, calculating when my brothers would be away, living a double life that drained me in ways I didn't yet understand. When the source was taken from me, the hunger didn't stop. It evolved. My eyes began searching for what my mind craved, and the world seemed to show me exactly where to find it.</p>
    <p>Over time, the addiction spilled beyond pornography. There was smoking. There was alcohol. Each vice opened the door to the next, and none of them announced themselves. They crept in quietly, disguised as curiosity, boredom, or just something to do when no one was watching.</p>
    <p>Since those years, I have spoken with countless boys and men who share the same story. The details change, sometimes it starts with a friend's phone, a social media link, or a dare behind the school building, but the pattern is always the same. A first contact. A secret. A cycle that feels impossible to break.</p>
    <p><strong>The Boy and Addictions</strong> is not a lecture or a sermon. It is one boy talking honestly to another about the things we were too ashamed to say out loud. This book walks through the full journey: how addiction begins, how it rewires what you see and desire, how it spills into other areas of your life, and most importantly, how you can break free and stay free.</p>
    <p>If you are a boy carrying a secret that you've never told anyone, this book is for you. If you are a parent, mentor, or pastor wondering why the boys around you are struggling in silence, this book will open your eyes.</p>
    <p className="text-xl font-serif italic opacity-70">Because the things that trap us in the dark can only be defeated when we drag them into the light.</p>
  </div>
);

type ModalState = 'none' | 'excerpt-silence' | 'excerpt-addictions' | 'notify-silence' | 'notify-addictions';

export default function BooksSection() {
  const [modalState, setModalState] = useState<ModalState>('none');

  const closeModal = () => setModalState('none');

  return (
    <section id="books" className="border-t border-black/10 dark:border-white/10 py-24" style={{ background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Books</h2>
          <p className="text-lg opacity-70 max-w-2xl">
            Showcasing books currently being written and future published works.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Book 1 */}
          <div className="border p-8 md:p-12 relative overflow-hidden group" style={{ borderColor: "var(--peach)" }}>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <BookOpen size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <img 
                  src="/formed-in-silence-cover.png" 
                  alt="Formed in Silence book cover" 
                  className="w-48 md:w-56 rounded shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-6 bg-black/10 dark:bg-white/10">
                Work In Progress
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-4 group-hover:text-[#c4572a] transition-colors">Formed in Silence</h3>
              <p className="opacity-75 leading-relaxed mb-8 h-20">
                How invisible patterns rooted in fatherhood, absence, and unspoken wounds silently shape boys into the men they become.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setModalState('excerpt-silence')}
                  className="px-6 py-3 text-xs tracking-[0.2em] uppercase border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Read Excerpt
                </button>
                <button 
                  onClick={() => setModalState('notify-silence')}
                  className="px-6 py-3 text-xs tracking-[0.2em] uppercase text-white hover:bg-black/80 transition-colors" style={{ background: "var(--rust)" }}
                >
                  Notify Me When Released
                </button>
              </div>
            </div>
          </div>

          {/* Book 2 */}
          <div className="border p-8 md:p-12 relative overflow-hidden group" style={{ borderColor: "var(--peach)" }}>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <BookOpen size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-8">
                <img 
                  src="/boy-and-addictions-cover.png" 
                  alt="The Boy and Addictions book cover" 
                  className="w-48 md:w-56 rounded shadow-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-6 bg-black/10 dark:bg-white/10">
                Upcoming
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-4 group-hover:text-[#c4572a] transition-colors">The Boy and Addictions</h3>
              <p className="opacity-75 leading-relaxed mb-8 h-20">
                An honest conversation about the silent struggles boys carry: pornography, substances, and the cycle of addiction and the path to freedom.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setModalState('excerpt-addictions')}
                  className="px-6 py-3 text-xs tracking-[0.2em] uppercase border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Read Excerpt
                </button>
                <button 
                  onClick={() => setModalState('notify-addictions')}
                  className="px-6 py-3 text-xs tracking-[0.2em] uppercase text-white hover:bg-black/80 transition-colors" style={{ background: "var(--rust)" }}
                >
                  Notify Me When Released
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals Overlay */}
      {modalState !== 'none' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-sm flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200" style={{ background: "var(--card)", color: "var(--ink)" }}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10 shrink-0">
              <h3 className="font-serif text-2xl">
                {modalState === 'excerpt-silence' && "Excerpt: The Silent Things That Shape Us"}
                {modalState === 'notify-silence' && "Formed in Silence — Pre-release"}
                {modalState === 'excerpt-addictions' && "The Boy and Addictions"}
                {modalState === 'notify-addictions' && "The Boy and Addictions — Pre-release"}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto">
              
              {/* Formed in Silence Excerpt */}
              {modalState === 'excerpt-silence' && (
                <div className="prose max-w-none">
                  {formedInSilenceExcerpt}
                </div>
              )}

              {/* Formed in Silence Notify */}
              {modalState === 'notify-silence' && (
                <div className="max-w-md mx-auto text-center py-8">
                  <Bell className="mx-auto mb-6 opacity-50" size={48} />
                  <p className="text-lg mb-8 leading-relaxed opacity-80">
                    Join the waitlist to be the first to know when <strong>Formed in Silence</strong> is published. I'll send updates directly to your inbox.
                  </p>
                  
                  {/* Buttondown Form */}
                  <form action="https://buttondown.email/api/emails/embed-subscribe/arc_austin" method="POST" target="_blank" className="flex flex-col gap-4 text-left">
                    <input type="hidden" name="metadata__waitlist" value="Formed in Silence" />
                    <input type="hidden" name="tag" value="waitlist-formed-in-silence" />
                    <div>
                      <label htmlFor="bd-email-silence" className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2 block opacity-70">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        id="bd-email-silence"
                        required 
                        placeholder="your@email.com"
                        className="w-full px-5 py-4 border border-black/20 dark:border-white/20 bg-transparent outline-none focus:border-[#c4572a] transition-colors"
                      />
                    </div>
                    <button type="submit" className="w-full py-4 mt-2 text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-black/90 transition-colors" style={{ background: "var(--rust)" }}>
                      Join Waitlist
                    </button>
                  </form>
                  <p className="mt-4 text-[10px] tracking-widest uppercase opacity-40">No spam. Just updates on the book.</p>
                </div>
              )}

              {/* The Boy and Addictions — About the Book */}
              {modalState === 'excerpt-addictions' && (
                <div className="prose max-w-none">
                  {boyAndAddictionsExcerpt}
                </div>
              )}

              {/* Addictions Notify */}
              {modalState === 'notify-addictions' && (
                <div className="max-w-md mx-auto text-center py-8">
                  <Bell className="mx-auto mb-6 opacity-50" size={48} />
                  <p className="text-lg mb-8 leading-relaxed opacity-80">
                    Join the waitlist to be notified when <strong>The Boy and Addictions</strong> is ready.
                  </p>
                  
                  {/* Buttondown Form */}
                  <form action="https://buttondown.email/api/emails/embed-subscribe/arc_austin" method="POST" target="_blank" className="flex flex-col gap-4 text-left">
                    <input type="hidden" name="metadata__waitlist" value="The Boy and Addictions" />
                    <input type="hidden" name="tag" value="waitlist-boy-and-addictions" />
                    <div>
                      <label htmlFor="bd-email-addictions" className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2 block opacity-70">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        id="bd-email-addictions"
                        required 
                        placeholder="your@email.com"
                        className="w-full px-5 py-4 border border-black/20 dark:border-white/20 bg-transparent outline-none focus:border-[#c4572a] transition-colors"
                      />
                    </div>
                    <button type="submit" className="w-full py-4 mt-2 text-xs tracking-[0.2em] uppercase text-white font-bold hover:bg-black/90 transition-colors" style={{ background: "var(--rust)" }}>
                      Join Waitlist
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
