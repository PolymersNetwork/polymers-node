/**
 * metrics.ts
 * Routes to fetch aggregated metrics (ESG, recycling, rewards) for Polymers Node
 */

import { Router, Request, Response } from "express";
import { RecyclingEvent, RecyclingMetrics } from "../../../types/recycle";
import { ESGMetric, ESGReport } from "../../../types/esg";
import { TokenReward } from "../../../types/tokens";

// In-memory demo stores
const recyclingEvents: RecyclingEvent[] = [];
const esgMetrics: ESGMetric[] = [];
const rewards: TokenReward[] = [];

const router = Router();

/**
 * GET /api/metrics/recycling
 * Returns aggregated recycling metrics, optionally filtered by nodeId or userId
 */
router.get("/recycling", (req: Request, res: Response) => {
  try {
    const { nodeId, userId } = req.query as { nodeId?: string; userId?: string };

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

    const metrics: RecyclingMetrics = {
      nodeId: nodeId ?? "all",
      userId: userId ?? "all",
      totalWeight,
      eventsCount,
      averageContamination,
      cleanedArea,
    };

    res.json({ success: true, metrics });
  } catch (err: any) {
    console.error("[Metrics/Recycling] Error:", err);
    res.status(500).json({ success: false, message: err.message || "Internal error" });
  }
});

/**
 * GET /api/metrics/esg
 * Returns ESG metrics and leaderboard report
 */
router.get("/esg", (_req: Request, res: Response) => {
  try {
    const totalNodes = esgMetrics.length;
    const totalCleanedArea = esgMetrics.reduce((sum, m) => sum + m.cleanedArea, 0);
    const averageScore =
      esgMetrics.reduce((sum, m) => sum + m.score, 0) / (totalNodes || 1);

    const topPerformers = esgMetrics
      .slice()
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    const report: ESGReport = {
      totalNodes,
      totalCleanedArea,
      averageScore,
      topPerformers,
      timestamp: Date.now(),
    };

    res.json({ success: true, report });
  } catch (err: any) {
    console.error("[Metrics/ESG] Error:", err);
    res.status(500).json({ success: false, message: err.message || "Internal error" });
  }
});

/**
 * GET /api/metrics/rewards
 * Returns aggregated token rewards
 */
router.get("/rewards", (_req: Request, res: Response) => {
  try {
    const totalRewards = rewards.reduce(
      (agg, r) => {
        agg.reco += r.symbol === "RECO" ? r.amount : 0;
        agg.crt += r.symbol === "CRT" ? r.amount : 0;
        agg.ply += r.symbol === "PLY" ? r.amount : 0;
        return agg;
      },
      { reco: 0, crt: 0, ply: 0 }
    );

    res.json({ success: true, totalRewards });
  } catch (err: any) {
    console.error("[Metrics/Rewards] Error:", err);
    res.status(500).json({ success: false, message: err.message || "Internal error" });
  }
});

export default router;
