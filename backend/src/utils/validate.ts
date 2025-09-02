/**
 * validate.ts
 * Utility functions for runtime validation in Polymers Node backend
 */

import { IoTScanEvent } from "../types/iot";
import { TokenReward } from "../types/tokens";
import { ESGMetric } from "../types/esg";
import { Node } from "../types/node";

/**
 * Validate that a scan event has required fields
 */
export function validateScanEvent(event: Partial<IoTScanEvent>): boolean {
  if (!event.tagId || !event.deviceId || typeof event.weight !== "number" || !event.timestamp) {
    console.warn("[Validation] Invalid IoTScanEvent:", event);
    return false;
  }
  if (event.geoLocation) {
    const { latitude, longitude } = event.geoLocation;
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      console.warn("[Validation] Invalid geolocation:", event.geoLocation);
      return false;
    }
  }
  return true;
}

/**
 * Validate token reward values
 */
export function validateTokenReward(reward: Partial<TokenReward>): boolean {
  const fields = ["reco", "crt", "ply"];
  for (const field of fields) {
    if (reward[field as keyof TokenReward] == null || reward[field as keyof TokenReward]! < 0) {
      console.warn(`[Validation] Invalid TokenReward field: ${field}`, reward);
      return false;
    }
  }
  return true;
}

/**
 * Validate ESG metric
 */
export function validateESGMetric(metric: Partial<ESGMetric>): boolean {
  if (!metric.nodeId || typeof metric.cleanedArea !== "number" || typeof metric.score !== "number") {
    console.warn("[Validation] Invalid ESGMetric:", metric);
    return false;
  }
  if (metric.score < 0 || metric.score > 100) {
    console.warn("[Validation] ESG score out of bounds:", metric.score);
    return false;
  }
  return true;
}

/**
 * Validate Node structure
 */
export function validateNode(node: Partial<Node>): boolean {
  if (!node.nodeId || !Array.isArray(node.devices) || typeof node.uptimePercentage !== "number") {
    console.warn("[Validation] Invalid Node:", node);
    return false;
  }
  if (node.uptimePercentage < 0 || node.uptimePercentage > 100) {
    console.warn("[Validation] Node uptime out of bounds:", node.uptimePercentage);
    return false;
  }
  return true;
}
