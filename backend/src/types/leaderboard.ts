/**
 * leaderboard.ts
 * Types for leaderboard tracking and reporting
 */

import { TokenReward } from "./tokens";

/**
 * Leaderboard entry for a Polymers Node
 */
export interface NodeLeaderboardEntry {
  nodeId: string;
  nodeName?: string;
  totalCleanedArea: number;         // m²
  esgScore: number;                 // Normalized ESG score
  totalRewards?: TokenReward;       // Optional cumulative rewards
}

/**
 * Leaderboard entry for a User
 */
export interface UserLeaderboardEntry {
  userId: string;
  username?: string;
  totalCleanedArea: number;         // m²
  esgScore: number;                 // Normalized ESG score
  totalRewards?: TokenReward;       // Optional cumulative rewards
}

/**
 * Aggregated leaderboard
 */
export interface Leaderboard {
  nodes: NodeLeaderboardEntry[];
  users: UserLeaderboardEntry[];
  topNodes: NodeLeaderboardEntry[]; // Top N nodes by score/area
  topUsers: UserLeaderboardEntry[]; // Top N users by score/area
  generatedAt: number;              // Timestamp
}

/**
 * Optional mapping for fast lookup by ID
 */
export type LeaderboardMap<T> = Record<string, T>;
