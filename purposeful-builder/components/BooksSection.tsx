"use client";

import { useState } from "react";
import { X, ArrowRight, BookOpen, Bell } from "lucide-react";

const formedInSilenceExcerpt = (
  <div className="space-y-4 text-lg leading-relaxed opacity-90 font-serif">
    <p>Some of the most important things that shape us are the things no one sees.</p>
    <p>I lost my father when I was very young, at an age when I didn't understand what the impact of his death would mean for the rest of my life. The loss brought confusion and pain that lingered quietly. I had a beautiful relationship with him while he lived, and the moments we shared are still vivid. They are the reason why I sought and was able to cultivate close relationships with male authorities in my life. Even though his life was short-lived, he sowed a seed that needed the right environment to flourish.</p>
    <p>His presence offered comfort and joy, but his absence created emptiness and longing that stayed with me.</p>
    <p>There were patterns, reactions, emotions and behaviours I had growing up that I couldn't trace back to their source until I began studying the impact of fatherhood on boys. Realising these were linked to my father's absence was emotionally intense and sometimes overwhelming. That study was the start of my healing process.</p>
    <p>My discovery centres on how invisible patterns shape boys, especially through fatherhood.</p>
    <p>A boy is always shaped, intentionally or not. An intentional father becomes the primary voice in his formation. He sows values, identity, and a sense of belonging in the boy. In the absence of this, whether through his death, divorce, emotional withdrawal, migration or conflict-related issues, other influences fill the void. There is no vacuum on Earth. The problem with this formation is that it's silent and doesn't announce itself until it's too late.</p>
    <p>From an architectural point of view, every house has a design. If the design is not properly followed and executed, the outcome will differ and sometimes cost more to fix. When fathers are distant, boys absorb whatever is close to them, often unintentionally. Often, these influences come from unfathered men who are poor role models.</p>
    <p>Beyond immediate influences is social media, which makes it easy for boys to pick up twisted identities for validation. These sources also contribute to their formation. That’s why many of them are at the risk of early exposure to sexually related contents, substances, or relationships he's emotionally equipped to handle. This is because the boy is seeking connection, significance, and a sense of belonging. If a boy is not properly loved by his father, he will find it elsewhere.</p>
    <p>This boy becomes a man without knowing what his environment has planted in him. His reactions, fears, and patterns in life, relationships, business, and leadership management, even though they feel natural, were seeds planted while he slept.</p>
    <p>I was raised in Nigeria, so my experiences are deeply rooted here, but I’ve observed this pattern to be common across Africa and even in the USA. The USA has more documented study on both the physical and emotional absence of fathers. But despite the difference in demographics, the effect is still the same, and Nigeria has not done enough study to describe and address the effects. In Nigeria, the conversation about fatherlessness is more about physical absence than about emotional absence. A significant number of boys grew up where both parents are physically present. So contextually, over 70% of children can’t be fatherless. Regardless, many of these boys grow up deprived of their father's love, meaning a man can be physically present yet emotionally disconnected.</p>
    <p>Obvious fatherlessness is the empty chair at dinner, missing out on games, PTA meetings, church gatherings, etc., which is often compensated for by the mother. The type that's not easily seen is the one where the father sleeps under the roof, provides financially, protects and disciplines the children, but he's never emotionally connected to them. He has never asked his son how he's feeling. He believes the above-mentioned duties are enough to shape his son.</p>
    <p>Most of the time, these emotionally starved boys can't even grieve the absence of their fathers because they are constantly reminded by their mothers that they are lucky to have a father, citing homes where fathers are absent. It becomes a case of half a loaf being better than none. The boy feels pressured to suppress his pain, so he buries his emotional wounds with gratitude, which leaves them unresolved.</p>
    <p>A boy needs more than physical provision. He needs a spiritual and emotional connection with his father.</p>
    <p>The men these boys become are men I have lived among and worked with. I have observed similar patterns among them, such as approval addiction, people-pleasing, and relentless pursuit of money, power, or fame, which provide temporary relief until they fall back into depression. They recognise a problem within their soul, but since they cannot name it, they seek new distractions.</p>
    <p>This is not to say that men who grew up with present and involved fathers don't have this struggle, but it's more concentrated and visible among the unfathered sons.</p>
    <p>Exploring the parable of the sower narrated by Jesus, you'd notice that boys are fertile grounds and will mostly grow into the seeds sown into them. So while intentional fathers sowed the right seeds, the unintentional ones, while they slept, left the enemy to sow weeds into their children. At the end of the day, the outcomes become different.</p>
    <p>But this is not the end because weeds can be uprooted and good seeds planted.</p>
    <p>Once you've discovered that something was missing in your upbringing, and you realise how deeply it shaped you, that's where healing starts. Naming a wound is not the same as healing, but admitting it lets you confront pain and confusion you've carried. This will be hard for some people because opening a wound can be uncomfortable and demands vulnerability. Sometimes you might have to sit with emotions you've been avoiding for years, travel back to see the boy who was deprived of love, not to live in the past but to acknowledge and empathise with him. Then, you can begin to build yourself into the man you want.</p>
    <p>This does not mean the past will disappear; it means you are choosing to embrace and build a wholesome future. I have seen unfathered men become better fathers. I have witnessed men who were hurt embrace healing and choose kindness rather than continue the cycle of hurting others. A healed man can offer what was missing to him and leave a good inheritance for the next generation.</p>
    <p>This book aims to help men see the silent things that formed them, how they keep influencing how we think, love, and lead our lives, and how to navigate them and seek healing.</p>
    <p>My hope is that men who are reading this, whether you are recognising yourself in these pages or striving to become better than the patterns you've inherited, will recognise the silent formation and seek healing. This is because your healing is important in shaping the next generation after you. The next generation should inherit something better than you did.</p>
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
              <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-6 bg-black/10 dark:bg-white/10">
                Work In Progress
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-4 group-hover:text-[#c4572a] transition-colors">Formed in Silence</h3>
              <p className="opacity-75 leading-relaxed mb-8 h-20">
                A reflection on the unseen seasons that shape a man long before the world sees him.
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
              <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-6 bg-black/10 dark:bg-white/10">
                Upcoming
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-4 group-hover:text-[#c4572a] transition-colors">The Boy and Addictions</h3>
              <p className="opacity-75 leading-relaxed mb-8 h-20">
                Exploring the wounds, habits, and hidden battles that shape boys before they become men.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setModalState('excerpt-addictions')}
                  className="px-6 py-3 text-xs tracking-[0.2em] uppercase border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Learn More
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
                {modalState === 'excerpt-silence' && "Introduction: Formed in Silence"}
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

              {/* Addictions Excerpt Placeholder */}
              {modalState === 'excerpt-addictions' && (
                <div className="text-center py-16">
                  <h4 className="font-serif text-3xl mb-4 text-[#c4572a]">Still being written</h4>
                  <p className="text-lg opacity-70 max-w-md mx-auto leading-relaxed">
                    I am currently forming the thoughts and structuring the chapters for this book. Excerpts will be shared here soon.
                  </p>
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
