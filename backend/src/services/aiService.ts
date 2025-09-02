/**
 * aiService.ts
 * Handles contamination scoring using AI models
 */

import { AIModel, ModelInput, ModelOutput, ContaminationScore } from "../types/ai";
import fs from "fs";

export class AIService {
  private model: AIModel;

  constructor(modelPath: string, model?: AIModel) {
    // Allow injecting a custom AIModel (mock or real)
    if (model) {
      this.model = model;
    } else {
      // Default mock model
      this.model = {
        async predict(input: ModelInput): Promise<ModelOutput> {
          // Simple heuristic mock: weight > 500g = medium/high
          const level =
            input.weight > 1000
              ? "high"
              : input.weight > 500
              ? "medium"
              : input.weight > 100
              ? "low"
              : "clean";

          const confidence = Math.min(1, input.weight / 1000);
          return {
            contamination: {
              deviceId: input.metadata?.deviceId || "unknown",
              scanId: `scan_${Date.now()}`,
              level,
              confidence,
              timestamp: Date.now(),
            },
            cleanedArea: input.weight * 0.1, // Example: 0.1 m² per gram
          };
        },
        async load(path: string) {
          console.log(`[AIService] Loading AI model from ${path}...`);
          if (!fs.existsSync(path)) {
            console.warn(`[AIService] Model path does not exist, using mock model.`);
          }
        },
      };
    }

    this.model.load(modelPath);
  }

  /**
   * Predict contamination from scan input
   * @param input ModelInput
   * @returns ModelOutput with contamination score
   */
  async predict(input: ModelInput): Promise<ModelOutput> {
    return this.model.predict(input);
  }

  /**
   * Batch predict multiple inputs
   * @param inputs Array of ModelInput
   */
  async batchPredict(inputs: ModelInput[]): Promise<ModelOutput[]> {
    const results: ModelOutput[] = [];
    for (const input of inputs) {
      const output = await this.model.predict(input);
      results.push(output);
    }
    return results;
  }
}
