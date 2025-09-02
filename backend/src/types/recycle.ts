/**
 * recycle.ts
 * Recycling events and aggregated metrics
 */

import { ESGMetric } from "./esg";

/**
 * Represents a recycling scan or collection event
 */
export interface RecyclingEvent {
  eventId: string;                   // Unique event ID
  deviceId: string;                  // Originating IoT device
  nodeId?: string;                   // Optional node ID
  userId?: string;                   // Optional user ID
  tagId?: string;                    // Optional scanned item tag
  weight: number;                    // Weight in kilograms
  contaminationScore?: number;       // Optional contamination detection
  imageUrl?: string;                 // Optional image URL
  timestamp: number;                 // Epoch timestamp
  location?: { lat: number; lng: number }; // Optional geolocation
}

/**
 * Aggregated recycling metrics per node or user
 */
export interface RecyclingMetrics {
  nodeId?: string;                   // Node-level aggregation
  userId?: string;                   // User-level aggregation
  totalWeight: number;               // Total collected weight
  eventsCount: number;               // Number of recycling events
  averageContamination?: number;     // Optional average contamination
  cleanedArea?: number;              // Optional cleaned area (m²)
  esgMetric?: ESGMetric;             // ESG metric calculated for this aggregation
}

/**
 * Optional mapping of event IDs to RecyclingEvent objects
 */
export type RecyclingEventMap = Record<string, RecyclingEvent>;
