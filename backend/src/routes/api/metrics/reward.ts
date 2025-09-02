/**
 * reward.ts
 * Routes to fetch reward metrics for Polymers Node
 */

import { Router, Request, Response } from "express";
import { TokenReward } from "../../../types/tokens";

// In-memory reward store (demo)
const rewards: TokenReward[] = [];

const router = Router();

/**
 * GET /api/metrics/reward
 * Returns aggregated rewards
 * Optional query: nodeId, userId
 */
router.get("/", (req: Request, res: Response) => {
  const { nodeId, userId } = req.query as { nodeId?: string; userId?: string };

  let filteredRewards = rewards;

  if (nodeId) {
    filteredRewards = filteredRewards.filter((r) => r.nodeId === nodeId);
  }

  if (userId) {
    // Assuming we have userId associated with rewards
    filteredRewards = filteredRewards.filter((r: any) => r.userId === userId);
  }

  const totalRewards = filteredRewards.reduce(
    (agg, r) => {
      agg.reco += r.reco;
      agg.crt += r.crt;
      agg.ply += r.ply;
      agg.daoBonus += r.daoBonus ?? 0;
      return agg;
    },
    { reco: 0, crt: 0, ply: 0, daoBonus: 0 }
  );

  res.json({ success: true, totalRewards, count: filteredRewards.length });
});

export default router;
