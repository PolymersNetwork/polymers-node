/**
 * hooks.ts
 * Reusable hooks / helper functions for Polymers Node backend
 */

import { IoTScanEvent } from "../types/iot";
import { TokenReward } from "../types/tokens";
import { Node } from "../types/node";
import { ESGMetric } from "../types/esg";

/**
 * Hook: calculate total reward from TokenReward object
 */
export function useTotalReward(reward: TokenReward): number {
  const { reco = 0, crt = 0, ply = 0, daoBonus = 0 } = reward;
  return reco + crt + ply + daoBonus;
}

/**
 * Hook: compute uptime multiplier based on node uptime
 */
export function useUptimeMultiplier(node: Node): number {
  const uptime = node.uptimePercentage ?? 0;
  if (uptime >= 95) return 1.2;
  if (uptime >= 90) return 1.1;
  return 1.0;
}

/**
 * Hook: generate ESG contribution from IoT scan event
 */
export function useESGFromScan(scan: IoTScanEvent): ESGMetric {
  const areaPerWeight = 0.1; // Example conversion factor m² per gram
  const scoreMultiplier = scan.contaminationScore != null ? 1 - scan.contaminationScore : 1;

  return {
    nodeId: scan.deviceId,
    cleanedArea: scan.weight * areaPerWeight,
    score: Math.min(100, Math.max(0, 100 * scoreMultiplier)),
    timestamp: scan.timestamp,
  };
}

/**
 * Hook: aggregate rewards for multiple nodes
 */
export function useAggregateRewards(nodes: Node[]): TokenReward {
  return nodes.reduce(
    (acc, node) => {
      if (node.rewards) {
        acc.reco += node.rewards.reco;
        acc.crt += node.rewards.crt;
        acc.ply += node.rewards.ply;
        acc.daoBonus = (acc.daoBonus ?? 0) + (node.rewards.daoBonus ?? 0);
      }
      return acc;
    },
    { reco: 0, crt: 0, ply: 0, daoBonus: 0 } as TokenReward
  );
}

/**
 * Hook: generate summary for real-time dashboard
 */
export function useNodeSummary(nodes: Node[]) {
  const totalNodes = nodes.length;
  const onlineNodes = nodes.filter((n) => n.status === "online").length;
  const offlineNodes = nodes.filter((n) => n.status === "offline").length;
  const maintenanceNodes = nodes.filter((n) => n.status === "maintenance").length;
  const averageUptime =
    nodes.reduce((sum, n) => sum + (n.uptimePercentage ?? 0), 0) / totalNodes;

  return {
    totalNodes,
    onlineNodes,
    offlineNodes,
    maintenanceNodes,
    averageUptime,
  };
}
