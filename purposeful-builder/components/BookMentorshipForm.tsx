"use client";

import { useState } from "react";
import { ArrowRight, MessageCircle, ChevronDown } from "lucide-react";

export default function BookMentorshipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
      <div className="border p-10 md:p-14 text-center rounded-sm bg-[var(--card)] mt-8" style={{ borderColor: "var(--peach)" }}>
        <h4 className="font-serif text-3xl mb-4">Request Sent.</h4>
        <p className="opacity-75 leading-relaxed mb-4 max-w-md mx-auto">
          Thank you for your interest in our mentorship program. We will get back to you shortly to discuss availability and details.
        </p>
      </div>
    );
  }

  if (!isFormVisible) {
    return (
      <div className="flex flex-col gap-4 mt-6">
        <button
          onClick={() => setIsFormVisible(true)}
          className="flex items-center justify-between w-full md:w-auto px-6 py-4 text-xs tracking-widest uppercase font-bold text-white transition-colors hover:bg-white/10 border border-white/20"
        >
          <span>Book Us For Mentorship</span>
          <ChevronDown size={16} className="ml-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <form onSubmit={handleSubmit} className="border p-8 md:p-10 rounded-sm bg-[var(--card)] text-black" style={{ borderColor: "var(--peach)", backgroundColor: "white" }}>
        {/* Honeypot for FormSubmit */}
        <input type="text" name="_honey" style={{ display: "none" }} />
        {/* Disable captcha for seamless experience */}
        <input type="hidden" name="_captcha" value="false" />
        {/* Subject */}
        <input type="hidden" name="_subject" value="New Mentorship Booking Request!" />

        <h3 className="font-serif text-2xl mb-6 text-black">Booking Details</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60 text-black">Full Name / Contact Person</label>
            <input required name="Name" type="text" className="w-full border p-3 outline-none focus:border-[var(--rust)] transition-colors bg-transparent text-black" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60 text-black">Email Address</label>
            <input required name="Email" type="email" className="w-full border p-3 outline-none focus:border-[var(--rust)] transition-colors bg-transparent text-black" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60 text-black">Institution (School, Church, etc.)</label>
          <input required name="Institution" type="text" className="w-full border p-3 outline-none focus:border-[var(--rust)] transition-colors bg-transparent text-black" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60 text-black">Proposed Time / Date</label>
            <input required name="Proposed Time" type="text" placeholder="e.g., Saturday mornings, or specific date" className="w-full border p-3 outline-none focus:border-[var(--rust)] transition-colors bg-transparent text-black placeholder:text-black/30" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          </div>
          <div>
            <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60 text-black">Engagement Type</label>
            <select required name="Engagement Type" className="w-full border p-3 outline-none focus:border-[var(--rust)] transition-colors bg-transparent text-black appearance-none" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
              <option value="" disabled selected>Select an option...</option>
              <option value="Weekly Mentorship">Weekly Mentorship</option>
              <option value="Monthly Mentorship">Monthly Mentorship</option>
              <option value="One-time Session">One-time Session</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-xs tracking-[0.2em] uppercase mb-2 opacity-60 text-black">Additional Details / Objectives</label>
          <textarea name="Details" rows={4} className="w-full border p-3 outline-none focus:border-[var(--rust)] transition-colors bg-transparent resize-none text-black" style={{ borderColor: "rgba(0,0,0,0.1)" }}></textarea>
        </div>

        <button disabled={isSubmitting} type="submit" className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 text-xs tracking-[0.2em] uppercase text-white font-semibold transition-colors hover:bg-[#5a743e] disabled:opacity-50" style={{ background: "var(--rust)" }}>
          {isSubmitting ? "Sending Request..." : "Submit Booking Request"} <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
