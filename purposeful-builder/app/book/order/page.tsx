"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, AlertCircle, ShieldCheck, Heart, User, Send, Copy, Check, Loader2 } from "lucide-react";
import { BOOK_CONFIG, NIGERIAN_STATES, getCurrentPriceInfo } from "@/lib/book-config";

export default function OrderBookPage() {
  const [orderType, setOrderType] = useState<"personal" | "outreach">("personal");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  // Copies as string so user can clear/backspace and type any number freely
  const [copiesInput, setCopiesInput] = useState<string>("1");
  
  // Delivery address fields (Personal only)
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  
  // Honeypot for bot prevention
  const [honeypot, setHoneypot] = useState("");

  // Submission state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Dynamic pricing calculation
  const priceInfo = getCurrentPriceInfo();
  const parsedCopies = parseInt(copiesInput, 10);
  const validCopies = isNaN(parsedCopies) || parsedCopies < 1 ? 1 : parsedCopies;
  const totalAmount = validCopies * priceInfo.unitPrice;

  // Quantity stepper handlers
  const handleDecrement = () => {
    const current = parseInt(copiesInput, 10) || 1;
    const next = Math.max(1, current - 1);
    setCopiesInput(next.toString());
  };

  const handleIncrement = () => {
    const current = parseInt(copiesInput, 10) || 0;
    setCopiesInput((current + 1).toString());
  };

  const handleCopiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Keep only numbers or empty string
    const sanitized = e.target.value.replace(/[^0-9]/g, "");
    setCopiesInput(sanitized);
  };

  const handleCopiesBlur = () => {
    const num = parseInt(copiesInput, 10);
    if (isNaN(num) || num < 1) {
      setCopiesInput("1");
    }
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(BOOK_CONFIG.payment.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation checks with clear messages
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!phone.trim() || phone.trim().length < 6) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (validCopies < 1) {
      setErrorMessage("Please order at least 1 copy.");
      return;
    }

    if (orderType === "personal") {
      if (!street.trim()) {
        setErrorMessage("Please enter your delivery street address.");
        return;
      }
      if (!city.trim()) {
        setErrorMessage("Please enter your delivery city or town.");
        return;
      }
      if (!state) {
        setErrorMessage("Please select your state from the dropdown.");
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_type: orderType,
          full_name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          copies: validCopies,
          street: orderType === "personal" ? street.trim() : null,
          city: orderType === "personal" ? city.trim() : null,
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
      console.error("Order submit error:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Pending Payment / Order Validation View
  // -------------------------------------------------------------
  if (orderSuccess) {
    const isPersonal = orderSuccess.order_type === "personal";
    const waText = `Hello Austin, I have made the bank transfer of ₦${orderSuccess.total_amount?.toLocaleString()} for my book order (${orderSuccess.order_reference}). Here is my proof of payment to validate and confirm my order:`;
    const whatsappUrl = `https://wa.me/${BOOK_CONFIG.payment.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    return (
      <main className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="border p-6 sm:p-10 md:p-12 bg-white dark:bg-[#161616] rounded-xl shadow-lg border-black/10 dark:border-white/10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Clock size={15} className="shrink-0 animate-pulse" /> Pending Payment Validation
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-black dark:text-white mb-2">
            Pay to Validate & Confirm Order
          </h1>
          
          <p className="text-sm sm:text-base opacity-80 mb-6">
            Hello <strong className="text-black dark:text-white">{orderSuccess.full_name}</strong>, your order request has been received. Your order is <strong className="text-amber-600 dark:text-amber-400">not yet confirmed</strong>—payment is required to validate and officially confirm your order.
          </p>

          {/* Validation Alert Banner */}
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm mb-6 leading-relaxed">
            ⚠️ <strong>Payment Validates Your Order:</strong> Please make the bank transfer of <strong>₦{orderSuccess.total_amount?.toLocaleString()}</strong> below and submit your payment receipt. Once verified by the author, your order is officially confirmed.
          </div>

          {/* Reference & Order Summary Box */}
          <div className="bg-black/5 dark:bg-white/5 p-5 sm:p-6 rounded-lg mb-6 border border-black/5 dark:border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
              <div>
                <span className="text-xs uppercase tracking-widest opacity-60">Reserved Order Reference</span>
                <p className="font-mono text-xl sm:text-2xl font-bold text-[#c4572a]">{orderSuccess.order_reference}</p>
              </div>
              <div className="sm:text-right">
                <span className="text-xs uppercase tracking-widest opacity-60">Amount Required</span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-black dark:text-white">₦{orderSuccess.total_amount?.toLocaleString()}</p>
              </div>
            </div>

            <div className="pt-4 text-xs sm:text-sm space-y-1.5 opacity-80">
              <p>
                <strong>Order Type:</strong> {isPersonal ? "Personal Copy" : "School Outreach Program Support"}
              </p>
              <p>
                <strong>Copies:</strong> {orderSuccess.copies} @ ₦{orderSuccess.unit_price?.toLocaleString()} each
              </p>
              {isPersonal && orderSuccess.state && (
                <p>
                  <strong>Delivery To:</strong> {orderSuccess.street}, {orderSuccess.city}, {orderSuccess.state}
                </p>
              )}
            </div>
          </div>

          {/* Delivery or Outreach Note */}
          <div className="mb-6 p-4 rounded-lg bg-[#faf5f0] dark:bg-[#201c18] border border-[#e5d5c5] dark:border-[#3d3228] text-xs sm:text-sm">
            {isPersonal ? (
              <p className="text-stone-800 dark:text-stone-200">
                📦 <strong>Delivery Note:</strong> Delivery fee will be confirmed by Austin after payment validation.
              </p>
            ) : (
              <p className="text-emerald-800 dark:text-emerald-200">
                🎓 <strong>Outreach Note:</strong> Thank you for supporting our School Outreach Program. Your sponsored copies will reach students starting in January 2027.
              </p>
            )}
          </div>

          {/* Bank Payment Instructions */}
          <div className="border border-black/10 dark:border-white/10 p-5 sm:p-8 rounded-lg mb-6 bg-black/[0.02] dark:bg-white/[0.02]">
            <h3 className="font-serif text-xl sm:text-2xl mb-1">Make Bank Transfer</h3>
            <p className="text-xs sm:text-sm opacity-75 mb-5">
              Transfer exactly <strong className="text-black dark:text-white">₦{orderSuccess.total_amount?.toLocaleString()}</strong> to the author's bank account:
            </p>

            <div className="space-y-3 sm:space-y-4 text-sm bg-white dark:bg-[#121212] p-4 sm:p-5 rounded-md border border-black/10 dark:border-white/10">
              <div className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5">
                <span className="opacity-60 text-xs sm:text-sm">Bank:</span>
                <span className="font-bold text-sm sm:text-base">{BOOK_CONFIG.payment.bankName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5">
                <span className="opacity-60 text-xs sm:text-sm">Account Name:</span>
                <span className="font-bold text-sm sm:text-base text-right">{BOOK_CONFIG.payment.accountName}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="opacity-60 text-xs sm:text-sm">Account Number:</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="font-mono font-bold text-base sm:text-lg text-[#c4572a]">{BOOK_CONFIG.payment.accountNumber}</span>
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

            <div className="mt-5 text-xs sm:text-sm opacity-85 leading-relaxed bg-amber-500/5 p-4 rounded border border-amber-500/20">
              <p>
                <strong>Final Step to Validate:</strong> After transferring, click below to submit your payment receipt with your order reference (<strong>{orderSuccess.order_reference}</strong>) on WhatsApp or reply to your email invoice.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20ba59] transition-colors shadow-md"
              >
                <Send size={18} /> Send Proof of Payment to Validate Order
              </a>
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-md font-bold text-xs sm:text-sm border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Back to Book
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
    <main className="min-h-screen py-10 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Back button */}
      <div className="mb-6 sm:mb-8">
        <Link 
          href="/book" 
          className="inline-flex items-center gap-2 text-xs sm:text-sm opacity-70 hover:opacity-100 hover:text-[#c4572a] transition-all"
        >
          <ArrowLeft size={16} /> Back to The Boy and Addictions
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8 text-left">
        <div className="inline-block px-3 py-1 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-bold mb-3 rounded-sm text-white" style={{ background: "var(--rust)" }}>
          Official Order Form
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl mb-2">Order "The Boy and Addictions"</h1>
        <p className="text-sm sm:text-base opacity-75 leading-relaxed font-serif">
          By <strong>Awoke Okechukwu Austin</strong>. Secure your copies directly from the author.
        </p>
      </div>

      {/* Top Error Alert */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
          ⚠️ {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10 bg-white dark:bg-[#161616] p-5 sm:p-8 md:p-10 rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
        
        {/* Honeypot field (hidden from real users) */}
        <div className="hidden" aria-hidden="true">
          <label>Website <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" /></label>
        </div>

        {/* Step 1: Buyer Type (Two large radio buttons) */}
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-3 opacity-70">
            1. Select How You Are Ordering <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Option 1: Buying for myself */}
            <label
              className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border-2 cursor-pointer transition-all ${
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
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base mb-1">
                  <User size={18} className="text-[#c4572a] shrink-0" />
                  <span>I'm buying for myself</span>
                </div>
                <p className="text-xs opacity-75 leading-relaxed">
                  Have copies delivered directly to your doorstep in Nigeria.
                </p>
              </div>
            </label>

            {/* Option 2: School Outreach Program */}
            <label
              className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border-2 cursor-pointer transition-all ${
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
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base mb-1">
                  <Heart size={18} className="text-rose-500 shrink-0" />
                  <span>I'm supporting the School Outreach Program</span>
                </div>
                <p className="text-xs opacity-75 leading-relaxed">
                  Sponsor copies for students in our upcoming school outreach.
                </p>
              </div>
            </label>
          </div>

          {/* Outreach explanation note */}
          <div className="mt-3.5 p-3.5 sm:p-4 rounded-md bg-black/5 dark:bg-white/5 text-xs leading-relaxed opacity-85 border border-black/5 dark:border-white/5">
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
                className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-base focus:border-[#c4572a] outline-none transition-colors"
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
                className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-base focus:border-[#c4572a] outline-none transition-colors"
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
              className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-base focus:border-[#c4572a] outline-none transition-colors"
            />
            <p className="text-[11px] opacity-60 mt-1">We will send your order confirmation and invoice to this email.</p>
          </div>

          {/* Number of Copies with Touch Stepper */}
          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">
              Number of Copies <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
                className="w-12 h-12 flex items-center justify-center rounded-md border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-xl font-bold hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all select-none"
              >
                −
              </button>

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                value={copiesInput}
                onChange={handleCopiesChange}
                onBlur={handleCopiesBlur}
                className="w-24 text-center py-2.5 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-lg font-bold focus:border-[#c4572a] outline-none transition-colors"
              />

              <button
                type="button"
                onClick={handleIncrement}
                aria-label="Increase quantity"
                className="w-12 h-12 flex items-center justify-center rounded-md border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-xl font-bold hover:bg-black/10 dark:hover:bg-white/10 active:scale-95 transition-all select-none"
              >
                +
              </button>

              <span className="text-xs sm:text-sm opacity-70 ml-2 font-medium">
                {validCopies > 1 ? "copies" : "copy"}
              </span>
            </div>
            <p className="text-[11px] opacity-60 mt-1">Tap + / − or type any quantity.</p>
          </div>
        </div>

        {/* Step 3: Conditional Delivery Section */}
        {orderType === "personal" ? (
          <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
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
                className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-base focus:border-[#c4572a] outline-none transition-colors"
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
                  className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-transparent text-base focus:border-[#c4572a] outline-none transition-colors"
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
                  className="w-full px-4 py-3 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-[#161616] text-base focus:border-[#c4572a] outline-none transition-colors"
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
              📌 <strong>Delivery fee: confirmed after your order.</strong> Because courier rates vary across states, the delivery fee is confirmed separately and is not added to the total now.
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm leading-relaxed">
            🎓 <strong>School Outreach Program Selected:</strong>
            <p className="mt-1 text-xs opacity-90">
              "These copies will go to students in our School Outreach Program. No delivery to you is needed."
            </p>
          </div>
        )}

        {/* Live Summary */}
        <div className="p-5 sm:p-6 rounded-lg bg-[#faf5f0] dark:bg-[#1e1712] border border-[#e5d5c5] dark:border-[#3d2e22]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-semibold opacity-75">Price per copy:</span>
            <div className="flex items-center gap-2">
              {priceInfo.isPrelaunch && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#c4572a] text-white">
                  Prelaunch price
                </span>
              )}
              <span className="font-bold text-sm sm:text-base">{priceInfo.formattedPrice}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="text-xs sm:text-sm font-semibold opacity-75">Number of copies:</span>
            <span className="font-bold text-sm sm:text-base">{validCopies}</span>
          </div>

          <div className="pt-3 border-t border-[#e5d5c5] dark:border-[#3d2e22] flex justify-between items-center">
            <span className="text-sm sm:text-base font-serif font-bold">Total Amount:</span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#c4572a]">
              ₦{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Bottom Error Alert (Visible right above the button on mobile) */}
        {errorMessage && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-md font-bold uppercase tracking-[0.15em] text-sm text-white transition-all shadow-md hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ background: "var(--rust)" }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Processing Order...
              </>
            ) : (
              `Proceed to Order (₦${totalAmount.toLocaleString()})`
            )}
          </button>

          {/* Privacy Note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs opacity-60 text-center">
            <ShieldCheck size={14} className="shrink-0" />
            <span>Your details are kept private and used only to process your order.</span>
          </div>
        </div>
      </form>
    </main>
  );
}
