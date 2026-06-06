"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = Array.from({ length: 2 }, (_, i) => `/images/${i + 1}.jpg`);

export default function MentorshipGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-20">
      {/* Featured Event Section */}
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center mb-16">
        
        {/* Carousel */}
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
                alt={`International Day of the Boy Child Conference - Photo ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black shadow-md"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-black shadow-md"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-[#c4572a] scale-125' : 'bg-white/70 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>

        {/* Write-up */}
        <div className="prose max-w-none prose-p:text-[1.1rem] prose-p:opacity-85 font-serif prose-strong:text-[#c4572a]">
          <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-4 bg-[#c4572a]/10 text-[#c4572a]">
            Recent Event
          </div>
          <h3 className="text-3xl md:text-4xl font-serif text-black dark:text-white mb-2 leading-tight">
            International Day of the Boy Child Conference
          </h3>
          <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-8 font-sans">
            May 16th, 2026 · Dominion City Auditorium, Nyanya
          </p>

          <p>
            Boys are not naturally built. They are intentionally formed.
          </p>
          <p>
            A society that empowers only the girl child while neglecting the boy child is unknowingly preparing future problems for itself. The boys we ignore today may become the broken men society struggles with tomorrow.
          </p>
          <p>
            Strong families and healthy communities are built when boys are taught identity, responsibility, discipline, leadership, compassion, and purpose. A boy who is properly guided can become a responsible father, a faithful husband, a wise leader, a builder of people, and a protector of communities.
          </p>
          <p>
            This International Day of the Boy Child, we chose to invest in boys because the future depends on it. <strong>When you invest in a boy, you build generations.</strong>
          </p>
          <p>
            The testimonies are still coming in, and our hope is that every man will commit to investing in the boys around him.
          </p>
        </div>
      </div>

      {/* Testimonial */}
      <div className="border p-8 md:p-12 relative bg-[#fdfbf7] dark:bg-[#182016] mb-16" style={{ borderColor: "var(--peach)" }}>
        <div className="absolute top-6 left-6 opacity-10 text-[#c4572a]">
          <Quote size={64} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed italic opacity-90 mb-8">
            "I am so grateful for the work your team did. My students have been behaving remarkably well — there has been a total turnaround, to the point where they now take responsibility for their own actions. I truly wish you could host this conference again and I am open to partnering with you. Please expand this and invite more schools next time."
          </p>
          <p className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#c4572a]">
            Director, People's Comprehensive Mararaba
          </p>
        </div>
      </div>

      {/* Other Photos Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="aspect-square bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
          <span className="text-[10px] tracking-widest uppercase opacity-40">More Photos Coming Soon</span>
        </div>
        <div className="aspect-square bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
          <span className="text-[10px] tracking-widest uppercase opacity-40">More Photos Coming Soon</span>
        </div>
        <div className="aspect-square bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
          <span className="text-[10px] tracking-widest uppercase opacity-40">More Photos Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
