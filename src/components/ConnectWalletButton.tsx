"use client";

import { useEffect, useState, useCallback } from "react";
import { type Eip1193Provider } from "ethers";
import { CHAIN } from "@/lib/chain";

type EthereumProvider = Eip1193Provider & {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

function getProvider(): EthereumProvider | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { ethereum?: EthereumProvider };
  return w.ethereum ?? null;
}

export default function ConnectWalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [chainOk, setChainOk] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const short = (a: string) =>
    a.length > 12 ? `${a.slice(0, 6)}...${a.slice(-4)}` : a;

  const sync = useCallback(async () => {
    const p = getProvider();
    if (!p) return;
    try {
      const accs = (await p.request({ method: "eth_accounts" })) as string[];
      if (accs.length) setAccount(accs[0]);
      const cid = (await p.request({ method: "eth_chainId" })) as string;
      setChainOk(parseInt(cid, 16) === CHAIN.id);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    sync();
    const p = getProvider();
    if (!p) return;
    const ep = p as unknown as {
      on?: (e: string, cb: () => void) => void;
      removeListener?: (e: string, cb: () => void) => void;
    };
    ep.on?.("accountsChanged", sync);
    ep.on?.("chainChanged", sync);
    return () => {
      ep.removeListener?.("accountsChanged", sync);
      ep.removeListener?.("chainChanged", sync);
    };
  }, [sync]);

  const connect = async () => {
    const p = getProvider();
    if (!p) {
      alert("No wallet detected. Install MetaMask or Rabby first.");
      return;
    }
    setConnecting(true);
    try {
      const accs = (await p.request({ method: "eth_requestAccounts" })) as string[];
      setAccount(accs[0] ?? null);
      try {
        await p.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN.chainIdHex }],
        });
      } catch (e) {
        if ((e as { code?: number }).code === 4902) {
          await p.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: CHAIN.chainIdHex,
                chainName: CHAIN.name,
                nativeCurrency: CHAIN.nativeCurrency,
                rpcUrls: CHAIN.rpcUrls,
                blockExplorerUrls: CHAIN.blockExplorerUrls,
              },
            ],
          });
        } else throw e;
      }
      setChainOk(true);
    } catch (err) {
      console.error(err);
      alert("Connect failed: " + (err as Error).message);
    } finally {
      setConnecting(false);
    }
  };

  if (!account) {
    return (
      <button
        onClick={connect}
        disabled={connecting}
        className="rounded-xl px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-[#2f7bff] to-[#35e0ff] text-white shadow-[0_0_24px_rgba(47,123,255,0.5)] hover:shadow-[0_0_36px_rgba(53,224,255,0.7)] transition-all"
      >
        {connecting ? "Connecting…" : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        className="rounded-xl px-4 py-2.5 text-sm font-bold bg-white/10 border border-cyan-400/30 text-cyan-200"
        title={account}
      >
        {short(account)}
      </button>
      {!chainOk && (
        <span className="text-[11px] font-semibold text-pink-400">
          ⚠ Switch to {CHAIN.name}
        </span>
      )}
    </div>
  );
}
