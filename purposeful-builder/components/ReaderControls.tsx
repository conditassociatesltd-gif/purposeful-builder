"use client";

import { Minus, Plus, Contrast } from "lucide-react";
import { useEffect, useState } from "react";

const sizes = ["reader-small", "reader-medium", "reader-large", "reader-xl"];

export default function ReaderControls() {
  const [sizeIndex, setSizeIndex] = useState(1);
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove(...sizes);
    document.documentElement.classList.add(sizes[sizeIndex]);
  }, [sizeIndex]);

  useEffect(() => {
    document.documentElement.classList.toggle("reader-contrast", contrast);
  }, [contrast]);

  return (
    <div className="inline-flex items-center gap-1 border border-[#c9c1ad] bg-[#fffaf0] text-[#182016] px-2 py-2 shadow-sm">
      <button
        type="button"
        onClick={() => setSizeIndex((s) => Math.max(0, s - 1))}
        className="w-9 h-9 flex items-center justify-center hover:bg-black/5 disabled:opacity-30"
        disabled={sizeIndex === 0}
      >
        <Minus size={15} />
      </button>

      <span className="px-2 text-xs tracking-[0.2em] uppercase">
        {sizeIndex === 0 ? "A−" : sizeIndex === 1 ? "A" : sizeIndex === 2 ? "A+" : "A++"}
      </span>

      <button
        type="button"
        onClick={() => setSizeIndex((s) => Math.min(sizes.length - 1, s + 1))}
        className="w-9 h-9 flex items-center justify-center hover:bg-black/5 disabled:opacity-30"
        disabled={sizeIndex === sizes.length - 1}
      >
        <Plus size={15} />
      </button>

      <div className="w-px h-5 bg-black/15 mx-1" />

      <button
        type="button"
        onClick={() => setContrast((c) => !c)}
        className={`w-9 h-9 flex items-center justify-center ${
          contrast ? "bg-[#2f4a28] text-white" : "hover:bg-black/5"
        }`}
      >
        <Contrast size={15} />
      </button>
    </div>
  );
}