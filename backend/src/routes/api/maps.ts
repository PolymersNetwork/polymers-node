/**
 * maps.ts
 * Utilities for mapping ESG and recycling data for dashboards
 */

import { ESGMetric } from "../../types/esg";

/**
 * Convert ESG metrics into a geo-map format for visualization
 */
export function mapESGToGeo(metrics: ESGMetric[]) {
  return metrics.map((m) => ({
    nodeId: m.nodeId,
    cleanedArea: m.cleanedArea,
    score: m.score,
    lat: Math.random() * 180 - 90, // placeholder: replace with real geo
    lng: Math.random() * 360 - 180,
    co2Reduction: m.co2Reduction || 0,
  }));
}
