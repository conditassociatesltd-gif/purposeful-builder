"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, ShieldCheck, Heart, User, Send, Copy, Check } from "lucide-react";
import { BOOK_CONFIG, NIGERIAN_STATES, getCurrentPriceInfo } from "@/lib/book-config";

export default function OrderBookPage() {
  const [orderType, setOrderType] = useState<"personal" | "outreach">("personal");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [copies, setCopies] = useState<number>(1);
  
  // Delivery address fields (Personal only)
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  
  // Honeypot for spam prevention
  const [honeypot, setHoneypot] = useState("");

  // Submission state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Dynamic pricing
  const priceInfo = getCurrentPriceInfo();
  const validCopies = Math.max(1, copies || 1);
  const totalAmount = validCopies * priceInfo.unitPrice;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BOOK_CONFIG.payment.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (copies < 1) {
      setErrorMessage("Please enter at least 1 copy.");
      return;
    }

    if (orderType === "personal" && (!street || !city || !state)) {
      setErrorMessage("Please complete all delivery fields (Street, City, and State).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_type: orderType,
          full_name: fullName,
          phone,
          email,
          copies: validCopies,
          street: orderType === "personal" ? street : null,
          city: orderType === "personal" ? city : null,
          state: orderType === "personal" ? state : null,
          website_hp: honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit order. Please try again.");
      }

      setOrderSuccess(data.order);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Thank-You / Payment Details View
  // -------------------------------------------------------------
  if (orderSuccess) {
    const isPersonal = orderSuccess.order_type === "personal";
    const waText = `Hello Austin, I have made payment for my book order: ${orderSuccess.order_reference} (₦${orderSuccess.total_amount.toLocaleString()}). Here is my proof of payment:`;
    const whatsappUrl = `https://wa.me/${BOOK_CONFIG.payment.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    return (
      <main className="min-h-screen py-16 px-5 max-w-3xl mx-auto">
        <div className="border p-8 md:p-12 bg-white dark:bg-[#161616] rounded-xl shadow-lg border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-4">
            <CheckCircle2 size={36} />
            <h1 className="font-serif text-3xl md:text-4xl text-black dark:text-white">Order Received</h1>
          </div>
          
          <p className="text-lg opacity-80 mb-6">
            Thank you, <strong className="text-black dark:text-white">{orderSuccess.full_name}</strong>! Your order has been placed successfully.
          </p>

          {/* Reference & Summary Box */}
          <div className="bg-black/5 dark:bg-white/5 p-6 rounded-lg mb-8 border border-black/5 dark:border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
              <div>
                <span className="text-xs uppercase tracking-widest opacity-60">Order Reference</span>
                <p className="font-mono text-xl font-bold text-[#c4572a]">{orderSuccess.order_reference}</p>
              </div>
              <div className="sm:text-right">
                <span className="text-xs uppercase tracking-widest opacity-60">Total Amount Due</span>
                <p className="font-serif text-2xl font-bold">₦{orderSuccess.total_amount.toLocaleString()}</p>
              </div>
            </div>

            <div className="pt-4 text-sm space-y-1 opacity-80">
              <p>
                <strong>Order Type:</strong> {isPersonal ? "Personal Copy" : "School Outreach Program Support"}
              </p>
              <p>
                <strong>Copies:</strong> {orderSuccess.copies} @ ₦{orderSuccess.unit_price.toLocaleString()} each
              </p>
              {isPersonal && orderSuccess.state && (
                <p>
                  <strong>Delivery To:</strong> {orderSuccess.street}, {orderSuccess.city}, {orderSuccess.state}
                </p>
              )}
            </div>
          </div>

          {/* Status Message */}
          <div className="mb-8 p-4 rounded-lg bg-[#faf5f0] dark:bg-[#201c18] border border-[#e5d5c5] dark:border-[#3d3228] text-sm">
            {isPersonal ? (
              <p className="text-stone-800 dark:text-stone-200">
                📦 <strong>Delivery Note:</strong> The delivery fee will be confirmed by me shortly.
              </p>
            ) : (
              <p className="text-emerald-800 dark:text-emerald-200">
                🎓 <strong>Outreach Note:</strong> Thank you for supporting our School Outreach Program. Your copies will reach students starting in January 2027.
              </p>
            )}
          </div>

          {/* Bank Payment Instructions */}
          <div className="border border-black/10 dark:border-white/10 p-6 md:p-8 rounded-lg mb-8 bg-black/[0.02] dark:bg-white/[0.02]">
            <h3 className="font-serif text-2xl mb-2">Step 2: Make Bank Transfer</h3>
            <p className="text-sm opacity-75 mb-6">
              Please transfer <strong className="text-black dark:text-white">₦{orderSuccess.total_amount.toLocaleString()}</strong> into the author's bank account:
            </p>

            <div className="space-y-4 text-sm bg-white dark:bg-[#121212] p-5 rounded-md border border-black/10 dark:border-white/10">
              <div className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5">
                <span className="opacity-60">Bank:</span>
                <span className="font-bold text-base">{BOOK_CONFIG.payment.bankName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5">
                <span className="opacity-60">Account Name:</span>
                <span className="font-bold text-base">{BOOK_CONFIG.payment.accountName}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="opacity-60">Account Number:</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-lg text-[#c4572a]">{BOOK_CONFIG.payment.accountNumber}</span>
                  <button 
                    onClick={handleCopyAccount}
                    className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-xs flex items-center gap-1 opacity-80"
                    title="Copy Account Number"
                  >
                    {copiedAccount ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm opacity-80 leading-relaxed">
              <p>
                Once transferred, send your payment receipt/proof along with your order reference (<strong>{orderSuccess.order_reference}</strong>) to WhatsApp: <strong>{BOOK_CONFIG.payment.whatsappDisplay}</strong> or email <strong>{BOOK_CONFIG.payment.notificationEmail}</strong>.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md font-bold text-sm text-white bg-[#25D366] hover:bg-[#20ba59] transition-colors shadow-md"
              >
                <Send size={18} /> Send Proof on WhatsApp
              </a>
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-6 py-4 rounded-md font-bold text-sm border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Back to Book Page
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // -------------------------------------------------------------
  // Order Form View
  // -------------------------------------------------------------
  return (
    <main className="min-h-screen py-16 px-5 max-w-3xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link 
          href="/book" 
          className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 hover:text-[#c4572a] transition-all"
        >
          <ArrowLeft size={16} /> Back to The Boy and Addictions
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-block px-3 py-1 text-[11px] tracking-[0.2em] uppercase font-bold mb-4 rounded-sm text-white" style={{ background: "var(--rust)" }}>
          Official Order Form
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl mb-3">Order "The Boy and Addictions"</h1>
        <p className="text-base sm:text-lg opacity-75 leading-relaxed font-serif">
          By <strong>Awoke Okechukwu Austin</strong>. Secure your copies directly from the author.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-8 p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10 bg-white dark:bg-[#161616] p-6 sm:p-10 rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
        
        {/* Honeypot field (hidden from real users) */}
        <div className="hidden" aria-hidden="true">
          <label>Website <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
        </div>

        {/* Step 1: Buyer Type (Two large radio buttons) */}
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-4 opacity-70">
            1. Select How You Are Ordering <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option 1: Buying for myself */}
            <label
              className={`flex items-start gap-4 p-5 rounded-lg border-2 cursor-pointer transition-all ${
                orderType === "personal"
                  ? "border-[#c4572a] bg-[#faf5f0] dark:bg-[#231b15]"
                  : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
              }`}
            >
              <input
                type="radio"
                name="order_type"
                value="personal"
                checked={orderType === "personal"}
                onChange={() => setOrderType("personal")}
                className="mt-1 h-5 w-5 text-[#c4572a] focus:ring-[#c4572a]"
              />
              <div>
                <div className="flex items-center gap-2 font-bold text-base mb-1">
                  <User size={18} className="text-[#c4572a]" />
                  <span>I'm buying for myself</span>
                </div>
                <p className="text-xs opacity-75 leading-relaxed">
                  Have copies delivered directly to your doorstep anywhere in Nigeria.
                </p>
              </div>
            </label>

            {/* Option 2: School Outreach Program */}
            <label
              className={`flex items-start gap-4 p-5 rounded-lg border-2 cursor-pointer transition-all ${
                orderType === "outreach"
                  ? "border-[#c4572a] bg-[#faf5f0] dark:bg-[#231b15]"
                  : "border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
              }`}
            >
              <input
                type="radio"
                name="order_type"
                value="outreach"
                checked={orderType === "outreach"}
                onChange={() => setOrderType("outreach")}
                className="mt-1 h-5 w-5 text-[#c4572a] focus:ring-[#c4572a]"
              />
              <div>
                <div className="flex items-center gap-2 font-bold text-base mb-1">
                  <Heart size={18} className="text-rose-500" />
                  <span>I'm supporting the School Outreach Program</span>
                </div>
                <p className="text-xs opacity-75 leading-relaxed">
                  Sponsor copies for young secondary school boys across Nigeria.
                </p>
              </div>
            </label>
          </div>

          {/* Outreach explanation note */}
          <div className="mt-4 p-4 rounded-md bg-black/5 dark:bg-white/5 text-xs leading-relaxed opacity-85 border border-black/5 dark:border-white/5">
            💡 <em>"The price is kept low so students can afford this book. Our School Outreach Program starts in January 2027."</em>
          </div>
        </div>

        {/* Step 2: Contact Details for Everyone */}
        <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
          <h2 className="text-xs uppercase tracking-widest font-bold opacity-70">
            2. Your Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Austin Okechukwu"
                className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-sm focus:border-[#c4572a] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">
                Phone Number (WhatsApp preferred) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 08137862124"
                className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-sm focus:border-[#c4572a] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-sm focus:border-[#c4572a] outline-none transition-colors"
            />
            <p className="text-[11px] opacity-60 mt-1">We will send your order confirmation and invoice to this email.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">
              Number of Copies <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                required
                value={copies}
                onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-32 px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-sm font-bold focus:border-[#c4572a] outline-none transition-colors"
              />
              <span className="text-xs opacity-60">
                {copies > 1 ? "copies" : "copy"}
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Conditional Delivery Section */}
        {orderType === "personal" ? (
          <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-widest font-bold opacity-70">
                3. Delivery Address (Nigeria Only)
              </h2>
              <span className="text-[11px] opacity-60 italic">Delivery outside Nigeria coming soon.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required={orderType === "personal"}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="House/Office number, Street, Area"
                className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-sm focus:border-[#c4572a] outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">
                  City / Town <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required={orderType === "personal"}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Ikeja, Lekki, Enugu"
                  className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-sm focus:border-[#c4572a] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  required={orderType === "personal"}
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-[#161616] text-sm focus:border-[#c4572a] outline-none transition-colors"
                >
                  <option value="">Select your State</option>
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hidden country field */}
            <input type="hidden" name="country" value="Nigeria" />

            <div className="p-3 bg-black/5 dark:bg-white/5 rounded text-xs opacity-75">
              📌 <strong>Delivery fee: confirmed after your order.</strong> Because courier rates vary by state, delivery fee is settled separately and is not added to the total now.
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm leading-relaxed">
            🎓 <strong>School Outreach Program Selected:</strong>
            <p className="mt-1 text-xs opacity-90">
              "These copies will go to students in our School Outreach Program. No delivery to you is needed."
            </p>
          </div>
        )}

        {/* Live Summary */}
        <div className="p-6 rounded-lg bg-[#faf5f0] dark:bg-[#1e1712] border border-[#e5d5c5] dark:border-[#3d2e22]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold opacity-75">Price per copy:</span>
            <div className="flex items-center gap-2">
              {priceInfo.isPrelaunch && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#c4572a] text-white">
                  Prelaunch price
                </span>
              )}
              <span className="font-bold text-base">{priceInfo.formattedPrice}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold opacity-75">Number of copies:</span>
            <span className="font-bold">{validCopies}</span>
          </div>

          <div className="pt-3 border-t border-[#e5d5c5] dark:border-[#3d2e22] flex justify-between items-center">
            <span className="text-base font-serif font-bold">Total Amount:</span>
            <span className="font-serif text-2xl font-bold text-[#c4572a]">
              ₦{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-md font-bold uppercase tracking-[0.15em] text-sm text-white transition-all shadow-md hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--rust)" }}
          >
            {loading ? "Processing Order..." : `Proceed to Order (₦${totalAmount.toLocaleString()})`}
          </button>

          {/* Privacy Note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs opacity-60">
            <ShieldCheck size={14} />
            <span>Your details are kept private and used only to process your order.</span>
          </div>
        </div>
      </form>
    </main>
  );
}
