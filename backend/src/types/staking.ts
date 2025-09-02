/**
 * staking.ts
 * Types for staking PLY tokens and tracking node uptime and rewards
 */

import { TokenReward } from "./tokens";

/**
 * Node staking information
 */
export interface NodeStaking {
  nodeId: string;              // Node identifier
  stakedAmount: number;        // Amount of PLY tokens staked
  lastActive: number;          // Last activity timestamp
  uptimePercentage: number;    // Node uptime (0-1 or 0-100)
  rewardMultiplier?: number;   // Optional reward multiplier based on reliability
  totalRewards?: TokenReward;  // Optional accumulated rewards
}

/**
 * User staking information
 */
export interface UserStaking {
  userId: string;              // User identifier
  stakedAmount: number;        // Amount of PLY tokens staked
  lastActive: number;          // Last activity timestamp
  uptimePercentage: number;    // User node uptime or participation %
  rewardMultiplier?: number;   // Optional multiplier
  totalRewards?: TokenReward;  // Optional accumulated rewards
}

/**
 * Optional mapping of node IDs to NodeStaking
 */
export type NodeStakingMap = Record<string, NodeStaking>;

/**
 * Optional mapping of user IDs to UserStaking
 */
export type UserStakingMap = Record<string, UserStaking>;
