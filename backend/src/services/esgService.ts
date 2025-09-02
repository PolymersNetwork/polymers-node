/**
 * esgService.ts
 * Service to handle ESG metrics and reporting
 */

import { ESGMetric, ESGReport } from "../types/esg";
import { esgMetrics } from "../data";

export class ESGService {
  /**
   * Add or update a ESG metric for a node (real-time update)
   * @param metric ESGMetric
   */
  upsertMetric(metric: ESGMetric) {
    esgMetrics[metric.nodeId] = {
      ...metric,
      timestamp: Date.now(),
    };
    console.log(`[ESGService] Upserted ESG metric for node ${metric.nodeId}`);
  }

  /**
   * Retrieve all ESG metrics (live data)
   */
  getAllMetrics(): ESGMetric[] {
    return Object.values(esgMetrics);
  }

  /**
   * Generate an aggregated ESG report with leaderboard
   * @param topN number of top performers to return
   */
  getReport(topN = 10): ESGReport {
    const metrics = Object.values(esgMetrics);

    const totalNodes = metrics.length;
    const totalCleanedArea = metrics.reduce((sum, m) => sum + m.cleanedArea, 0);
    const averageScore = totalNodes > 0 ? metrics.reduce((sum, m) => sum + m.score, 0) / totalNodes : 0;

    // Top performers sorted first by score, then cleanedArea
    const topPerformers = metrics
      .sort((a, b) => b.score - a.score || b.cleanedArea - a.cleanedArea)
      .slice(0, topN);

    return {
      totalNodes,
      totalCleanedArea,
      averageScore,
      topPerformers,
      timestamp: Date.now(),
    };
  }

  /**
   * Optional: Get ESG metric by node ID
   */
  getMetric(nodeId: string): ESGMetric | undefined {
    return esgMetrics[nodeId];
  }

  /**
   * Optional: Clear all metrics (for testing or reset)
   */
  clearMetrics() {
    for (const key in esgMetrics) delete esgMetrics[key];
    console.log("[ESGService] Cleared all ESG metrics");
  }
}
