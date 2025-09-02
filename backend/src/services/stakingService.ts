/**
 * stakingService.ts
 * Node and user staking, uptime tracking, reward multiplier calculation
 */

import { NodeStakingMap, NodeStaking, UserStakingMap, UserStaking } from "../types/staking";

export class StakingService {
  private nodeStakes: NodeStakingMap = {};
  private userStakes: UserStakingMap = {};

  /** Update node uptime and recalculate multiplier */
  updateNodeStake(nodeId: string, stakedAmount: number, uptime: number): NodeStaking {
    const multiplier = uptime > 0.95 ? 1.1 : 1.0;
    const stake: NodeStaking = { nodeId, stakedAmount, lastActive: Date.now(), uptimePercentage: uptime, rewardMultiplier: multiplier };
    this.nodeStakes[nodeId] = stake;
    return stake;
  }

  /** Update user staking info */
  updateUserStake(userId: string, stakedAmount: number, uptime: number): UserStaking {
    const multiplier = uptime > 0.95 ? 1.1 : 1.0;
    const stake: UserStaking = { userId, stakedAmount, lastActive: Date.now(), uptimePercentage: uptime, rewardMultiplier: multiplier };
    this.userStakes[userId] = stake;
    return stake;
  }

  /** Get node stake */
  getNodeStake(nodeId: string): NodeStaking | undefined {
    return this.nodeStakes[nodeId];
  }

  /** Get user stake */
  getUserStake(userId: string): UserStaking | undefined {
    return this.userStakes[userId];
  }
}
