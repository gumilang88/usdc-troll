"use client";

import Image from "next/image";
import { ShieldCheck, Lock, TrendingUp } from "lucide-react";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import StakePanel from "@/components/StakePanel";
import CopyButton from "@/components/CopyButton";
import FaqAccordion from "@/components/FaqAccordion";
import Roadmap from "@/components/Roadmap";
import About from "@/components/About";
import { TOKEN_CONTRACT } from "@/lib/chain";

const DEX = "https://radardex.pro/#" + TOKEN_CONTRACT;

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-[#050a1c] text-[#eaf2ff]">
      {/* ---- background blobs ---- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="anim-blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#1e6bff]/30 blur-[120px]" />
        <div className="anim-blob absolute top-40 -right-24 h-96 w-96 rounded-full bg-[#35e0ff]/20 blur-[120px]" style={{ animationDelay: "-6s" }} />
        <div className="anim-blob absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#ff4fd8]/15 blur-[120px]" style={{ animationDelay: "-11s" }} />
        <div className="absolute inset-0 bg-grid opacity-60" />
      </div>

      {/* ---- NAV ---- */}
      <header className="relative z-20 flex items-center justify-between gap-6 px-5 md:px-10 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/troll-token.png"
            alt="USDC TROLL"
            width={40}
            height={40}
            className="rounded-full shadow-[0_0_20px_rgba(53,224,255,0.6)]"
            unoptimized
          />
          <span className="font-[family-name:var(--font-russo-one)] text-lg tracking-wide text-white">
            USDC <span className="text-cyan-300">TROLL</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5">
            {[
              { label: "About", href: "#about" },
              { label: "Stake", href: "#stake" },
              { label: "FAQ", href: "#faq" },
              { label: "Roadmap", href: "#roadmap" },
            ].map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-blue-200/70 hover:text-cyan-300 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <ConnectWalletButton />
        </div>
      </header>

      {/* ---- marquee ticker ---- */}
      <div className="relative z-10 border-y border-blue-400/20 bg-[#0a1228]/60 overflow-hidden py-3">
        <div className="anim-marquee flex whitespace-nowrap w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center gap-8 shrink-0 pr-8">
              {["HOLD THE TROLL", "EARN WHILE YOU TROLL", "STAY SMUG", "TROLL THE MARKET", "BUY. STAKE. SMIRK."].map((t, i) => (
                <span key={t} className="flex items-center gap-3 text-sm font-bold text-cyan-200/80">
                  <span>{t}</span>
                  <span className="text-yellow-300">$TROLL</span>
                  {i % 2 === 0 && <span className="text-pink-400">👌</span>}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---- HERO ---- */}
      <section className="relative z-10 flex flex-col items-center px-5 pt-6 pb-10 text-center">
        <span className="anim-glitch font-[family-name:var(--font-russo-one)] text-sm md:text-base text-cyan-300 tracking-widest">
          THE MEMECOIN THAT TROLLS THE MARKET
        </span>

        <h1 className="font-[family-name:var(--font-russo-one)] text-5xl md:text-7xl font-black leading-none mt-4 text-white">
          USDC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2f7bff] via-[#35e0ff] to-[#ff4fd8]">TROLL</span>
        </h1>

        <p className="mt-4 max-w-xl text-blue-200/80 text-base md:text-lg">
          Stake your TROLL. Earn while you troll. Stay smug with the smuggest
          face in crypto.
        </p>

        {/* troll face */}
        <div className="relative mt-8">
          <div className="anim-glow absolute inset-0 rounded-full bg-[#35e0ff]/30 blur-[60px]" />
          <Image
            src="/images/troll-face.png"
            alt="USDC TROLL face"
            width={280}
            height={280}
            className="anim-float relative z-10 mx-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            unoptimized
          />
        </div>

        {/* ---- ABOUT ---- */}
        <div id="about" className="mt-12 w-full max-w-5xl mx-auto scroll-mt-24">
          <About />
        </div>

        {/* contract */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5">
          <span className="text-xs font-mono text-cyan-200/80 bg-white/5 rounded-lg px-4 py-2 break-all max-w-full">
            {TOKEN_CONTRACT}
          </span>
          <CopyButton value={TOKEN_CONTRACT} />
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={DEX}
            target="_blank"
            rel="noreferrer"
            className="anim-shimmer rounded-xl px-7 py-3.5 text-sm font-bold bg-gradient-to-r from-[#2f7bff] via-[#35e0ff] to-[#2f7bff] text-white shadow-[0_0_28px_rgba(47,123,255,0.5)] hover:shadow-[0_0_44px_rgba(53,224,255,0.7)] transition-all"
          >
            BUY TROLL
          </a>
          <a
            href="#stake"
            className="rounded-xl px-7 py-3.5 text-sm font-bold border border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 transition"
          >
            STAKE NOW
          </a>
        </div>
      </section>

      {/* ---- STAKING ---- */}
      <section id="stake" className="relative z-10 max-w-2xl mx-auto px-5 py-16 w-full">
        <div className="text-center mb-8">
          <h2 className="font-[family-name:var(--font-russo-one)] text-3xl md:text-4xl font-black text-white">
            STAKE <span className="text-cyan-300">TROLL</span>
          </h2>
          <p className="mt-2 text-blue-200/70">
            Lock it. Earn it. Troll on.
          </p>
        </div>
        <StakePanel apr="780%" />
      </section>

      {/* ---- stats / features ---- */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: TrendingUp, t: "Earn Every Block", d: "Rewards accrue continuously — claim anytime." },
            { icon: ShieldCheck, t: "Non-Custodial", d: "Your tokens, your keys. Only you unstake." },
            { icon: Lock, t: "Liquidity Locked", d: "Pool locked long-term. No rug, just troll." },
          ].map((f) => (
            <div key={f.t} className="glass rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(47,123,255,0.25)] transition">
              <div className="flex items-center gap-3 mb-3">
                <f.icon className="w-6 h-6 text-cyan-300" />
                <h3 className="font-[family-name:var(--font-russo-one)] text-sm text-white">{f.t}</h3>
              </div>
              <p className="text-sm text-blue-200/70">{f.d}</p>
            </div>
          ))}
        </div>

        {/* ---- FAQ ---- */}
        <div id="faq" className="mt-10 scroll-mt-24">
          <h3 className="font-[family-name:var(--font-russo-one)] text-2xl font-black text-white text-center mb-6">
            FAQ
          </h3>
          <FaqAccordion />
        </div>

        {/* ---- ROADMAP ---- */}
        <div id="roadmap" className="mt-16 scroll-mt-24">
          <h3 className="font-[family-name:var(--font-russo-one)] text-2xl font-black text-white text-center mb-6">
            ROADMAP
          </h3>
          <Roadmap />
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="relative z-10 border-t border-blue-400/15 py-10 text-center flex flex-col items-center gap-4">
        {/* X logo button */}
        <a
          href="https://x.com/usdctroll"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-cyan-400/30 hover:bg-cyan-400/15 transition"
          aria-label="USDC TROLL on X"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <p className="text-sm text-blue-200/60">
          USDC TROLL © 2026 — Not financial advice, just financial trolling.
        </p>
        <p className="text-xs text-blue-200/40">
          Always do your own research. Or don&apos;t. The troll doesn&apos;t care.
        </p>
      </footer>
    </main>
  );
}
