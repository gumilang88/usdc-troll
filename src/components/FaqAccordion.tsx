"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is USDC TROLL?",
    a: "USDC TROLL is the memecoin that trolls the market. It's a staking token with a smug troll face — hold it, stake it, and earn rewards just for having great taste in memes.",
  },
  {
    q: "How does staking work?",
    a: "Connect your wallet, enter how much TROLL you want to lock, and confirm the transaction. Your tokens start earning rewards every block. Unstake anytime — if you dare.",
  },
  {
    q: "When do I get my rewards?",
    a: "Rewards accrue every block and can be claimed whenever you want. No lock period, no waiting rooms, no nonsense.",
  },
  {
    q: "Is it safe?",
    a: "The staking pool is non-custodial — your tokens stay yours until you stake, and only you can unstake. Liquidity is locked long-term so there's no rug. Just troll.",
  },
  {
    q: "Why troll?",
    a: "Because normal is boring. Because the market takes itself too seriously. Because somewhere between a blue troll face and a staking pool, there's a token that actually pays you to stay smug.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid gap-3">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`glass rounded-2xl overflow-hidden transition ${
              isOpen ? "shadow-[0_0_24px_rgba(47,123,255,0.2)]" : ""
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
            >
              <span className="font-semibold text-sm text-white">{f.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-cyan-300 shrink-0 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-5 text-sm text-blue-200/75 leading-relaxed">
                {f.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
