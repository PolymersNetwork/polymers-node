/**
 * recycling.ts
 * Routes to ingest and query recycling events
 */

import { Router } from "express";
import { RecyclingEvent, RecyclingMetrics } from "../../../../types/recycle";
import { useESGFromScan } from "../../../../utils/hooks";

// In-memory store for demo purposes
const recyclingEvents: RecyclingEvent[] = [];

const router = Router();

/**
 * POST /api/recycling
 * Add a new recycling event from IoT device
 */
router.post("/", (req, res) => {
  try {
    const body = req.body as Partial<RecyclingEvent>;
    if (!body.deviceId || !body.weight) {
      return res.status(400).json({ success: false, message: "Missing deviceId or weight" });
    }

    const event: RecyclingEvent = {
      ...body,
      eventId: `evt_${Date.now()}`,
      timestamp: Date.now(),
    } as RecyclingEvent;

    // Optionally calculate ESG metric (cleaned area & score)
    const esgMetric = useESGFromScan({
      deviceId: event.deviceId,
      weight: event.weight,
      contaminationScore: event.contaminationScore ?? 0,
      timestamp: event.timestamp,
    });

    recyclingEvents.push(event);

    res.json({
      success: true,
      event,
      esgMetric,
    });
  } catch (err) {
    console.error("[Recycling] Error adding event:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

/**
 * GET /api/recycling/metrics
 * Aggregate recycling metrics by node or user
 */
router.get("/metrics", (req, res) => {
  try {
    const { nodeId, userId } = req.query as Record<string, string | undefined>;

    const filteredEvents = recyclingEvents.filter((e) => {
      if (nodeId && e.nodeId !== nodeId) return false;
      if (userId && e.userId !== userId) return false;
      return true;
    });

    const eventsCount = filteredEvents.length;
    const totalWeight = filteredEvents.reduce((sum, e) => sum + e.weight, 0);
    const averageContamination =
      filteredEvents.reduce((sum, e) => sum + (e.contaminationScore ?? 0), 0) /
      (eventsCount || 1);
    const cleanedArea = totalWeight * 0.1; // Example conversion: 0.1 m² per gram

    const metrics: RecyclingMetrics = {
      nodeId: nodeId ?? "",
      userId: userId ?? "",
      totalWeight,
      eventsCount,
      averageContamination,
      cleanedArea,
    };

    res.json({ success: true, metrics });
  } catch (err) {
    console.error("[Recycling] Metrics error:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

export default router;
