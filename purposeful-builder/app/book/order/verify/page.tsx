"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowLeft, Loader2, Send } from "lucide-react";
import { BOOK_CONFIG } from "@/lib/book-config";

function VerifyContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setLoading(false);
      setMessage("No order reference provided.");
      return;
    }

    async function checkVerification() {
      try {
        const res = await fetch(`/api/paystack/verify?reference=${encodeURIComponent(reference || "")}`);
        const data = await res.json();

        if (data.success || data.status === "paid_and_confirmed") {
          setConfirmed(true);
          setOrder(data.order);
        } else {
          setMessage(data.message || "Payment is still being processed or could not be verified.");
          if (data.order) setOrder(data.order);
        }
      } catch (err: any) {
        setMessage(err.message || "Unable to check payment status.");
      } finally {
        setLoading(false);
      }
    }

    checkVerification();
  }, [reference]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <Loader2 size={40} className="animate-spin text-[#c4572a] mx-auto mb-4" />
        <h2 className="font-serif text-2xl mb-2">Verifying Payment...</h2>
        <p className="text-sm opacity-70">Please hold on while we validate your transaction with Paystack.</p>
      </div>
    );
  }

  if (confirmed && order) {
    const isPersonal = order.order_type === "personal";

    return (
      <div className="border p-6 sm:p-10 md:p-12 bg-white dark:bg-[#161616] rounded-xl shadow-lg border-black/10 dark:border-white/10 text-left">
        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-4">
          <CheckCircle2 size={36} className="shrink-0" />
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-black dark:text-white">
            Payment Validated & Order Confirmed!
          </h1>
        </div>

        <p className="text-base sm:text-lg opacity-85 mb-6">
          Thank you, <strong className="text-black dark:text-white">{order.full_name}</strong>! Your payment has been received and verified.
        </p>

        {/* Confirmed Summary Box */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-5 sm:p-6 rounded-lg mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-emerald-200 dark:border-emerald-800">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-300 font-bold">Confirmed Order Reference</span>
              <p className="font-mono text-xl sm:text-2xl font-bold text-[#c4572a]">{order.order_reference}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-300 font-bold">Status</span>
              <p className="text-emerald-700 dark:text-emerald-300 font-bold text-lg">PAID & VALIDATED ✓</p>
            </div>
          </div>

          <div className="pt-4 text-xs sm:text-sm space-y-1.5 opacity-90">
            <p><strong>Order Type:</strong> {isPersonal ? "Personal Copy" : "School Outreach Program Support"}</p>
            <p><strong>Copies Ordered:</strong> {order.copies} copies (Total: ₦{order.total_amount?.toLocaleString()})</p>
            {isPersonal && order.state && (
              <p><strong>Delivery Address:</strong> {order.street}, {order.city}, {order.state}, Nigeria</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="mb-8 p-5 rounded-lg bg-[#faf5f0] dark:bg-[#201c18] border border-[#e5d5c5] dark:border-[#3d3228] text-sm">
          {isPersonal ? (
            <div className="space-y-2">
              <p className="text-base font-serif font-bold text-[#c4572a]">
                ❤️ Thank you for purchasing this book. It will surely change your life.
              </p>
              <p className="text-stone-800 dark:text-stone-200">
                📦 <strong>What Happens Next:</strong> Austin will reach out to your phone / WhatsApp (<strong>{order.phone}</strong>) shortly to coordinate dispatch and confirm delivery fees.
              </p>
            </div>
          ) : (
            <p className="text-emerald-800 dark:text-emerald-200">
              🎓 <strong>School Outreach Program:</strong> Thank you for sowing into the next generation. Your sponsored copies will reach students starting in January 2027!
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-6 py-4 rounded-md font-bold text-sm text-white transition-opacity shadow-md text-center"
            style={{ background: "var(--rust)" }}
          >
            Return to Book Page
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-4 rounded-md font-bold text-sm border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-center"
          >
            Visit Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Not confirmed / pending
  return (
    <div className="border p-6 sm:p-10 bg-white dark:bg-[#161616] rounded-xl shadow-lg border-black/10 dark:border-white/10 text-left">
      <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 mb-4">
        <AlertCircle size={32} className="shrink-0" />
        <h1 className="font-serif text-2xl sm:text-3xl text-black dark:text-white">Awaiting Payment Confirmation</h1>
      </div>

      <p className="text-sm sm:text-base opacity-80 mb-6">
        {message || "We could not immediately verify your online payment. If you made a transfer, please send your receipt below."}
      </p>

      {reference && (
        <div className="bg-black/5 dark:bg-white/5 p-4 rounded mb-6 font-mono text-sm">
          Reference: <strong>{reference}</strong>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/book/order`}
          className="inline-flex items-center justify-center px-6 py-3.5 rounded-md font-bold text-xs uppercase tracking-wider text-white"
          style={{ background: "var(--rust)" }}
        >
          Back to Order Form
        </Link>
      </div>
    </div>
  );
}

export default function OrderVerifyPage() {
  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 max-w-2xl mx-auto">
      <Suspense fallback={<div className="text-center py-20">Loading order verification...</div>}>
        <VerifyContent />
      </Suspense>
    </main>
  );
}
