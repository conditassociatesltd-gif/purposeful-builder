"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function EcosystemCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-24 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/building-bg.png" 
          alt="Background" 
          fill 
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#121619]/80 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-[10px] tracking-widest uppercase mb-6">
              My Ecosystem
            </div>
            <h2 className="font-serif text-5xl md:text-6xl leading-tight">
              A personal portfolio of <span className="text-[#cba37c]">work & ideas</span>
            </h2>
          </div>
          <div className="md:max-w-sm">
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Beyond writing, this space connects the businesses, books, mentorship, and construction work that shape my life.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition"
              >
                <ArrowLeft size={16} />
              </button>
              <button 
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white text-black hover:bg-white/90 transition"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Cards */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide scroll-smooth" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Card 1 */}
          <Link href="/book" className="snap-start shrink-0 w-[300px] md:w-[350px] bg-white rounded-2xl p-6 text-black group relative hover:-translate-y-2 transition-transform duration-300">
            <div className="inline-block px-3 py-1 rounded-full border border-black/10 text-[10px] tracking-widest uppercase font-bold mb-4">
              Books
            </div>
            <h3 className="font-serif text-2xl mb-5">Writing & Publishing</h3>
            <div className="aspect-[4/3] rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
               <Image src="/images/card-books.png" alt="Writing & Publishing" fill className="object-cover" />
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-10">
              Exploring identity, wounds, and becoming through published works and essays.
            </p>
            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#cba37c] group-hover:text-white group-hover:border-[#cba37c] transition-colors">
              <ArrowRight size={16} className="-rotate-45" />
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/mentorship" className="snap-start shrink-0 w-[300px] md:w-[350px] bg-[#1a1f24] rounded-2xl p-6 text-white group relative hover:-translate-y-2 transition-transform duration-300">
            <div className="inline-block px-3 py-1 rounded-full border border-white/20 text-[10px] tracking-widest uppercase mb-4 text-white/70">
              Mentorship
            </div>
            <h3 className="font-serif text-2xl mb-5">Boys Mentorship</h3>
            <div className="aspect-[4/3] rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
               <Image src="/images/card-mentorship.png" alt="Boys Mentorship" fill className="object-cover" />
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-10">
              Teaching responsibility and safe masculinity through faith and practical life guidance.
            </p>
            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 group-hover:bg-white group-hover:text-black transition-colors">
              <ArrowRight size={16} className="-rotate-45" />
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/company" className="snap-start shrink-0 w-[300px] md:w-[350px] bg-white rounded-2xl p-6 text-black group relative hover:-translate-y-2 transition-transform duration-300">
            <div className="inline-block px-3 py-1 rounded-full border border-black/10 text-[10px] tracking-widest uppercase font-bold mb-4">
              Construction
            </div>
            <h3 className="font-serif text-2xl mb-5">Condit Associates Ltd</h3>
            <div className="aspect-[4/3] rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
               <Image src="/images/card-associates.png" alt="Condit Associates Ltd" fill className="object-cover" />
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-10">
              Building environments, commercial spaces, and projects that stand the test of time.
            </p>
            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#cba37c] group-hover:text-white group-hover:border-[#cba37c] transition-colors">
              <ArrowRight size={16} className="-rotate-45" />
            </div>
          </Link>

          {/* Card 4 */}
          <Link href="/company" className="snap-start shrink-0 w-[300px] md:w-[350px] bg-white rounded-2xl p-6 text-black group relative hover:-translate-y-2 transition-transform duration-300">
            <div className="inline-block px-3 py-1 rounded-full border border-black/10 text-[10px] tracking-widest uppercase font-bold mb-4">
              Real Estate
            </div>
            <h3 className="font-serif text-2xl mb-5">Condit Homes Ltd</h3>
            <div className="aspect-[4/3] rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
               <Image src="/images/card-homes.png" alt="Condit Homes Ltd" fill className="object-cover" />
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-10">
              Helping people find places they can truly call home. Real estate and property thinking.
            </p>
            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#cba37c] group-hover:text-white group-hover:border-[#cba37c] transition-colors">
              <ArrowRight size={16} className="-rotate-45" />
            </div>
          </Link>

          {/* Card 5 */}
          <div className="snap-start shrink-0 w-[300px] md:w-[350px] bg-[#1a1f24] rounded-2xl p-6 text-white group relative hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="inline-block px-3 py-1 rounded-full border border-[#cba37c]/40 text-[10px] tracking-widest uppercase text-[#cba37c]">
                Cleaning Services
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#cba37c]/15 text-[10px] tracking-widest uppercase text-[#cba37c] font-bold animate-pulse">
                Coming Soon
              </div>
            </div>
            <h3 className="font-serif text-2xl mb-5">Condit Cleanique Ltd</h3>
            <div className="aspect-[4/3] rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
               <Image src="/images/card-cleanique.png" alt="Condit Cleanique Ltd" fill className="object-cover opacity-85" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f24]/60 via-transparent to-transparent" />
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-2">
              Coming soon to Abuja.
            </p>
            <p className="text-sm opacity-50 leading-relaxed mb-10">
              Premium cleaning and facility management — built with the same standard of excellence.
            </p>
            <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-[#cba37c]/10 text-[#cba37c]">
              <ArrowRight size={16} className="-rotate-45" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
