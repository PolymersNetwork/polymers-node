/**
 * health.ts
 * GET /api/node/health
 * Returns real-time node health, uptime, and device status
 */

import { Router } from "express";
import { Node } from "../../../types/node";

// Example in-memory node store (replace with DB in production)
const nodes: Node[] = [];

const router = Router();

/**
 * GET /api/node/health
 * Returns node health info
 */
router.get("/", (req, res) => {
  try {
    const healthData = nodes.map((node) => ({
      nodeId: node.nodeId,
      status: node.status,
      uptimePercentage: node.uptimePercentage,
      lastActive: node.lastActive,
      totalDevices: node.devices.length,
      lastScanTimestamp: node.lastScan?.timestamp ?? null,
      staking: node.staking ?? null,
    }));

    const summary = {
      totalNodes: nodes.length,
      onlineNodes: nodes.filter((n) => n.status === "online").length,
      offlineNodes: nodes.filter((n) => n.status === "offline").length,
      maintenanceNodes: nodes.filter((n) => n.status === "maintenance").length,
      averageUptime:
        nodes.reduce((sum, n) => sum + (n.uptimePercentage ?? 0), 0) / (nodes.length || 1),
    };

    res.json({ success: true, nodes: healthData, summary });
  } catch (err) {
    console.error("[Node Health] Error:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

export default router;
