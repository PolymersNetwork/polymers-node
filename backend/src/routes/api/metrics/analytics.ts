/**
 * analytics.ts
 * Aggregated metrics for Polymers Node dashboards and reporting
 */

import { Router, Request, Response } from "express";
import { RewardExecution } from "../../../types/rewards";
import { ESGMetric } from "../../../types/esg";
import { RecyclingMetrics } from "../../../types/recycle";
import { ContaminationScore } from "../../../types/ai";

// In-memory stores for demonstration
const rewardExecutions: RewardExecution[] = [];
const esgMetrics: ESGMetric[] = [];
const recyclingMetrics: RecyclingMetrics[] = [];
const aiScores: ContaminationScore[] = [];

const router = Router();

/**
 * GET /api/metrics/analytics
 * Returns aggregated dashboard metrics
 */
router.get("/", (_req: Request, res: Response) => {
  try {
    const totalRewards = rewardExecutions.reduce(
      (acc, r) => {
        acc.reco += r.reco || 0;
        acc.crt += r.crt || 0;
        acc.ply += r.ply || 0;
        return acc;
      },
      { reco: 0, crt: 0, ply: 0 }
    );

    const totalCleanedArea = esgMetrics.reduce((sum, m) => sum + (m.cleanedArea || 0), 0);

    const totalScans = recyclingMetrics.reduce((sum, m) => sum + (m.eventsCount || 0), 0);

    const avgContamination =
      aiScores.reduce((sum, s) => sum + s.confidence, 0) / (aiScores.length || 1);

    res.json({
      success: true,
      data: {
        totalRewards,
        totalCleanedArea,
        totalScans,
        avgContamination,
        rewardExecutions,
        esgMetrics,
        recyclingMetrics,
        aiScores,
      },
    });
  } catch (err) {
    console.error("[Analytics] Error fetching metrics:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

export default router;
