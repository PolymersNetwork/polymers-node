/**
 * recyclingEvent.ts
 * Handles incoming recycling events and updates ESG metrics in real-time
 */

import { RecyclingEvent } from "../types/recycle";
import { ESGService } from "../services/esgService";

// Example in-memory store for recycling events
const recyclingEvents: RecyclingEvent[] = [];

/**
 * Process a recycling event
 * @param event RecyclingEvent
 * @param esgService ESGService instance
 * @returns Processed event with updated ESG metric
 */
export function handleRecyclingEvent(event: RecyclingEvent, esgService: ESGService) {
  // Assign a unique ID and timestamp
  const newEvent: RecyclingEvent = {
    ...event,
    eventId: `evt_${Date.now()}`,
    timestamp: Date.now(),
  };

  // Store the event
  recyclingEvents.push(newEvent);

  // Calculate ESG metric for this node
  const cleanedArea = newEvent.weight * 0.1; // Example: 0.1 m² per kg
  const score = Math.max(0, 100 - (newEvent.contaminationScore ?? 0) * 10); // Score out of 100

  const esgMetric = {
    nodeId: newEvent.nodeId!,
    cleanedArea,
    score,
    co2Reduction: cleanedArea * 0.05, // Example CO2 reduction in kg
    timestamp: Date.now(),
  };

  // Update ESGService with new metric
  esgService.upsertMetric(esgMetric);

  return {
    success: true,
    event: newEvent,
    esgMetric,
  };
}

/**
 * Retrieve all recycling events (optionally filter by node or user)
 */
export function getRecyclingMetrics(nodeId?: string, userId?: string) {
  const filtered = recyclingEvents.filter((e) => {
    if (nodeId && e.nodeId !== nodeId) return false;
    if (userId && e.userId !== userId) return false;
    return true;
  });

  const totalWeight = filtered.reduce((sum, e) => sum + e.weight, 0);
  const eventsCount = filtered.length;
  const averageContamination =
    filtered.reduce((sum, e) => sum + (e.contaminationScore ?? 0), 0) / (eventsCount || 1);
  const cleanedArea = totalWeight * 0.1;

  return {
    totalWeight,
    eventsCount,
    averageContamination,
    cleanedArea,
  };
}
