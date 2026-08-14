const CARDS = [
  {
    badge: "NOT SERIOUS. BUT PROFITABLE.",
    title: "What is USDC TROLL?",
    body: "USDC TROLL is a memecoin built to troll the market. It's not a utility token, it's not a 'serious project' — it's a smug blue troll face that happens to pay you for holding it. Stake your TROLL, earn rewards, and let the rest of crypto keep pretending it has a plan.",
  },
  {
    badge: "BUY. STAKE. SMIRK.",
    title: "How does it work?",
    body: "Simple. You buy TROLL, you stake it, and it earns rewards every block. No lock-ups forcing you to wait, no confusing mechanics, no whitepaper you need a PhD to read. Your tokens work while you sit there looking smug — which, let's be honest, is the entire point.",
  },
  {
    badge: "BECOME THE TROLL",
    title: "Why USDC TROLL?",
    body: "Because boring is expensive. Because the market rewards the loud and the shameless. Because somewhere between a blue troll face and a staking pool, there's a token that actually pays you to have good taste in memes. Buy the troll. Hold the troll. Become the troll.",
  },
];

export default function About() {
  return (
    <div className="w-full">
      <div className="grid gap-4 md:grid-cols-3">
        {CARDS.map((c) => (
          <div
            key={c.title}
            className="glass rounded-2xl p-6 flex flex-col text-left hover:shadow-[0_0_30px_rgba(47,123,255,0.25)] transition"
          >
            <h3 className="text-lg font-bold text-white leading-snug">
              {c.title}
            </h3>
            <p className="mt-3 text-sm text-blue-200/75 leading-relaxed flex-1">
              {c.body}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-cyan-400/10 border border-cyan-400/30 px-3 py-1 text-[11px] font-semibold tracking-wider text-cyan-300 uppercase w-fit">
              {c.badge}
            </span>
          </div>
        ))}
      </div>

      <p className="text-center text-blue-200/70 text-base md:text-lg max-w-2xl mx-auto mt-8">
        The market takes itself way too seriously.
        <span className="text-cyan-300 font-semibold">
          {" "}
          So we made a token that doesn&apos;t.
        </span>
      </p>
    </div>
  );
}
