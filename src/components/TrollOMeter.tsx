"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

const VERDICTS: { min: number; label: string; emoji: string }[] = [
  { min: 90, label: "Certified Troll. The market fears you.", emoji: "👹" },
  { min: 70, label: "Proffessional shitposter. Respect.", emoji: "🤡" },
  { min: 50, label: "Mid-tier troll. Keep going.", emoji: "😏" },
  { min: 30, label: "Amateur. You need more practice.", emoji: "🙄" },
  { min: 0, label: "Too nice. Go shake someone down.", emoji: "🥺" },
];

export default function TrollOMeter() {
  const [score, setScore] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    // animasi: muter cepat 0-100 selama 1.2s, berhenti di nilai random
    const target = Math.floor(Math.random() * 101);
    let step = 0;
    const total = 14;
    const id = setInterval(() => {
      step += 1;
      setScore(Math.floor(Math.random() * 101));
      if (step >= total) {
        clearInterval(id);
        setScore(target);
        setRolling(false);
      }
    }, 85);
  };

  const verdict = score !== null
    ? (VERDICTS.find((v) => score >= v.min) ?? VERDICTS[VERDICTS.length - 1])
    : null;

  return (
    <div className="glass rounded-2xl p-6 md:p-8 w-full text-center">
      <h3 className="font-[family-name:var(--font-russo-one)] text-xl md:text-2xl font-black text-white">
        HOW MUCH OF A <span className="text-cyan-300">TROLL</span> ARE YOU?
      </h3>
      <p className="mt-2 text-sm text-blue-200/70">
        Click the button. Face the truth.
      </p>

      {/* score display */}
      <div className="mt-8 flex flex-col items-center">
        <div
          className={`relative w-40 h-40 rounded-full border-4 ${
            score === null
              ? "border-blue-400/30"
              : score >= 70
              ? "border-cyan-300 shadow-[0_0_40px_rgba(53,224,255,0.5)]"
              : score >= 40
              ? "border-blue-400/60 shadow-[0_0_30px_rgba(47,123,255,0.4)]"
              : "border-blue-400/30"
          } transition-all duration-300 flex items-center justify-center`}
        >
          <span
            className={`font-[family-name:var(--font-russo-one)] text-4xl font-black ${
              score === null ? "text-blue-200/30" : "text-white anim-glitch"
            }`}
          >
            {score === null ? "?" : `${score}%`}
          </span>
        </div>

        {verdict && (
          <p className="mt-5 text-lg font-semibold text-blue-200/90">
            {verdict.emoji} {verdict.label}
          </p>
        )}
      </div>

      <button
        onClick={roll}
        disabled={rolling}
        className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold bg-gradient-to-r from-[#2f7bff] via-[#35e0ff] to-[#2f7bff] text-white shadow-[0_0_28px_rgba(47,123,255,0.5)] hover:shadow-[0_0_44px_rgba(53,224,255,0.7)] disabled:opacity-60 transition-all"
      >
        <RefreshCw className={`w-4 h-4 ${rolling ? "animate-spin" : ""}`} />
        {rolling ? "ROLLING..." : score === null ? "ROLL THE TRUTH" : "TROLL AGAIN"}
      </button>
    </div>
  );
}