/**
 * scan.ts
 * Express route for ingesting IoT scan events
 */

import { Router, Request, Response } from "express";
import { ScanService } from "../../services/scanService";
import { ScanEvent } from "../../types/scan";
import { PublicKey } from "@solana/web3.js";

/**
 * Factory function to create router with injected ScanService
 */
export default function scanRoutes(scanService: ScanService) {
  const router = Router();

  /**
   * POST /api/scan
   * Receives a scan event from IoT device
   */
  router.post("/", async (req: Request, res: Response) => {
    const scan: ScanEvent = req.body;

    if (!scan.deviceId || !scan.weight) {
      return res.status(400).json({ success: false, message: "Missing deviceId or weight" });
    }

    try {
      // Determine recipient public key (user or node)
      const recipientPubKey = scan.userId
        ? new PublicKey(scan.userId) // In production, map userId → wallet address
        : new PublicKey(scan.deviceId); // fallback to deviceId

      // Ingest scan through ScanService
      const result = await scanService.ingestScan(scan, recipientPubKey);

      return res.json({ success: true, data: result });
    } catch (err: any) {
      console.error("[ScanRoute] Error processing scan:", err);
      return res.status(500).json({ success: false, message: err.message });
    }
  });

  return router;
}
