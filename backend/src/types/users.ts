/**
 * users.ts
 * Types for users interacting with Polymers Node
 */

import { Wallet } from "./wallets";
import { TokenReward } from "./tokens";

/**
 * Represents a user profile in the Polymers Node ecosystem
 */
export interface User {
  userId: string;               // Unique identifier for the user
  username: string;             // Display name or username
  email?: string;               // Optional email for notifications
  wallets?: Wallet[];           // Linked blockchain wallets (Solana, SUI, etc.)
  registeredAt: number;         // Unix timestamp of registration
  lastLogin?: number;           // Last login timestamp
  rewards?: TokenReward;        // Aggregated token rewards for the user
  isActive?: boolean;           // Active/inactive status
  role?: "member" | "admin" | "moderator"; // Optional DAO or system role
  tier?: number;                // Optional user tier/level for rewards multipliers
}

/**
 * Mapping of user IDs to User objects
 */
export type UserMap = Record<string, User>;
