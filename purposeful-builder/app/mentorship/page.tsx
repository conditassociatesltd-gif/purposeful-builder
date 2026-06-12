import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, BookOpen, Shield, Heart, Users } from "lucide-react";
import MentorshipForm from "@/components/MentorshipForm";

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
          <div className="relative h-[450px] w-full">
            <Image 
              src="/images/mentorship_hero_nobg.png" 
              fill 
              className="object-contain object-right mix-blend-multiply" 
              alt="Boys mentorship" 
              priority 
            />
          </div>
        </div>
      </section>

      {/* Banner 1 */}
      <div className="bg-white py-6 px-5 border-y border-black/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xl font-bold uppercase tracking-widest" style={{ color: "var(--rust-deep)" }}>
          <p>Join Our Campaign: Mentoring 500 boys</p>
          <a href="#join-form" className="flex items-center gap-4 mt-4 sm:mt-0 cursor-pointer hover:opacity-70 transition-opacity">
            <span className="text-[#cba37c]">JOIN PROGRAM</span>
            <ArrowRight className="text-black" />
          </a>
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
            <div className="flex flex-col gap-4 mt-10">
              <a href="#join-form" className="flex items-center gap-4 font-bold uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity" style={{ color: "#cba37c" }}>
                <span>Join our mentorship program</span>
                <ArrowRight size={24} />
              </a>
              <Link href="/mentorship/events" className="flex items-center gap-4 font-bold uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity text-white">
                <span>View past events</span>
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white/10 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/images/session-1.jpg" fill className="object-cover" alt="Teaching in Classroom" />
            </div>
            <div className="aspect-square bg-white/5 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/images/hero-bg.jpg" fill className="object-cover" alt="Boys" />
            </div>
            <div className="aspect-square bg-white/10 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/images/featured-writing-bg.png" fill className="object-cover" alt="Activity" />
            </div>
            <div className="aspect-square bg-white/5 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/images/mentorship_hero.png" fill className="object-cover object-top" alt="Portrait" />
            </div>
          </div>
        </div>
      </section>

      {/* Banner 2 */}
      <div className="py-6 px-5 border-y border-white/10" style={{ background: "#1a1f24" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xl font-bold uppercase tracking-widest text-white">
          <p>We need mentors and partners in Nigeria</p>
          <a href="#join-form" className="flex items-center gap-4 mt-4 sm:mt-0 cursor-pointer hover:opacity-70 transition-opacity">
            <span>JOIN PROGRAM</span>
            <ArrowRight className="text-white" />
          </a>
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

      {/* Registration Form */}
      <section id="join-form" className="py-24 px-5 border-t border-black/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-serif text-4xl md:text-5xl mb-4">Join the Mentorship Community</h3>
            <p className="opacity-70 text-lg max-w-xl mx-auto">Register below to join future programs and gain access to the community.</p>
          </div>
          <MentorshipForm />
        </div>
      </section>

      {/* Footer Dark Section */}
      <section className="text-white py-20 px-5 border-y border-white/10" style={{ background: "#121310" }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6">Character & Integrity</h3>
            <p className="text-sm opacity-70 leading-relaxed mb-6">A boy cannot lead others if he cannot lead himself. We anchor their character in biblical truth, teaching them that true integrity means living out God's standard even when no one is watching.</p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white cursor-pointer transition-colors">READ MORE &gt;</span>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6">Emotional Intelligence</h3>
            <p className="text-sm opacity-70 leading-relaxed mb-6">The world tells men to hide their pain. We teach boys how to process their emotions healthily before God, equipping them to handle life's pressures without breaking.</p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white cursor-pointer transition-colors">READ MORE &gt;</span>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6">Career Guidance</h3>
            <p className="text-sm opacity-70 leading-relaxed mb-6">Work is a divine assignment. We help boys discover their God-given gifts, refine their skills, and prepare for the marketplace to build with a vision that outlives them.</p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white cursor-pointer transition-colors">READ MORE &gt;</span>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6">Faith & Purpose</h3>
            <p className="text-sm opacity-70 leading-relaxed mb-6">At the core of every boy's identity is the One who created him. We anchor their self-worth not in society's metrics, but in God. When a boy knows whose he is, he knows who he is.</p>
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/80 hover:text-white cursor-pointer transition-colors">READ MORE &gt;</span>
          </div>
        </div>
      </section>

    </main>
  );
}
