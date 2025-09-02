/**
 * esg.ts
 * Express routes for ESG metrics and reporting
 */

import { Router, Request, Response } from "express";
import { ESGService } from "../../../services/esgService";

/**
 * Returns ESG-related routes, injected with an ESGService instance
 * @param esgService ESGService instance for fetching metrics and reports
 */
export default function esgRoutes(esgService: ESGService) {
  const router = Router();

  /**
   * GET /api/esg/metrics
   * Returns all ESG metrics (per node or scan event)
   */
  router.get("/metrics", (_req: Request, res: Response) => {
    try {
      const metrics = esgService.getAllMetrics();
      res.json({ success: true, data: metrics });
    } catch (err: unknown) {
      console.error("[ESGRoute] Error fetching metrics:", err);
      const message = err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ success: false, message });
    }
  });

  /**
   * GET /api/esg/report
   * Returns aggregated ESG report including leaderboard
   */
  router.get("/report", (_req: Request, res: Response) => {
    try {
      const report = esgService.getReport();
      res.json({ success: true, data: report });
    } catch (err: unknown) {
      console.error("[ESGRoute] Error fetching report:", err);
      const message = err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ success: false, message });
    }
  });

  return router;
}
