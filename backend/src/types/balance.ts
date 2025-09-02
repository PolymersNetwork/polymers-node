/**
 * balance.ts
 * Types for tracking token balances across nodes, users, and wallets
 */

import { RewardToken } from "./tokens";

/**
 * Represents a generic token balance
 */
export interface TokenBalance {
  walletId?: string;         // Optional wallet identifier
  nodeId?: string;           // Optional node identifier
  userId?: string;           // Optional user identifier
  token: RewardToken;        // Token and amount
  updatedAt: number;         // Epoch timestamp of last update
}

/**
 * Aggregated balances per node
 */
export interface NodeBalance {
  nodeId: string;
  balances: TokenBalance[];
  totalRewards?: RewardToken; // Optional total rewards
}

/**
 * Aggregated balances per user
 */
export interface UserBalance {
  userId: string;
  balances: TokenBalance[];
  totalRewards?: RewardToken; // Optional total rewards
}

/**
 * Optional mapping of node IDs to NodeBalance
 */
export type NodeBalanceMap = Record<string, NodeBalance>;

/**
 * Optional mapping of user IDs to UserBalance
 */
export type UserBalanceMap = Record<string, UserBalance>;
