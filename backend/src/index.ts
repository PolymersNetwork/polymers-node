/**
 * index.ts
 * Entry point for Polymers Node backend
 */

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Keypair } from "@solana/web3.js";

import { ScanService } from "./services/scanService";
import { AIService } from "./services/aiService";
import { RewardService } from "./services/rewardService";
import { ESGService } from "./services/esgService";
import { WebSocketService } from "./services/websocketService";

// Import aggregated API router
import apiRoutes from "./routes/api";

// Load environment variables
dotenv.config();

const BACKEND_PORT = Number(process.env.BACKEND_PORT) || 4000;
const WS_PORT = Number(process.env.WS_PORT) || 4001;

// Initialize services
const aiService = new AIService(process.env.AI_MODEL_PATH || "./ai/model");
const rewardService = new RewardService();
const esgService = new ESGService();
const wsService = new WebSocketService(WS_PORT);

// Initialize Solana payer
const solanaPayer = Keypair.fromSecretKey(
  Buffer.from(process.env.SOLANA_WALLET_PRIVATE_KEY!, "base64")
);

// Initialize scan service
const scanService = new ScanService(aiService, rewardService, esgService, wsService, solanaPayer);

// Express app
const app = express();
app.use(bodyParser.json());

// Optionally inject scanService into API routes if needed
// For this example, we attach it globally
app.use((req, _res, next) => {
  req["scanService"] = scanService;
  next();
});

// Mount aggregated API router
app.use("/api", apiRoutes);

// Start HTTP server
app.listen(BACKEND_PORT, () => {
  console.log(`[Backend] Polymers Node API running on http://localhost:${BACKEND_PORT}`);
});

// Start WebSocket server
wsService.start();
console.log(`[WebSocket] WS server running on ws://localhost:${WS_PORT}`);
