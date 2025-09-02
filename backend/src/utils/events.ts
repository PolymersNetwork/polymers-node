/**
 * events.ts
 * Centralized event emitter for Polymers Node backend
 * Handles IoT scans, rewards, NFTs, and WebSocket updates
 */

import { EventEmitter } from "events";
import { IoTScanEvent, Reward, NFTMetadata } from "./types";

// Create a global event emitter
export const nodeEvents = new EventEmitter();

// Event names
export const EVENTS = {
  SCAN_RECEIVED: "scan_received",
  REWARD_ISSUED: "reward_issued",
  NFT_MINTED: "nft_minted",
  ESG_UPDATED: "esg_updated",
  NODE_STATUS_UPDATED: "node_status_updated",
};

/**
 * Emit a new scan event
 * @param event IoTScanEvent
 */
export function emitScanEvent(event: IoTScanEvent) {
  nodeEvents.emit(EVENTS.SCAN_RECEIVED, event);
}

/**
 * Emit a reward issuance event
 * @param reward Reward details
 * @param event Original IoTScanEvent
 */
export function emitRewardIssued(reward: Reward, event: IoTScanEvent) {
  nodeEvents.emit(EVENTS.REWARD_ISSUED, { reward, event });
}

/**
 * Emit NFT minted event
 * @param metadata NFTMetadata
 * @param event Original IoTScanEvent
 */
export function emitNFTMinted(metadata: NFTMetadata, event: IoTScanEvent) {
  nodeEvents.emit(EVENTS.NFT_MINTED, { metadata, event });
}

/**
 * Emit ESG update event
 * @param metrics any ESG metrics object
 */
export function emitESGUpdated(metrics: any) {
  nodeEvents.emit(EVENTS.ESG_UPDATED, metrics);
}

/**
 * Emit Node status update
 * @param status Node uptime / staking info
 */
export function emitNodeStatus(status: any) {
  nodeEvents.emit(EVENTS.NODE_STATUS_UPDATED, status);
}

/**
 * Example: Listening to events
 * Usage:
 *   nodeEvents.on(EVENTS.SCAN_RECEIVED, (event) => { ... });
 */
