/**
 * rewards.ts
 * Token rewards, staking, NFT, and ESG integration for Polymers Node
 */

import { TokenReward, StakingInfo, NFTMetadata, ESGMetric } from "./tokens";

/**
 * Reward execution per event or node
 */
export interface RewardExecution {
  nodeId: string;
  userId?: string;
  rewards: TokenReward;
  nft?: NFTMetadata;        // Minted NFT metadata for digital twin
  esgMetric?: ESGMetric;    // ESG metric generated
  timestamp: number;
}

/**
 * Aggregated rewards summary for a node or user
 */
export interface RewardSummary {
  totalRewards: TokenReward;
  daoBonusApplied?: number;
  stakingMultiplier?: number;
  timestamp?: number;
}

/**
 * Optional mapping of node IDs or user IDs to reward summaries
 */
export type RewardMap = Record<string, RewardSummary>;
