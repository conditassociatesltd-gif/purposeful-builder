"use client";

import Link from "next/link";

export default function NewsletterBanner() {
  return (
    <section className="bg-[#c4572a] overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-5 py-8 md:py-10">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-8 items-center relative">
          
          {/* Left Column: Text & Form */}
          <div className="text-[#1a1a1a] md:max-w-lg w-full z-10 relative">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tight mb-3 leading-snug md:pr-0">
              5 Minutes a day that will change your life
            </h2>
            <p className="text-xs md:text-sm leading-relaxed opacity-90 mb-6 text-balance md:pr-0">
              Enter your email address below to sign up for my free newsletter, <em>Your Formation Newsletter</em>. Each week, you'll receive a few letters designed to help you build structure, navigate identity, and become whole. Just a few minutes a day that will change your life.
            </p>
            
            <form
              action="https://buttondown.email/api/emails/embed-subscribe/arc_austin"
              method="post"
              className="flex flex-row gap-2 bg-white rounded-full p-1 shadow-xl mb-3 relative max-w-sm"
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
            
            <p className="text-[10px] opacity-75 italic text-balance">
              Your information is protected and I never spam, ever. You can view my privacy policy <Link href="/privacy" className="underline underline-offset-2 hover:text-white transition-colors">here</Link>.
            </p>
          </div>

          {/* Right Column: 3D CSS Phone Mockup */}
          <div className="absolute right-[-40px] top-[-20px] md:relative md:right-0 md:top-0 flex justify-center md:justify-end items-center opacity-20 md:opacity-100 pointer-events-none md:pointer-events-auto scale-[0.6] origin-top-right md:scale-100 md:origin-center py-6">
            {/* The Phone */}
            <div 
              className="relative w-[200px] h-[400px] bg-[#e6eceb] rounded-[36px] border-[10px] border-[#222222] flex flex-col items-center justify-center p-5 text-center text-[#1a1a1a] select-none rotate-[12deg] transform-gpu transition-transform duration-700 md:hover:rotate-[8deg]"
              style={{
                boxShadow: "-15px 20px 30px rgba(0,0,0,0.4), inset -6px -6px 15px rgba(0,0,0,0.1), inset 6px 6px 15px rgba(255,255,255,0.8)"
              }}
            >
              {/* Phone Notch */}
              <div className="absolute top-0 w-20 h-5 bg-[#222222] rounded-b-xl z-10"></div>
              
              {/* Phone Content */}
              <div className="w-full h-full flex flex-col items-center pt-10">
                <div className="inline-block border border-[#c4572a] text-[#c4572a] rounded-[50%] px-3 py-1 text-[10px] italic mb-6 font-semibold shadow-sm">
                  5 Minutes
                </div>
                
                <h3 className="font-serif text-2xl font-black leading-[1.1] italic text-balance tracking-tight">
                  Each Day<br/>
                  That Will<br/>
                  Change Your<br/>
                  Life
                </h3>
                
                <div className="mt-auto pt-4 border-t border-black/15 w-full">
                  <p className="text-[7px] font-black uppercase tracking-[0.2em] leading-relaxed opacity-80">
                    Your<br/>
                    Formation<br/>
                    Newsletter
                  </p>
                </div>
              </div>
              
              {/* Screen Glare (subtle reflection) */}
              <div className="absolute top-0 right-0 w-[150%] h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent -rotate-45 pointer-events-none transform -translate-x-1/4"></div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 blur-[50px] rounded-full pointer-events-none"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
