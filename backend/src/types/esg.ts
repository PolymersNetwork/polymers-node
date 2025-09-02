/**
 * esg.ts
 * Types for ESG (Environmental, Social, Governance) metrics and reporting
 */

/**
 * ESG metric recorded per node or scan event
 */
export interface ESGMetric {
  nodeId: string;             // Node identifier
  cleanedArea: number;        // Area cleaned in square meters
  score: number;              // Normalized ESG score (0-100 or 0-1)
  co2Reduction?: number;      // Optional CO2 reduction estimate in kg
  timestamp?: number;         // Epoch timestamp
  eventId?: string;           // Optional associated scan event
}

/**
 * Aggregated ESG metrics for leaderboard or reporting
 */
export interface ESGReport {
  totalNodes: number;             // Total nodes contributing
  totalCleanedArea: number;       // Total area cleaned in m²
  averageScore: number;           // Average ESG score
  topPerformers: ESGMetric[];     // Top nodes by score or cleaned area
  timestamp?: number;             // Report generation timestamp
}

/**
 * Mapping of node IDs to ESG metrics
 */
export type ESGMap = Record<string, ESGMetric>;
