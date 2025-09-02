/**
 * rewardService.ts
 * Handles reward calculation, token transfers, NFT minting, and ESG integration
 */

import { TokenReward, NFTMetadata, ESGMetric } from "../types/tokens";
import { RewardExecution } from "../types/rewards";
import { Keypair, PublicKey } from "@solana/web3.js";
import { transferSolanaToken, mintSolanaNFT } from "./blockchain/solana";

export class RewardService {
  /** Calculate rewards for a scan event */
  calculateReward(weight: number, contamination: number, nodeId: string): TokenReward {
    const baseReco = 1.0;
    const weightFactor = 0.05;
    const trustMultiplier = 0.1;
    const daoBonus = 0.05;

    return {
      reco: baseReco + weight * weightFactor + trustMultiplier + daoBonus,
      crt: weight * 0.5,
      ply: weight * 0.2,
      daoBonus,
      timestamp: Date.now(),
      nodeId,
    };
  }

  /** Execute rewards: transfer tokens & mint NFT */
  async executeReward(
    nodeId: string,
    recipient: PublicKey,
    reward: TokenReward,
    payer: Keypair,
    nft?: NFTMetadata,
    esg?: ESGMetric
  ): Promise<RewardExecution> {
    // Example: transfer RECO
    await transferSolanaToken(process.env.RECO_TOKEN_MINT_ADDRESS!, payer, recipient, reward.reco);
    // TODO: transfer CRT/PLY, mint NFT via mintSolanaNFT
    return {
      nodeId,
      rewards: reward,
      nft,
      esgMetric: esg,
      timestamp: Date.now(),
    };
  }
}
