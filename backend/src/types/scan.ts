/**
 * scan.ts
 * Types for IoT scan events, AI contamination scoring, and reward metadata
 */

import { ContaminationScore } from "./ai";
import { TokenReward } from "./tokens";
import { ESGMetric } from "./esg";

/**
 * IoT scan event received from a device
 */
export interface ScanEvent {
  scanId: string;           // Unique scan identifier
  deviceId: string;         // IoT device ID
  userId?: string;          // Optional user ID
  timestamp: number;        // Epoch timestamp of scan
  weight: number;           // Weight of scanned item
  image?: string;           // Optional image data (base64 or URL)
  location?: {              // Optional geolocation
    latitude: number;
    longitude: number;
  };
}

/**
 * Result of a scan event after processing by AI and reward engine
 */
export interface ScanResult {
  scan: ScanEvent;                // Original scan event
  contamination: ContaminationScore; // AI contamination result
  reward?: TokenReward;           // Tokens rewarded for this scan
  nftId?: string;                 // Minted NFT ID (if applicable)
  esgMetric?: ESGMetric;          // ESG metric contribution
  status: "pending" | "processed" | "failed"; // Processing status
  message?: string;               // Optional processing message
}

/**
 * Optional mapping of scan IDs to scan results
 */
export type ScanMap = Record<string, ScanResult>;
