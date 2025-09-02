import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { NFTMetadata, Reward } from "../../types/tokens";
import { SOLANA_RPC_URL } from "../constants";
import { PythConnection, getPythProgramKeyForCluster } from "@pythnetwork/client";

// -------------------------
// Solana connection
export const solanaConnection = new Connection(SOLANA_RPC_URL, "confirmed");

// -------------------------
// NFT Minting (stub)
export async function mintSolanaNFT(metadata: NFTMetadata, payer: Keypair): Promise<string> {
  console.log("[Solana] Minting NFT:", metadata.name);
  const tx = new Transaction();
  const sig = await solanaConnection.sendTransaction(tx, [payer]);
  await solanaConnection.confirmTransaction(sig, "confirmed");
  return sig;
}

// -------------------------
// SPL Token Transfer
export async function transferSolanaToken(
  mintAddress: string,
  from: Keypair,
  to: PublicKey,
  amount: number
) {
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    solanaConnection,
    from,
    new PublicKey(mintAddress),
    from.publicKey
  );
  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    solanaConnection,
    from,
    new PublicKey(mintAddress),
    to
  );

  const txSig = await transfer(
    solanaConnection,
    from,
    fromTokenAccount.address,
    toTokenAccount.address,
    from.publicKey,
    amount
  );
  console.log(`[Solana] Transferred ${amount} of ${mintAddress} to ${to.toBase58()}`);
  return txSig;
}

// -------------------------
// Pyth Price Feed
export async function fetchPythPrice(asset: string): Promise<number> {
  try {
    const pythProgramKey = getPythProgramKeyForCluster("devnet"); // adjust cluster
    const pythConnection = new PythConnection(solanaConnection, pythProgramKey);
    await pythConnection.connect();

    const priceData = pythConnection.getProductAndPriceData(asset);
    const price = priceData?.price?.price ?? 1.0;
    console.log(`[Pyth] Latest price for ${asset}: ${price}`);
    return price;
  } catch (err) {
    console.error("[Pyth] Failed to fetch price:", err);
    return 1.0;
  }
}

// -------------------------
// Chainlink Price Feed (stub)
export async function fetchChainlinkPrice(feedAddress: string): Promise<number> {
  // TODO: Implement on-chain read using ethers.js / Solana Chainlink program
  console.log(`[Chainlink] Fetching price for feed: ${feedAddress}`);
  return 1.0; // placeholder
}

// -------------------------
// Reward Execution with dynamic price adjustment
export async function executeSolanaReward(event: any, reward: Reward, payer: Keypair) {
  // Step 1: Fetch dynamic prices
  const solPrice = await fetchPythPrice("SOL");
  const usdcPrice = await fetchChainlinkPrice(process.env.CHAINLINK_USDC_FEED!);

  // Step 2: Adjust reward amounts
  const adjustedReward: Reward = {
    reco: reward.reco * solPrice,
    crt: reward.crt * usdcPrice,
    ply: reward.ply,
  };

  // Step 3: Transfer RECO token
  const recoMint = process.env.RECO_TOKEN_MINT_ADDRESS!;
  const recipient = new PublicKey(event.deviceId);
  await transferSolanaToken(recoMint, payer, recipient, adjustedReward.reco);

  // TODO: Transfer CRT, PLY, mint NFT

  console.log(`[Reward] Solana reward executed for tag ${event.tagId}`);
  return adjustedReward;
}
