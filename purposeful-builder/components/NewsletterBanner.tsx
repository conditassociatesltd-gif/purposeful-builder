"use client";

import Link from "next/link";

export default function NewsletterBanner() {
  return (
    <section className="bg-[#c4572a] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 py-8 md:py-10 relative">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-8 items-center relative">
          
          {/* Left Column: Text & Form — always on top */}
          <div className="text-[#1a1a1a] md:max-w-lg w-full z-10 relative">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight mb-3 leading-snug max-w-[65%] md:max-w-none">
              5 Minutes a day that will change your life
            </h2>
            <p className="text-xs md:text-sm leading-relaxed opacity-90 mb-6 text-balance max-w-[70%] md:max-w-none">
              Enter your email address below to sign up for my free newsletter, <em>Your Formation Newsletter</em>. Each week, you'll receive a few letters designed to help you build structure, navigate identity, and become whole. Just a few minutes a day that will change your life.
            </p>
            
            <form
              action="https://buttondown.email/api/emails/embed-subscribe/arc_austin"
              method="post"
              className="flex flex-row gap-2 bg-white rounded-full p-1 shadow-xl mb-3 relative max-w-[75%] md:max-w-sm"
            >
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="flex-1 bg-transparent px-4 py-2 outline-none placeholder:text-black/40 text-black text-xs sm:text-sm min-w-0"
              />
              <button
                type="submit"
                className="bg-[#1a1a1a] text-white px-4 sm:px-6 py-2 text-[10px] tracking-widest font-bold uppercase rounded-full hover:bg-black transition-colors shrink-0"
              >
                Sign Up
              </button>
            </form>
            
            <p className="text-[10px] opacity-75 italic text-balance max-w-[65%] md:max-w-none">
              Your information is protected and I never spam, ever. You can view my privacy policy <Link href="/privacy" className="underline underline-offset-2 hover:text-white transition-colors">here</Link>.
            </p>
          </div>

          {/* Right Column: Phone — desktop grid position */}
          <div className="hidden md:flex justify-end items-center relative py-6">
            <PhoneMockup />
          </div>
          
        </div>

        {/* Mobile-only: Phone as background layer, positioned right, same height as content */}
        <div className="md:hidden absolute top-1/2 -translate-y-1/2 right-2 z-0 opacity-90">
          <PhoneMockup small />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup({ small }: { small?: boolean }) {
  const phoneW = small ? "w-[120px]" : "w-[200px]";
  const phoneH = small ? "h-[240px]" : "h-[400px]";
  const phoneRound = small ? "rounded-[22px]" : "rounded-[36px]";
  const phoneBorder = small ? "border-[6px]" : "border-[10px]";
  const phonePad = small ? "p-2.5" : "p-5";
  const notchW = small ? "w-12" : "w-20";
  const notchH = small ? "h-2.5" : "h-5";
  const notchRound = small ? "rounded-b-md" : "rounded-b-xl";
  const badgeSize = small ? "text-[6px] px-1.5 py-0.5 mb-2" : "text-[10px] px-3 py-1 mb-6";
  const headingSize = small ? "text-sm" : "text-2xl";
  const footerText = small ? "text-[4px]" : "text-[7px]";
  const contentPt = small ? "pt-5" : "pt-10";
  const footerPt = small ? "pt-1.5" : "pt-4";

  return (
    <div
      className={`relative ${phoneW} ${phoneH} bg-[#e6eceb] ${phoneRound} ${phoneBorder} border-[#222222] flex flex-col items-center justify-center ${phonePad} text-center text-[#1a1a1a] select-none rotate-[12deg] transform-gpu transition-transform duration-700 hover:rotate-[8deg]`}
      style={{
        boxShadow: small
          ? "-8px 10px 16px rgba(0,0,0,0.35), inset -3px -3px 8px rgba(0,0,0,0.1), inset 3px 3px 8px rgba(255,255,255,0.8)"
          : "-15px 20px 30px rgba(0,0,0,0.4), inset -6px -6px 15px rgba(0,0,0,0.1), inset 6px 6px 15px rgba(255,255,255,0.8)",
      }}
    >
      {/* Phone Notch */}
      <div className={`absolute top-0 ${notchW} ${notchH} bg-[#222222] ${notchRound} z-10`}></div>

      {/* Phone Content */}
      <div className={`w-full h-full flex flex-col items-center ${contentPt}`}>
        <div className={`inline-block border border-[#c4572a] text-[#c4572a] rounded-[50%] ${badgeSize} italic font-semibold shadow-sm`}>
          5 Minutes
        </div>

        <h3 className={`font-serif ${headingSize} font-black leading-[1.1] italic text-balance tracking-tight`}>
          Each Day<br />
          That Will<br />
          Change Your<br />
          Life
        </h3>

        <div className={`mt-auto ${footerPt} border-t border-black/15 w-full`}>
          <p className={`${footerText} font-black uppercase tracking-[0.2em] leading-relaxed opacity-80`}>
            Your<br />
            Formation<br />
            Newsletter
          </p>
        </div>
      </div>

      {/* Screen Glare */}
      <div className="absolute top-0 right-0 w-[150%] h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent -rotate-45 pointer-events-none transform -translate-x-1/4"></div>
    </div>
  );
}
