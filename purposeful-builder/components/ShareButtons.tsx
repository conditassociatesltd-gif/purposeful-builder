"use client";

import { useEffect, useState } from "react";

export default function ShareButtons() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const shareText = "I highly recommend reading this essay by Austin Okechukwu:";

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + url)}`, '_blank');
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4 mt-8 pt-8 border-t border-black/10 dark:border-white/10">
      <span className="text-xs tracking-[0.25em] uppercase font-bold opacity-60">
        Share
      </span>
      
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <button
          onClick={handleTwitter}
          className="flex-1 md:flex-none px-4 py-3 border border-black/20 dark:border-white/20 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-center"
        >
          Twitter / X
        </button>
        <button
          onClick={handleFacebook}
          className="flex-1 md:flex-none px-4 py-3 border border-black/20 dark:border-white/20 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-center"
        >
          Facebook
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex-1 md:flex-none px-4 py-3 border border-black/20 dark:border-white/20 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-center"
        >
          WhatsApp
        </button>
      </div>
    </div>
  );
}
