"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);

    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-md border border-black/15 dark:border-white/20 text-stone-800 dark:text-stone-200 hover:text-[#c4572a] dark:hover:text-[#c4572a] hover:border-[#c4572a] dark:hover:border-[#c4572a] bg-black/[0.04] dark:bg-white/[0.06] transition-all cursor-pointer ${className}`}
      aria-label="Toggle dark / light mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mounted ? (
        dark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-stone-700 dark:text-stone-300" />
      ) : (
        <span className="w-4 h-4" />
      )}
    </button>
  );
}