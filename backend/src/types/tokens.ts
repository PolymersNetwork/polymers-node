/**
 * tokens.ts
 * Types for token rewards, staking, and NFT/ESG metadata
 */

/**
 * Represents a generic blockchain token
 */
export interface RewardToken {
  symbol: "RECO" | "CRT" | "PLY" | string; // Token symbol
  amount: number;                          // Token amount
  decimals?: number;                        // Optional decimal places
}

/**
 * Token rewards distributed per event or node
 */
export interface TokenReward {
  reco: number;         // RECO token amount
  crt: number;          // CRT token amount
  ply: number;          // PLY token amount
  daoBonus?: number;    // Optional DAO bonus applied
  timestamp?: number;   // Reward calculation timestamp
  nodeId?: string;      // Node ID associated with reward
}

/**
 * Node staking information
 */
export interface StakingInfo {
  nodeId: string;           // Node identifier
  stakedAmount: number;     // Amount staked by node
  lastActive: number;       // Last activity timestamp
  uptimePercentage: number; // Node uptime %
  rewardMultiplier?: number; // Optional reward multiplier based on reliability
}

/**
 * NFT metadata for on-chain digital twin representation
 */
export interface NFTMetadata {
  name: string;                         // NFT name/title
  description: string;                  // NFT description
  image: string;                        // URL or base64 image
  attributes?: Record<string, any>;     // Optional key-value attributes
  tokenId?: string;                     // Blockchain token ID after mint
  blockchain?: "Solana" | "SUI";       // Blockchain network
}

/**
 * ESG / environmental metric per node
 */
export interface ESGMetric {
  nodeId: string;           // Node identifier
  cleanedArea: number;      // Area cleaned in m²
  score: number;            // Normalized ESG score
  timestamp?: number;       // Metric timestamp
}
