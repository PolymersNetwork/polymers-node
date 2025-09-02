// Backend ports
export const BACKEND_PORT = Number(process.env.BACKEND_PORT) || 4000;
export const WS_PORT = Number(process.env.WS_PORT) || 4001;

// RPC URLs
export const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL!;
export const SUI_RPC_URL = process.env.SUI_RPC_URL!;
export const HELIUS_RPC_URL = process.env.HELIUS_RPC_URL!;
export const SOLANA_PAY_ENDPOINT = process.env.SOLANA_PAY_ENDPOINT!;

// Wallets
export const SOLANA_WALLET_PRIVATE_KEY = process.env.SOLANA_WALLET_PRIVATE_KEY!;
export const SUI_WALLET_PRIVATE_KEY = process.env.SUI_WALLET_PRIVATE_KEY!;

// Token mints
export const RECO_TOKEN_MINT_ADDRESS = process.env.RECO_TOKEN_MINT_ADDRESS!;
export const PLY_TOKEN_MINT_ADDRESS = process.env.PLY_TOKEN_MINT_ADDRESS!;
export const CRT_TOKEN_MINT_ADDRESS = process.env.CRT_TOKEN_MINT_ADDRESS!;
export const SOL_MINT_ADDRESS = process.env.SOL_MINT_ADDRESS!;
export const USDC_MINT_ADDRESS = process.env.USDC_MINT_ADDRESS!;

// Reward engine parameters
export const BASE_REWARD_RECO = Number(process.env.BASE_REWARD_RECO) || 1.0;
export const WEIGHT_FACTOR = Number(process.env.WEIGHT_FACTOR) || 0.05;
export const TRUST_MULTIPLIER = Number(process.env.TRUST_MULTIPLIER) || 0.1;
export const DAO_BONUS = Number(process.env.DAO_BONUS) || 0.05;
export const STAKING_REWARD_FACTOR = Number(process.env.STAKING_REWARD_FACTOR) || 0.02;
export const UPTIME_THRESHOLD = Number(process.env.UPTIME_THRESHOLD) || 0.95;

// Simulation
export const SIM_DEVICE_COUNT = Number(process.env.SIM_DEVICE_COUNT) || 5;
export const SIM_INTERVAL_MS = Number(process.env.SIM_INTERVAL_MS) || 5000;

// AI Model
export const AI_MODEL_PATH = process.env.AI_MODEL_PATH!;

// Blockchain Programs
export const PYTH_PROGRAM_ID = process.env.PYTH_PROGRAM_ID!;
export const CHAINLINK_PROGRAM_ID = process.env.CHAINLINK_PROGRAM_ID!;
export const METAPLEX_PROGRAM_ID = process.env.METAPLEX_PROGRAM_ID!;
