import { Router } from "express";
import { Node } from "../../types/node";
import { useNodeSummary } from "../../utils/hooks";

// Placeholder in-memory nodes
const nodes: Node[] = [];

const router = Router();

/**
 * GET /api/node/status
 * Returns node uptime, staking status, and reward summary
 */
router.get("/", (req, res) => {
  const summary = useNodeSummary(nodes);
  res.json({ success: true, nodes, summary });
});

export default router;
