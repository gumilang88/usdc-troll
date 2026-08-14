// ============================================================
//  CHAIN + TOKEN CONFIG — ganti di sini saja
// ============================================================
export const CHAIN = {
  id: 5042,
  chainIdHex: "0x13b2",
  name: "ARC Mainnet",
  network: "arc-mainnet",
  nativeCurrency: { name: "ARC", symbol: "ARC", decimals: 18 },
  rpcUrls: ["https://arc-mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8"],
  blockExplorerUrls: ["https://arc.exploreme.pro"],
} as const;

export const RPC_URL = CHAIN.rpcUrls[0];

// Token staking (ERC-20)
export const TOKEN_CONTRACT =
  "0x0000000000000000000000000000000000000000" as const; // ganti address

// Wallet tujuan saat user stake
export const RECIPIENT_WALLET =
  "0x0000000000000000000000000000000000000000" as const; // ganti wallet

export const TOKEN_TICKER = "TROLL";
export const TOKEN_NAME = "USDC TROLL";
