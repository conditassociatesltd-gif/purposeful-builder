"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const conferenceImages = Array.from({ length: 11 }, (_, i) => `/images/${i + 1}.jpg`);
const sessionImages = ["session-1.jpg", "session-2.jpg"].map(f => `/images/${f}`);

function Carousel({ images, label }: { images: string[]; label: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));
  const prev = () => setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 group shadow-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${label} - Photo ${currentIndex + 1}`}
            fill
            className="object-cover object-top"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black shadow-md"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black shadow-md"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-[#c4572a] scale-125" : "bg-white/70 hover:bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function MentorshipGallery() {
  return (
    <div className="mb-20 space-y-20">

      {/* ── Event 1: International Day of the Boy Child Conference ── */}
      <div>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center mb-12">
          <Carousel images={conferenceImages} label="International Day of the Boy Child Conference" />

          <div className="font-serif">
            <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-4 bg-[#c4572a]/10 text-[#c4572a] font-sans">
              Recent Event
            </div>
            <h3 className="text-3xl md:text-4xl font-serif mb-2 leading-tight">
              International Day of the Boy Child Conference
            </h3>
            <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-8 font-sans">
              May 16th, 2026 · Dominion City Auditorium, Nyanya
            </p>
            <div className="space-y-4 text-[1.05rem] leading-relaxed opacity-85">
              <p>Boys are not naturally built. They are intentionally formed.</p>
              <p>
                A society that empowers only the girl child while neglecting the boy child is unknowingly
                preparing future problems for itself. The boys we ignore today may become the broken men
                society struggles with tomorrow.
              </p>
              <p>
                Strong families and healthy communities are built when boys are taught identity,
                responsibility, discipline, leadership, compassion, and purpose. A boy who is properly
                guided can become a responsible father, a faithful husband, a wise leader, a builder of
                people, and a protector of communities.
              </p>
              <p>
                This International Day of the Boy Child, we chose to invest in boys because the future
                depends on it. <strong className="text-[#c4572a]">When you invest in a boy, you build generations.</strong>
              </p>
              <p>
                The testimonies are still coming in, and our hope is that every man will commit to
                investing in the boys around him.
              </p>
            </div>
          </div>
        </div>

        {/* Conference Testimonial */}
        <div className="border p-8 md:p-12 relative" style={{ borderColor: "var(--peach)" }}>
          <div className="absolute top-6 left-6 opacity-10 text-[#c4572a]">
            <Quote size={64} />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="font-serif text-xl md:text-2xl leading-relaxed italic opacity-90 mb-6">
              "I am so grateful for the work your team did. My students have been behaving remarkably
              well — there has been a total turnaround, to the point where they now take responsibility
              for their own actions. I truly wish you could host this conference again and I am open to
              partnering with you. Please expand this and invite more schools next time."
            </p>
            <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#c4572a]">
              Director, People's Comprehensive Academy, Mararaba
            </p>
          </div>
        </div>
      </div>

      {/* ── Event 2: Boys Mentorship Session (minimal) ── */}
      <div className="border-t border-black/10 dark:border-white/10 pt-16">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">

          {/* Write-up (minimal, left) */}
          <div>
            <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-4 bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 font-sans">
              May 29, 2026
            </div>
            <h3 className="text-2xl md:text-3xl font-serif mb-6 leading-tight">
              Boys Mentorship Session —{" "}
              <span className="opacity-60">People's Comprehensive Academy, Mararaba</span>
            </h3>
            <div className="space-y-4 text-base leading-relaxed opacity-75 font-serif">
              <p>
                We held a Boys Mentorship Session with the students of People's Comprehensive Academy,
                Mararaba, reinforcing the core lessons shared at the International Day of the Boy Child
                Conference held two weeks earlier.
              </p>
              <p>
                A boy needs to understand his purpose by divine design so that he can make the right
                choices today. Purpose precedes performance. When a boy does not understand why he was
                created, he becomes vulnerable to distractions and counterfeit sources of fulfilment —
                seeking validation from people, pursuing instant gratification, and finding temporary
                escape through destructive habits.
              </p>
              <blockquote className="border-l-2 border-[#c4572a] pl-4 italic text-[#c4572a]/80 my-4">
                "When the purpose of a thing is not known, abuse is inevitable." — Dr. Myles Munroe
              </blockquote>
              <p>
                Our mission is to help boys become rooted in their identity in Christ, fix their eyes on
                their God-given purpose, and navigate the process of becoming the men God has called them
                to be.
              </p>
              <p>
                We remain committed to engaging schools and mentoring boys — because healthy boys become
                healthy men, and healthy men build healthy families, communities, and nations.
              </p>
            </div>
          </div>

          {/* Session Carousel (right) */}
          <Carousel images={sessionImages} label="Boys Mentorship Session" />
        </div>
      </div>

      {/* Other Photos Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="aspect-square bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center"
          >
            <span className="text-[10px] tracking-widest uppercase opacity-40">More Photos Coming Soon</span>
          </div>
        ))}
      </div>

    </div>
  );
}
