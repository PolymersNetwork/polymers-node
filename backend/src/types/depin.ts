/**
 * depin.ts
 * Types for DePIN (Decentralized Physical Infrastructure Networks) node operations
 */

import { Device, DeviceEvent } from "./iot";
import { RewardExecution } from "./rewards";
import { ESGMetric } from "./esg";
import { Node } from "./node";

/**
 * DePIN Node operational status
 */
export interface DePINNodeStatus {
  nodeId: string;
  status: "online" | "offline" | "maintenance";
  lastActive: number;
  uptimePercentage: number;
  devices: Device[];
  lastEvents?: DeviceEvent[];
  rewardsExecuted?: RewardExecution[];
  esgMetric?: ESGMetric;
}

/**
 * Batch of DePIN events processed together
 */
export interface DePINBatch {
  batchId: string;
  nodeId: string;
  events: DeviceEvent[];
  rewards?: RewardExecution[];
  esgMetrics?: ESGMetric[];
  processedAt: number;
}

/**
 * Optional mapping of node IDs to their DePIN status
 */
export type DePINNodeMap = Record<string, DePINNodeStatus>;
