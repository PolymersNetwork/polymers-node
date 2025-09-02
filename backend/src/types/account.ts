/**
 * accounts.ts
 * Types for user accounts, wallet associations, and staking information
 */

import { Wallet } from "./wallets";
import { StakingInfo } from "./tokens";
import { TokenReward } from "./tokens";

/**
 * User account representation
 */
export interface Account {
  accountId: string;             // Unique account ID
  userId: string;                // Associated user ID
  username?: string;             // Optional display name
  email?: string;                // Optional email
  wallets?: Wallet[];            // Linked wallets
  stakedTokens?: StakingInfo[];  // Optional staking info
  totalRewards?: TokenReward;    // Cumulative rewards
  createdAt: number;             // Epoch timestamp
  lastActive?: number;           // Last activity timestamp
  isActive?: boolean;            // Account active status
}

/**
 * Optional mapping of account IDs to Account objects
 */
export type AccountMap = Record<string, Account>;
