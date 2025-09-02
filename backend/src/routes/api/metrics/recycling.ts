/**
 * recycling.ts
 * Metrics route combining recycling data and live ESG leaderboard
 */

import { Router, Request, Response } from "express";
import { RecyclingEvent, RecyclingMetrics } from "../../../types/recycle";
import { ESGService } from "../../../services/esgService";
import { esgMetrics } from "../../../data";

// In-memory store for demo purposes
const recyclingEvents: RecyclingEvent[] = [];

// Initialize ESG service instance
const esgService = new ESGService();

const router = Router();

/**
 * GET /api/metrics/recycling
 * Returns aggregated recycling metrics along with live ESG leaderboard
 */
router.get("/", (req: Request, res: Response) => {
  try {
    const { nodeId, userId } = req.query as { nodeId?: string; userId?: string };

    // Filter recycling events
    const filteredEvents = recyclingEvents.filter((e) => {
      if (nodeId && e.nodeId !== nodeId) return false;
      if (userId && e.userId !== userId) return false;
      return true;
    });

    const totalWeight = filteredEvents.reduce((sum, e) => sum + e.weight, 0);
    const eventsCount = filteredEvents.length;
    const averageContamination =
      filteredEvents.reduce((sum, e) => sum + (e.contaminationScore ?? 0), 0) /
      (eventsCount || 1);
    const cleanedArea = totalWeight * 0.1; // Example: 0.1 m² per kg

    const recyclingMetrics: RecyclingMetrics = {
      nodeId: nodeId ?? "all",
      userId: userId ?? "all",
      totalWeight,
      eventsCount,
      averageContamination,
      cleanedArea,
    };

    // Live ESG leaderboard
    const esgReport = esgService.getReport();

    res.json({
      success: true,
      recyclingMetrics,
      esgLeaderboard: esgReport,
    });
  } catch (err: any) {
    console.error("[RecyclingMetricsRoute] Error:", err);
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
});

export default router;
