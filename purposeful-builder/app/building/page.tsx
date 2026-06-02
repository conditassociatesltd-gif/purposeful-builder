import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink, Globe, Mail, MessageCircle } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import MentorshipForm from "@/components/MentorshipForm";

export const metadata = {
  title: "What I'm Building — Austin Okechukwu",
  description: "A home for the things I am actively building, writing, and stewarding.",
};

export default function BuildingPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-[#c4572a] flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Austin Okechukwu logo"
                width={46}
                height={46}
                className="object-contain scale-110"
              />
            </div>
            <span className="font-black tracking-tight uppercase">Austin Okechukwu</span>
          </Link>

          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Link href="/" className="flex items-center gap-2 text-xs tracking-[0.3em] uppercase opacity-50">
              <ArrowLeft size={14} /> Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-5 py-24 md:py-32 text-center">
        <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rust)" }}>
          What I'm Building
        </p>
        <h1 className="font-serif text-5xl md:text-7xl leading-tight tracking-tight mb-8">
          A home for the things I am actively building, writing, and stewarding.
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed opacity-70 max-w-2xl mx-auto">
          Beyond writing, this space connects the businesses, books, mentorship, and construction work that shape my life.
        </p>
      </section>

      {/* 1. BOOKS */}
      <section className="border-t border-black/10 dark:border-white/10 py-24" style={{ background: "var(--card)" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Books</h2>
            <p className="text-lg opacity-70 max-w-2xl">
              Showcasing books currently being written and future published works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Book 1 */}
            <div className="border p-8 md:p-12" style={{ borderColor: "var(--peach)" }}>
              <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-6 bg-black/10 dark:bg-white/10">
                Work In Progress
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-4">Formed in Silence</h3>
              <p className="opacity-75 leading-relaxed mb-8 h-20">
                A reflection on the unseen seasons that shape a man long before the world sees him.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 text-xs tracking-[0.2em] uppercase border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                  Learn More
                </button>
                <button className="px-6 py-3 text-xs tracking-[0.2em] uppercase text-white hover:bg-black/80 transition-colors" style={{ background: "var(--rust)" }}>
                  Notify Me When Released
                </button>
              </div>
            </div>

            {/* Book 2 */}
            <div className="border p-8 md:p-12" style={{ borderColor: "var(--peach)" }}>
              <div className="inline-block px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-bold mb-6 bg-black/10 dark:bg-white/10">
                Work In Progress
              </div>
              <h3 className="font-serif text-3xl md:text-4xl mb-4">The Boy and Addictions</h3>
              <p className="opacity-75 leading-relaxed mb-8 h-20">
                Exploring the wounds, habits, and hidden battles that shape boys before they become men.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 text-xs tracking-[0.2em] uppercase border border-black/20 dark:border-white/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                  Learn More
                </button>
                <button className="px-6 py-3 text-xs tracking-[0.2em] uppercase text-white hover:bg-black/80 transition-colors" style={{ background: "var(--rust)" }}>
                  Notify Me When Released
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BOYS MENTORSHIP */}
      <section className="border-t border-black/10 dark:border-white/10 py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-16 md:flex justify-between items-end gap-10">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Boys Mentorship</h2>
              <p className="text-xl md:text-2xl leading-relaxed opacity-80">
                Helping boys become men through faith, responsibility, discipline, identity formation, and practical life guidance.
              </p>
            </div>
          </div>

          {/* Mentorship Gallery (Placeholders) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            <div className="aspect-square bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
              <span className="text-xs tracking-widest uppercase opacity-40">Program Photo</span>
            </div>
            <div className="aspect-[4/5] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center -mt-8">
              <span className="text-xs tracking-widest uppercase opacity-40">Event Photo</span>
            </div>
            <div className="aspect-square bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center mt-8">
              <span className="text-xs tracking-widest uppercase opacity-40">Workshop Photo</span>
            </div>
            <div className="aspect-square bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
              <span className="text-xs tracking-widest uppercase opacity-40">Testimonials</span>
            </div>
          </div>

          {/* Registration Form */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="font-serif text-3xl mb-3">Join the Mentorship Community</h3>
              <p className="opacity-70">Register below to join future programs and gain access to the community.</p>
            </div>
            
            <MentorshipForm />
          </div>
        </div>
      </section>

      {/* 3. CONDIT ASSOCIATES LTD */}
      <section className="border-t border-black/10 dark:border-white/10" style={{ background: "var(--soft-green)" }}>
        {/* Condit Hero */}
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-black/10 dark:border-white/10">
          <div className="absolute inset-0 bg-[#26391f]/90 z-10 flex flex-col items-center justify-center text-center p-5">
            <p className="text-xs tracking-[0.35em] uppercase mb-6 text-[#9dbb6f]">Condit Associates Ltd</p>
            <h2 className="font-serif text-5xl md:text-7xl text-white max-w-4xl leading-tight drop-shadow-md">
              Building homes, commercial spaces, and environments that stand the test of time.
            </h2>
          </div>
          {/* Placeholder for Condit Associates background image */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
             <span className="text-white/30 text-sm tracking-widest uppercase">Background Image Placeholder</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 py-24">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <h3 className="font-serif text-4xl">Featured Projects</h3>
            <div className="flex gap-4">
              <a href="#" className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-white/20 hover:bg-black/5 transition-colors text-xs uppercase tracking-widest">
                <Globe size={14} /> Website
              </a>
              <a href="https://www.instagram.com/conditassociatesltd?igsh=MWduM3lzcGd1eGZtag==" target="_blank" className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-white/20 hover:bg-black/5 transition-colors text-xs uppercase tracking-widest">
                <ExternalLink size={14} /> Instagram
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-black/10 dark:bg-white/10 mb-5 relative overflow-hidden flex items-center justify-center">
                 <span className="text-xs tracking-widest uppercase opacity-40">Residential Project Image</span>
              </div>
              <h4 className="font-serif text-2xl group-hover:text-[#c4572a] transition-colors">Residential Mastery</h4>
              <p className="opacity-70 mt-2 text-sm">A brief description of best residential projects.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-black/10 dark:bg-white/10 mb-5 relative overflow-hidden flex items-center justify-center">
                 <span className="text-xs tracking-widest uppercase opacity-40">Commercial Project Image</span>
              </div>
              <h4 className="font-serif text-2xl group-hover:text-[#c4572a] transition-colors">Commercial Spaces</h4>
              <p className="opacity-70 mt-2 text-sm">A brief description of best commercial projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONDIT HOMES LTD */}
      <section className="border-t border-black/10 dark:border-white/10 py-24 bg-[#fffaf0] dark:bg-[#182016]">
        <div className="max-w-6xl mx-auto px-5 text-center mb-20">
          <p className="text-xs tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rust)" }}>Condit Homes Ltd</p>
          <h2 className="font-serif text-5xl md:text-6xl mb-6 max-w-3xl mx-auto leading-tight">
            Helping people find places they can truly call home.
          </h2>
          <div className="flex justify-center gap-4 mt-10">
             <a href="https://wa.me/yourwhatsappnumber" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-widest uppercase bg-green-600 hover:bg-green-700 text-white transition-colors">
               <MessageCircle size={14} /> WhatsApp Enquiries
             </a>
             <a href="mailto:hello@austinokechukwu.com" className="inline-flex items-center gap-2 px-6 py-3 text-xs tracking-widest uppercase border border-black/20 dark:border-white/20 hover:bg-black/5 transition-colors">
               <Mail size={14} /> Email Us
             </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border p-5 bg-white dark:bg-[#11170f]" style={{ borderColor: "var(--peach)" }}>
                <div className="aspect-[4/3] bg-black/5 dark:bg-white/5 mb-5 flex items-center justify-center">
                  <span className="text-[10px] tracking-widest uppercase opacity-40">Property Image {item}</span>
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-serif text-xl">The Oasis Villa</h4>
                  <span className="font-bold text-[#c4572a]">$450,000</span>
                </div>
                <p className="text-xs tracking-widest uppercase opacity-60 mb-4">Lekki Phase 1 · 4 Bedrooms</p>
                <p className="opacity-75 text-sm leading-relaxed mb-6">
                  A beautiful contemporary 4-bedroom villa with a pool, modern kitchen, and spacious living area perfect for family living.
                </p>
                <button className="w-full py-3 text-xs tracking-widest uppercase border border-black/20 dark:border-white/20 hover:bg-black/5 transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ background: "#121310", color: "#f4efe3", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-5 py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Austin Okechukwu logo" width={40} height={40} />
            <span className="font-black tracking-tight uppercase text-xl">Austin Okechukwu</span>
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-40">
            © 2026 Austin Okechukwu
          </p>
        </div>
      </footer>
    </main>
  );
}
