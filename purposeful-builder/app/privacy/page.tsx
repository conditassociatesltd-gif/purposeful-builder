import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Austin Okechukwu",
  description: "Privacy policy for the purposeful builder newsletter.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-5" style={{ background: "var(--parchment)", color: "var(--ink)" }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-bold text-black/60 hover:text-[var(--rust)] transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        
        <h1 className="font-serif text-4xl md:text-5xl font-black tracking-tight mb-12">Privacy Policy</h1>
        
        <div className="space-y-8 text-lg opacity-80 leading-relaxed font-serif">
          <p>
            Your privacy is deeply respected. If you subscribe to <em>Your Formation Newsletter</em>, your email address and any personal information you provide are protected and secure.
          </p>
          <p>
            I will never sell, rent, or share your information with any third party anywhere. Your details are used strictly for the purpose of sending you the newsletter and relevant updates about my work.
          </p>
          <p>
            No fluff, no spam, no BS. You can unsubscribe at any time using the link at the bottom of any email you receive from me.
          </p>
        </div>
      </div>
    </main>
  );
}
