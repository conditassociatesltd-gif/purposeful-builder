import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MentorshipGallery from "@/components/MentorshipGallery";

export default function MentorshipEventsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-5 max-w-6xl mx-auto" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <Link href="/mentorship" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity mb-16">
        <ArrowLeft size={16} /> Back to Mentorship
      </Link>
      
      <div className="mb-16">
        <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">Past <span className="text-[#cba37c]">Events</span></h1>
        <p className="text-lg opacity-80 leading-relaxed max-w-2xl border-l-2 border-[#c4572a] pl-6">
          A visual record of our mentorship conferences and sessions. Building the next generation, one event at a time.
        </p>
      </div>

      <MentorshipGallery />

    </main>
  );
}
