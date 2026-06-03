"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const backgroundImages = [
  { src: "/hero-writing.jpg", alt: "Writing and Books" },
  { src: "/hero-mentorship.jpg", alt: "Boys Mentorship" },
  { src: "/hero-architecture.jpg", alt: "Condit Associates Architecture" },
  { src: "/hero-realestate.jpg", alt: "Condit Homes Real Estate" },
];

export default function BuildingHero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    // 5000ms interval for switching the images
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden border-b border-black/10 dark:border-white/10">
      {/* Background Images Layer */}
      <div className="absolute inset-0 bg-black">
        {backgroundImages.map((img, idx) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            className={`object-cover object-center transition-opacity duration-500 ease-in-out ${
              idx === currentIdx ? "opacity-40" : "opacity-0"
            }`}
            priority={idx === 0}
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 py-24 md:py-32 text-center text-white">
        <p className="text-xs tracking-[0.35em] uppercase mb-6 text-[#e8c08a]">
          What I'm Building
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight tracking-tight mb-8 drop-shadow-md">
          A home for the things I am actively building, writing, and stewarding.
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed opacity-90 max-w-2xl mx-auto drop-shadow">
          Beyond writing, this space connects the businesses, books, mentorship, and construction work that shape my life.
        </p>
      </div>
    </section>
  );
}
