/**
 * ai.ts
 * Types for AI contamination scoring and model integration
 */

export type ContaminationLevel = "clean" | "low" | "medium" | "high";

/**
 * Result of contamination scoring for a single scan event
 */
export interface ContaminationScore {
  deviceId: string;          // IoT device ID
  scanId: string;            // Unique scan identifier
  level: ContaminationLevel; // Contamination classification
  confidence: number;        // Confidence score (0-1)
  timestamp: number;         // Epoch timestamp
}

/**
 * AI model prediction input
 */
export interface ModelInput {
  imageData: string;         // Base64 or URL
  weight: number;            // Weight of scanned item
  metadata?: Record<string, any>; // Optional extra data (geolocation, deviceId)
}

/**
 * AI model output type
 */
export interface ModelOutput {
  contamination: ContaminationScore;
  cleanedArea?: number;      // Optional cleaned area estimate (m²)
}

/**
 * Generic AI model interface
 */
export interface AIModel {
  /**
   * Predict contamination level from input
   * @param input Model input
   */
  predict(input: ModelInput): Promise<ModelOutput>;

  /**
   * Load AI model from file or path
   * @param path Path to model directory or file
   */
  load(path: string): Promise<void>;
}
