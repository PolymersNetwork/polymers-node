/**
 * status.ts
 * Returns node uptime, staking status, and reward summary
 */

import { Router } from "express";
import { Node } from "../../../types/node";
import { useNodeSummary } from "../../../utils/hooks";

// In-memory placeholder for demo/dev purposes
const nodes: Node[] = [];

const router = Router();

/**
 * GET /api/node/status
 * Returns:
 * - All registered nodes
 * - Summary metrics (uptime, staking, rewards)
 */
router.get("/", (_req, res) => {
  try {
    // Compute summary from hooks/utilities
    const summary = useNodeSummary(nodes);

    res.json({
      success: true,
      nodes,
      summary,
    });
  } catch (err: any) {
    console.error("[NodeStatusRoute] Error fetching status:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
});

export default router;
