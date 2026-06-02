"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function MentorshipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("https://formsubmit.co/ajax/hello@austinokechukwu.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      // Even if fetch fails slightly, we still show the WhatsApp link 
      // so the user flow isn't completely broken, but ideally it succeeds.
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="border p-10 md:p-14 text-center rounded-sm bg-[var(--card)]" style={{ borderColor: "var(--peach)" }}>
        <h4 className="font-serif text-3xl mb-4">Thank you.</h4>
        <p className="opacity-75 leading-relaxed mb-8 max-w-md mx-auto">
          Your details have been received. Click below to join the WhatsApp Community and stay updated on the next program.
        </p>
        <a
          href="https://chat.whatsapp.com/HfOjZiVdKivIOKrHifg2Hp?mode=gi_t"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-5 text-xs tracking-[0.2em] uppercase text-white font-semibold transition-colors hover:bg-[#5a743e]"
          style={{ background: "var(--rust)" }}
        >
          <MessageCircle size={16} /> Join WhatsApp Group
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border p-8 md:p-12 rounded-sm bg-[var(--card)]" style={{ borderColor: "var(--peach)" }}>
      {/* Honeypot for FormSubmit */}
      <input type="text" name="_honey" style={{ display: "none" }} />
      {/* Disable captcha for seamless experience */}
      <input type="hidden" name="_captcha" value="false" />
      {/* Subject */}
      <input type="hidden" name="_subject" value="New Mentorship Registration!" />

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">Full Name</label>
          <input required name="Full Name" type="text" className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent" style={{ borderColor: "var(--peach)" }} />
        </div>
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">Age</label>
          <input required name="Age" type="number" className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent" style={{ borderColor: "var(--peach)" }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">Phone Number</label>
          <input required name="Phone Number" type="tel" className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent" style={{ borderColor: "var(--peach)" }} />
        </div>
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">Email Address</label>
          <input required name="Email Address" type="email" className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent" style={{ borderColor: "var(--peach)" }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">City</label>
          <input required name="City" type="text" className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent" style={{ borderColor: "var(--peach)" }} />
        </div>
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">Occupation / Student</label>
          <input required name="Occupation / Student" type="text" className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent" style={{ borderColor: "var(--peach)" }} />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">School (Optional)</label>
        <input name="School" type="text" className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent" style={{ borderColor: "var(--peach)" }} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">Parent/Guardian Name (Optional)</label>
          <input name="Parent/Guardian Name" type="text" className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent" style={{ borderColor: "var(--peach)" }} />
        </div>
        <div>
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">Parent/Guardian Phone (Optional)</label>
          <input name="Parent/Guardian Phone" type="tel" className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent" style={{ borderColor: "var(--peach)" }} />
        </div>
      </div>

      <div className="mb-10">
        <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60">Why would you like to join?</label>
        <textarea required name="Why would you like to join?" rows={4} className="w-full border p-4 outline-none focus:border-[var(--rust)] transition-colors bg-transparent resize-none" style={{ borderColor: "var(--peach)" }}></textarea>
      </div>

      <button disabled={isSubmitting} type="submit" className="inline-flex items-center gap-3 px-8 py-5 text-xs tracking-[0.2em] uppercase text-white font-semibold transition-colors hover:bg-[#5a743e] disabled:opacity-50" style={{ background: "var(--rust)" }}>
        {isSubmitting ? "Submitting..." : "Join Mentorship Program"} <ArrowRight size={16} />
      </button>
    </form>
  );
}
