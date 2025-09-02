/**
 * ai.ts
 * Routes for AI contamination scoring metrics
 */

import { Router, Request, Response } from "express";
import { ContaminationScore } from "../../types/ai";

// In-memory store for demo purposes
const contaminationScores: ContaminationScore[] = [];

const router = Router();

/**
 * GET /api/metrics/ai
 * Return all contamination scores
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({ success: true, data: contaminationScores });
});

/**
 * GET /api/metrics/ai/:deviceId
 * Return contamination scores for a specific device
 */
router.get("/:deviceId", (req: Request, res: Response) => {
  const { deviceId } = req.params;
  const scores = contaminationScores.filter((s) => s.deviceId === deviceId);

  if (!scores.length) {
    return res.status(404).json({ success: false, message: "No scores found for device" });
  }

  res.json({ success: true, deviceId, scores });
});

/**
 * POST /api/metrics/ai
 * Add a new contamination score (used by AI service)
 */
router.post("/", (req: Request, res: Response) => {
  const score: ContaminationScore = {
    ...req.body,
    timestamp: Date.now(),
  };

  contaminationScores.push(score);
  res.json({ success: true, score });
});

export default router;
