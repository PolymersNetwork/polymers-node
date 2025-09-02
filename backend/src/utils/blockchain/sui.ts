import { SuiClient, TransactionBlock } from "@mysten/sui.js";
import { NFTMetadata, Reward } from "../../types/tokens";
import { SUI_RPC_URL } from "../constants";

// SUI client
export const suiClient = new SuiClient({ fullnodeUrl: SUI_RPC_URL });

// -------------------------
// NFT Minting (stub)
export async function mintSuiNFT(metadata: NFTMetadata, senderAddress: string): Promise<string> {
  console.log("[SUI] Minting NFT:", metadata.name);
  const tx = new TransactionBlock();
  // TODO: Implement Move call to mint NFT
  return "sui-nft-object-id";
}

// -------------------------
// SUI Token Transfer
export async function transferSuiToken(
  senderPrivateKey: string,
  senderAddress: string,
  recipientAddress: string,
  coinObjectId: string,
  amount: number
): Promise<string> {
  const tx = new TransactionBlock();
  const [coin] = tx.splitCoins(tx.object(coinObjectId), [tx.pure(amount)]);
  tx.transferObjects([coin], tx.pure(recipientAddress));

  const txDigest = await suiClient.executeTransactionBlock({
    transactionBlock: tx,
    sender: senderAddress,
    options: { showEffects: true },
  });

  console.log(`[SUI] Transferred ${amount} tokens to ${recipientAddress}`);
  return txDigest.digest;
}

// -------------------------
// Reward Execution
export async function executeSuiReward(event: any, reward: Reward, senderAddress: string, privateKey: string) {
  // Example: transfer RECO token
  const coinId = process.env.SUI_RECO_COIN_OBJECT_ID!;
  await transferSuiToken(privateKey, senderAddress, event.deviceId, coinId, reward.reco);
  // TODO: transfer CRT/PLY, mint NFT
  return true;
}
