const PHASES = [
  {
    phase: "PHASE 1",
    title: "The Smirk",
    items: [
      "Stealth launch, contract live, liquidity locked",
      "Small but toxic community (in the best way)",
      "The troll is born. He is already judging you.",
    ],
  },
  {
    phase: "PHASE 2",
    title: "The Trolling",
    items: [
      "Goes viral on X & Telegram",
      "Staking live + reward farming starts",
      "Mass meme campaign, relentless shitposting",
    ],
  },
  {
    phase: "PHASE 3",
    title: "Full Troll",
    items: [
      "Ecosystem expansion: smug-face NFT collection, troll minigame",
      "Holder-governed decisions",
      "Global domination (satire, but also maybe not)",
    ],
  },
];

export default function Roadmap() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {PHASES.map((p) => (
        <div
          key={p.phase}
          className="glass rounded-2xl p-6 flex flex-col hover:shadow-[0_0_30px_rgba(47,123,255,0.25)] transition"
        >
          <span className="text-xs font-semibold tracking-widest text-cyan-300 uppercase">
            {p.phase}
          </span>
          <h3 className="mt-2 text-xl font-bold text-white">{p.title}</h3>
          <ul className="mt-4 space-y-2.5">
            {p.items.map((it) => (
              <li key={it} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span className="text-sm text-blue-200/75 leading-relaxed">
                  {it}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
