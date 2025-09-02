/**
 * node.ts
 * Types for DePIN node information, status, uptime, staking, and device orchestration
 */

import { Device } from "./iot";
import { StakingInfo } from "./tokens";
import { ESGMetric } from "./esg";
import { RewardSummary } from "./rewards";

/**
 * Represents a Polymers Node in the network
 */
export interface Node {
  nodeId: string;                       // Unique node identifier
  nodeName?: string;                     // Optional human-readable name
  status: "online" | "offline" | "maintenance";
  lastActive: number;                    // Epoch timestamp
  uptimePercentage: number;              // Node uptime %
  devices: Device[];                     // Devices managed by this node
  staking?: StakingInfo;                 // Optional staking info
  lastScan?: { timestamp: number; eventId: string }; // Last processed scan
  rewards?: RewardSummary;               // Aggregated reward summary
  esgMetric?: ESGMetric;                 // Latest ESG metric for node
}

/**
 * Optional mapping of node IDs to Node objects
 */
export type NodeMap = Record<string, Node>;
