"use client";

import { Sun, CloudSun, Moon, Diamond } from "lucide-react";
import { useEffect, useState } from "react";

const sizes = ["reader-small", "reader-medium", "reader-large", "reader-xl"];

export default function ArticleHeaderControls() {
  const [sizeIndex, setSizeIndex] = useState(1);
  const [themeMode, setThemeMode] = useState<"light" | "parchment" | "dark" | "oled">("parchment");

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("article-theme") as "light" | "parchment" | "dark" | "oled";
    if (savedTheme) {
      setThemeMode(savedTheme);
    } else {
      // Check for legacy dark mode
      if (document.documentElement.classList.contains("dark")) {
        setThemeMode("dark");
      }
    }
  }, []);

  // Apply Font Size
  useEffect(() => {
    document.documentElement.classList.remove(...sizes);
    document.documentElement.classList.add(sizes[sizeIndex]);
  }, [sizeIndex]);

  // Apply Theme
  useEffect(() => {
    const root = document.documentElement;
    
    // Reset all
    root.classList.remove("dark", "reader-contrast");

    switch (themeMode) {
      case "light":
        // Light + contrast (pure white)
        root.classList.add("reader-contrast");
        break;
      case "parchment":
        // Default light mode (parchment)
        break;
      case "dark":
        // Default dark mode
        root.classList.add("dark");
        break;
      case "oled":
        // Dark + contrast (pure black)
        root.classList.add("dark", "reader-contrast");
        break;
    }

    localStorage.setItem("article-theme", themeMode);
  }, [themeMode]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-4 border-y border-black/10 dark:border-white/10" style={{ background: "var(--parchment)" }}>
      <div className="flex items-center gap-6">
        {/* Theme Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setThemeMode("light")}
            className={`w-9 h-9 flex items-center justify-center rounded-sm transition-colors ${
              themeMode === "light"
                ? "bg-[var(--rust)] text-white"
                : "border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            aria-label="Pure Light Mode"
          >
            <Sun size={16} />
          </button>
          <button
            onClick={() => setThemeMode("parchment")}
            className={`w-9 h-9 flex items-center justify-center rounded-sm transition-colors ${
              themeMode === "parchment"
                ? "bg-[var(--rust)] text-white"
                : "border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            aria-label="Parchment Mode"
          >
            <CloudSun size={16} />
          </button>
          <button
            onClick={() => setThemeMode("dark")}
            className={`w-9 h-9 flex items-center justify-center rounded-sm transition-colors ${
              themeMode === "dark"
                ? "bg-[var(--rust)] text-white"
                : "border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            aria-label="Dark Mode"
          >
            <Moon size={16} />
          </button>
          <button
            onClick={() => setThemeMode("oled")}
            className={`w-9 h-9 flex items-center justify-center rounded-sm transition-colors ${
              themeMode === "oled"
                ? "bg-[var(--rust)] text-white"
                : "border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
            aria-label="OLED Dark Mode"
          >
            <Diamond size={16} />
          </button>
        </div>

        <div className="w-px h-5 bg-black/20 dark:bg-white/20" />

        {/* Font Size Toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSizeIndex((s) => Math.max(0, s - 1))}
            className="flex items-center justify-center font-serif font-bold opacity-60 hover:opacity-100 transition-opacity"
            disabled={sizeIndex === 0}
            aria-label="Decrease Font Size"
          >
            A-
          </button>
          <button
            onClick={() => setSizeIndex((s) => Math.min(sizes.length - 1, s + 1))}
            className="flex items-center justify-center font-serif font-bold opacity-60 hover:opacity-100 transition-opacity"
            disabled={sizeIndex === sizes.length - 1}
            aria-label="Increase Font Size"
          >
            A+
          </button>
        </div>
      </div>
    </div>
  );
}
