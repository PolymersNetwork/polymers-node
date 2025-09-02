/**
 * scanService.ts
 * Handles ingestion and processing of IoT scan events
 */

import { ScanEvent, ScanResult, ScanMap } from "../types/scan";
import { AIModel, ModelInput } from "../types/ai";
import { RewardService } from "./rewardService";
import { ESGService } from "./esgService";
import { WebSocketService } from "./websocketService";
import { PublicKey, Keypair } from "@solana/web3.js";

export class ScanService {
  private scans: ScanMap = {};
  private aiModel: AIModel;
  private rewardService: RewardService;
  private esgService: ESGService;
  private wsService: WebSocketService;
  private solanaPayer: Keypair;

  constructor(
    aiModel: AIModel,
    rewardService: RewardService,
    esgService: ESGService,
    wsService: WebSocketService,
    solanaPayer: Keypair
  ) {
    this.aiModel = aiModel;
    this.rewardService = rewardService;
    this.esgService = esgService;
    this.wsService = wsService;
    this.solanaPayer = solanaPayer;
  }

  /** Ingest a new scan event */
  async ingestScan(scan: ScanEvent, recipientPubKey: PublicKey): Promise<ScanResult> {
    const scanId = scan.scanId || `scan_${Date.now()}`;

    // AI prediction
    const modelInput: ModelInput = {
      imageData: scan.image || "",
      weight: scan.weight,
      metadata: { deviceId: scan.deviceId, userId: scan.userId },
    };

    let modelOutput;
    try {
      modelOutput = await this.aiModel.predict(modelInput);
    } catch (err) {
      const failedResult: ScanResult = { scan, contamination: { deviceId: scan.deviceId, scanId, level: "high", confidence: 0, timestamp: Date.now() }, status: "failed", message: err.message };
      this.scans[scanId] = failedResult;
      return failedResult;
    }

    // Calculate rewards
    const reward = this.rewardService.calculateReward(scan.weight, modelOutput.contamination.confidence, scan.deviceId);

    // Execute rewards & mint NFT
    const execution = await this.rewardService.executeReward(
      scan.deviceId,
      recipientPubKey,
      reward,
      this.solanaPayer,
      undefined, // optional NFT metadata
      { ...modelOutput.contamination, cleanedArea: modelOutput.cleanedArea }
    );

    // Update ESG metrics
    this.esgService.recordMetric({
      nodeId: scan.deviceId,
      cleanedArea: modelOutput.cleanedArea || 0,
      score: 1 - modelOutput.contamination.confidence, // simplistic scoring
      timestamp: Date.now(),
    });

    // Build scan result
    const result: ScanResult = {
      scan,
      contamination: modelOutput.contamination,
      reward,
      esgMetric: {
        nodeId: scan.deviceId,
        cleanedArea: modelOutput.cleanedArea || 0,
        score: 1 - modelOutput.contamination.confidence,
        timestamp: Date.now(),
      },
      status: "processed",
    };

    // Store and broadcast
    this.scans[scanId] = result;
    this.wsService.broadcast({ type: "scan_result", data: result });

    return result;
  }

  /** Retrieve all scan results */
  getAllScans(): ScanMap {
    return this.scans;
  }

  /** Retrieve a single scan result by ID */
  getScan(scanId: string): ScanResult | undefined {
    return this.scans[scanId];
  }
}
