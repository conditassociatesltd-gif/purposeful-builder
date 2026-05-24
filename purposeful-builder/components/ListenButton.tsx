"use client";

import { Volume2, Square } from "lucide-react";
import { useState } from "react";

export default function ListenButton({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false);

  function toggleListen() {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => setPlaying(false);

    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  }

  return (
    <button
      onClick={toggleListen}
      className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase border px-4 py-3"
      style={{ borderColor: "rgba(17,17,15,0.2)" }}
    >
      {playing ? <Square size={14} /> : <Volume2 size={14} />}
      {playing ? "Stop listening" : "Listen to essay"}
    </button>
  );
}