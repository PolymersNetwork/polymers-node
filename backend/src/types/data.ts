/**
 * data.ts
 * Aggregated and event data types for Polymers Node backend
 */

import { DeviceEvent } from "./iot";
import { RecyclingEvent, RecyclingMetrics } from "./recycle";
import { RewardExecution } from "./rewards";
import { ESGMetric } from "./esg";
import { Node } from "./node";

/**
 * Captured event data from IoT devices or simulations
 */
export interface EventData {
  eventId: string;
  deviceId: string;
  nodeId?: string;
  type: string;       // e.g., "scan", "reward", "esg"
  payload: any;       // Raw or processed event data
  timestamp: number;  // Epoch timestamp
}

/**
 * Aggregated node data
 */
export interface NodeData {
  node: Node;
  lastEvents: EventData[];
  recyclingMetrics?: RecyclingMetrics;
  esgMetric?: ESGMetric;
  rewards?: RewardExecution;
}

/**
 * Aggregated data for simulation or batch processing
 */
export interface SimulationData {
  batchId: string;
  events: EventData[];
  nodes: NodeData[];
  generatedAt: number;
}

/**
 * Optional mappings for quick lookup
 */
export type EventMap = Record<string, EventData>;
export type NodeDataMap = Record<string, NodeData>;
