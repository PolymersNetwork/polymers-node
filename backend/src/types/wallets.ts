/**
 * wallets.ts
 * Wallet definitions for Solana, SUI, and other blockchains
 */

/**
 * Generic blockchain wallet
 */
export interface Wallet {
  walletId: string;            // Unique wallet ID
  blockchain: "Solana" | "SUI" | string;
  publicKey: string;           // Public key or address
  privateKey?: string;         // Optional private key (should be securely stored)
  createdAt: number;           // Epoch timestamp
  isActive?: boolean;          // Active status
}

/**
 * Optional mapping of wallet IDs to Wallet objects
 */
export type WalletMap = Record<string, Wallet>;
