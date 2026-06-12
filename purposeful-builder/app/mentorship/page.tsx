import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Shield, Heart, Users } from "lucide-react";

export default function MentorshipPage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-5 relative overflow-hidden min-h-[500px]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl font-black uppercase leading-[1.1] text-black">
              Teaching boys <span className="text-[#cba37c]">responsibility</span>, identity, and safe masculinity.
            </h1>
          </div>
          <div className="relative h-[400px] w-full">
            <Image src="/images/mentorship_hero.png" fill className="object-contain object-right" alt="Boys mentorship" priority />
          </div>
        </div>
      </section>

      {/* Banner 1 */}
      <div className="bg-white py-6 px-5 border-y border-black/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xl font-bold uppercase tracking-widest" style={{ color: "var(--rust-deep)" }}>
          <p>Join Our Campaign: Mentoring 500 boys</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0 cursor-pointer hover:opacity-70 transition-opacity">
            <span className="text-[#cba37c]">PARTNER NOW</span>
            <ArrowRight className="text-black" />
          </div>
        </div>
      </div>

      {/* Dark Section */}
      <section className="text-white py-24 px-5" style={{ background: "var(--night)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-sans text-4xl md:text-5xl font-bold uppercase leading-tight mb-8">
              Give a helping hand to those who need it!
            </h2>
            <p className="opacity-70 leading-relaxed mb-6">
              When a boy constantly hears that he is less valuable because of his state, tribe, family background, or social status, those words settle deeper than we imagine.
              We are building a healthy community where boys can speak honestly and realize they are not alone. They need places where they can ask questions, learn from one another, and be heard.
            </p>
            <div className="flex items-center gap-4 font-bold uppercase tracking-widest mt-10 cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#cba37c" }}>
              <span>View our mentorship plan</span>
              <ArrowRight size={24} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white/10 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/images/card-mentorship.png" fill className="object-cover" alt="Mentorship" />
            </div>
            <div className="aspect-square bg-white/5 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/images/hero-bg.jpg" fill className="object-cover" alt="Boys" />
            </div>
            <div className="aspect-square bg-white/10 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/images/featured-writing-bg.png" fill className="object-cover" alt="Activity" />
            </div>
            <div className="aspect-square bg-white/5 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/images/mentorship_hero.png" fill className="object-cover" alt="Portrait" />
            </div>
          </div>
        </div>
      </section>

      {/* Banner 2 */}
      <div className="py-6 px-5 border-y border-white/10" style={{ background: "#1a1f24" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xl font-bold uppercase tracking-widest text-white">
          <p>We need mentors and partners in Nigeria</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0 cursor-pointer hover:opacity-70 transition-opacity">
            <span>PARTNER NOW</span>
            <ArrowRight className="text-white" />
          </div>
        </div>
      </div>

      {/* Light Section */}
      <section className="bg-white py-24 px-5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="grid sm:grid-cols-2 gap-12">
            <div>
              <BookOpen className="text-black mb-4" size={40} />
              <h3 className="font-bold uppercase tracking-widest mb-3 text-black">Identity</h3>
              <p className="text-sm opacity-70 leading-relaxed text-black">Grounding boys in who they are so the noise around them struggles to compete.</p>
            </div>
            <div>
              <Shield className="text-black mb-4" size={40} />
              <h3 className="font-bold uppercase tracking-widest mb-3 text-black">Responsibility</h3>
              <p className="text-sm opacity-70 leading-relaxed text-black">Teaching young men how to carry life's burdens without breaking under the weight.</p>
            </div>
            <div>
              <Heart className="text-black mb-4" size={40} />
              <h3 className="font-bold uppercase tracking-widest mb-3 text-black">Safe Masculinity</h3>
              <p className="text-sm opacity-70 leading-relaxed text-black">Fostering environments where vulnerability is not weakness, but the first step toward healing.</p>
            </div>
            <div>
              <Users className="text-black mb-4" size={40} />
              <h3 className="font-bold uppercase tracking-widest mb-3 text-black">Community</h3>
              <p className="text-sm opacity-70 leading-relaxed text-black">Creating brotherhoods and networks of support so no man has to walk alone.</p>
            </div>
          </div>
          <div className="relative h-[400px]">
            <Image src="/images/mentorship_hero.png" fill className="object-cover object-center opacity-90 rounded-2xl grayscale hover:grayscale-0 transition-all duration-700" alt="Africa Map / Mentorship" />
          </div>
        </div>
      </section>

      {/* Footer Dark Section */}
      <section className="text-white py-20 px-5 border-b border-white/10" style={{ background: "#121310" }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6">Character & Integrity</h3>
            <p className="text-sm opacity-50 leading-relaxed mb-6">Instilling foundational values that outlast temporary success or material wealth.</p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white cursor-pointer transition-colors">READ MORE &gt;</span>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6">Emotional Intelligence</h3>
            <p className="text-sm opacity-50 leading-relaxed mb-6">Equipping young men with the tools to process emotions and avoid transferred aggression.</p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white cursor-pointer transition-colors">READ MORE &gt;</span>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6">Career Guidance</h3>
            <p className="text-sm opacity-50 leading-relaxed mb-6">Helping boys discover their purpose, refine their skills, and prepare for the marketplace.</p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white cursor-pointer transition-colors">READ MORE &gt;</span>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6">Faith & Purpose</h3>
            <p className="text-sm opacity-50 leading-relaxed mb-6">Connecting young men to a higher calling, anchoring their identity in something eternal.</p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white cursor-pointer transition-colors">READ MORE &gt;</span>
          </div>
        </div>
      </section>

    </main>
  );
}
