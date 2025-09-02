/**
 * data.ts
 * In-memory data storage for Polymers Node backend
 * Used for development, testing, and temporary caching
 */

import { ScanMap } from "./types/scan";
import { ESGMap, ESGMetric } from "./types/esg";
import { NodeBalanceMap, UserBalanceMap } from "./types/balance";
import { UserMap } from "./types/users";
import { TokenReward } from "./types/tokens";

/** Scan results indexed by scanId */
export const scans: ScanMap = {};

/** ESG metrics indexed by nodeId */
export const esgMetrics: ESGMap = {};

/** Node balances indexed by nodeId */
export const nodeBalances: NodeBalanceMap = {};

/** User balances indexed by userId */
export const userBalances: UserBalanceMap = {};

/** Registered users indexed by userId */
export const users: UserMap = {};

/** Utility to add a reward to a user's balance */
export function addUserReward(userId: string, reward: TokenReward) {
  if (!userBalances[userId]) {
    userBalances[userId] = { userId, balances: [], totalRewards: reward };
  } else {
    const existing = userBalances[userId].totalRewards!;
    existing.reco += reward.reco;
    existing.crt += reward.crt;
    existing.ply += reward.ply;
    existing.daoBonus = (existing.daoBonus || 0) + (reward.daoBonus || 0);
  }
}

/** Utility to add a reward to a node's balance and update ESG metrics */
export function addNodeReward(nodeId: string, reward: TokenReward) {
  if (!nodeBalances[nodeId]) {
    nodeBalances[nodeId] = { nodeId, balances: [], totalRewards: reward };
  } else {
    const existing = nodeBalances[nodeId].totalRewards!;
    existing.reco += reward.reco;
    existing.crt += reward.crt;
    existing.ply += reward.ply;
    existing.daoBonus = (existing.daoBonus || 0) + (reward.daoBonus || 0);
  }

  // Update ESG metric automatically
  const cleanedArea = (reward.reco + reward.crt + reward.ply) * 0.1; // Example conversion
  const score = Math.min(100, cleanedArea / 10); // Example normalized score (0-100)

  const metric: ESGMetric = {
    nodeId,
    cleanedArea,
    score,
    timestamp: Date.now(),
  };

  esgMetrics[nodeId] = metric;
}
