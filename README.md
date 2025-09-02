# <span style="color:#00AEEF">🌐 Polymers Node – IoT Validator & Reward Engine</span>

![Polymers Badge](https://img.shields.io/badge/Polymers-Network-00AEEF?style=for-the-badge&logo=vercel&logoColor=white)
![Status Badge](https://img.shields.io/badge/Status-Production--Ready-28A745?style=for-the-badge&logo=github)
![License Badge](https://img.shields.io/badge/License-MIT-FFB400?style=for-the-badge)
![Blockchain Badge](https://img.shields.io/badge/Solana-Integration-9945FF?style=for-the-badge&logo=solana)
![Blockchain Badge](https://img.shields.io/badge/SUI-Integration-6FBCF0?style=for-the-badge&logo=sui)

**Polymers Node** is a **production-grade DePIN / IoT validator node** for the Polymers Network.

It validates recycling events, executes **AI contamination scoring**, orchestrates devices, calculates **dynamic rewards**, mints **NFTs**, issues **ESG tokens**, and integrates with **Solana & SUI blockchain programs**.

---

## <span style="color:#00AEEF">🚀 Key Features</span>

✨ **IoT Event Capture** – Real-time events from smart bins, sensors, and cameras  
🧠 **AI Contamination Scoring** – Detect contamination and compute cleaned area contribution  
⚖️ **Dynamic Rewards Engine** – Calculates RECO / CRT / PLY rewards with DAO bonuses  
🎨 **NFT Minting & Metadata** – On-chain digital twins for scanned items  
📡 **Multi-Device Orchestration** – High-frequency, batch IoT event handling  
🔒 **Staking & Uptime Tracking** – Dynamic rewards based on node reliability  
⚡ **WebSocket Server** – Live updates to dashboards and analytics  
⛓ **Cross-Chain Integration** – Solana + SUI program calls for NFT, staking, and tokens  
🌱 **Analytics & ESG Mapping** – Cleaned areas, ESG scores, and leaderboards  

---

## <span style="color:#00AEEF">⚙️ Prerequisites</span>

- Node.js **>= 18**  
- Docker & Docker Compose  
- Solana & SUI wallets for NFT & reward execution  
- AI model files for contamination scoring  

---

## <span style="color:#00AEEF">💻 Local Development</span>

1️⃣ Install dependencies  

```bash
cd backend
pnpm install
````

2️⃣ Configure environment variables

```bash
cp .env.example .env
```

3️⃣ Start node locally

```bash
npm run dev
```

---

## <span style="color:#00AEEF">🏭 Production Deployment with Docker</span>

The backend API and WebSocket server are fully containerized.

### 1️⃣ Build & Run with Docker Compose

```bash
docker-compose up --build
```

* **Backend API:** `http://localhost:4000/api/scan`
* **WebSocket:** `ws://localhost:4001`

### 2️⃣ Detached Mode

```bash
docker-compose up -d --build
```

### 3️⃣ Notes

* `.env` is loaded from `backend/.env`
* Ports `4000` (API) and `4001` (WebSocket) correspond to services
* Volumes allow hot reload during development; remove for production

---

## <span style="color:#00AEEF">🏗 Node Architecture</span>

```text
IoT Smart Bins → Polymers Node
   │               │
   ├─ Event Capture │
   │               ├─ AI Contamination Scoring
   │               │
   │               ├─ Reward Engine
   │               │    ├─ NFT Minting
   │               │    ├─ ESG / CRT / RECO Rewards
   │               │    └─ Staking Adjustment
   │               │
   │               └─ Blockchain Programs (Solana + SUI)
   │
   └─ WebSocket → Dashboard / Analytics
```

### 📊 Architecture Diagram (Brand Colors)

![Polymers Node Architecture](./backend/docs/polymers_node_architecture_brand.png)
🔎 [High-resolution SVG version](./backend/docs/polymers_node_architecture_brand.svg)

---

## <span style="color:#00AEEF">🌍 Ecosystem Overview</span>

Polymers Node is part of a **larger DePIN + Blockchain ecosystem**, bridging IoT devices, AI validation, tokenized rewards, and DAO governance.

### 📊 Ecosystem Flow Diagram (Brand Colors)

![Polymers Ecosystem Flow](./backend/docs/polymers_ecosystem_flow_brand.png)
🔎 [High-resolution SVG version](./backend/docs/polymers_ecosystem_flow_brand.svg)

---

## <span style="color:#00AEEF">📁 Folder Structure</span>

```text
backend/
├─ src/
│  ├─ index.ts             # Node entrypoint
│  ├─ routes/
│  │  └─ scan.ts           # IoT scan event API
│  ├─ services/
│  │  ├─ aiService.ts      # Contamination scoring
│  │  ├─ rewardService.ts  # Reward calculation & blockchain triggers
│  │  ├─ stakingService.ts # Node staking & uptime monitoring
│  │  └─ deviceService.ts  # Multi-device orchestration
│  ├─ websocket/
│  │  └─ wsServer.ts       # Live WebSocket updates
│  └─ utils/
│     ├─ blockchain.ts     # Solana + SUI program calls
│     ├─ constants.ts
│     └─ types.ts
├─ package.json
├─ tsconfig.json
└─ Dockerfile
```

---

## <span style="color:#00AEEF">🔗 API Endpoints</span>

| Endpoint              | Method | Description                                                                    |
| --------------------- | ------ | ------------------------------------------------------------------------------ |
| `/api/scan`           | POST   | Receives IoT bin scan events (tagID, weight, contamination image, geolocation) |
| `/api/node/status`    | GET    | Returns node uptime, staking status, and reward summary                        |
| `/api/reward/execute` | POST   | Triggers reward execution for a validated scan event                           |
| `/api/esg/metrics`    | GET    | Returns ESG scores, cleaned area maps, and leaderboard metrics                 |

---

## <span style="color:#00AEEF">🧠 AI & Reward Engine</span>

📌 **Contamination Scoring:** Evaluates sensor & image data for contamination
📌 **Dynamic Reward Formula:**

```text
Reward_RECO = BaseValue + ΔWeight × WeightFactor + TrustMultiplier + Bonus + DAO Bonus
```

📌 **NFT Minting:** Solana & SUI digital twin NFTs
📌 **ESG / CRT Issuance:** On-chain credits & tokenized rewards

---

## <span style="color:#00AEEF">⚡ Staking & Multi-Device Orchestration</span>

* 🔒 **PLY Token Staking:** Rewards based on uptime & reliability
* 📡 **Multi-Device Handling:** Batch IoT event processing
* 🛡 **Node Status Tracking:** Health monitoring & slashing if thresholds missed

---

## <span style="color:#00AEEF">📡 WebSocket Integration</span>

📡 **Real-Time Updates:**

* Scan events
* Rewards issued
* NFTs minted
* ESG / CRT metrics

🖥 **Frontend Subscription:**
Connect dashboards → `ws://localhost:4001`

---

## <span style="color:#00AEEF">🌱 Environment Variables</span>

```ini
BACKEND_PORT=4000
WS_PORT=4001

SOLANA_RPC_URL=https://api.devnet.solana.com
SUI_RPC_URL=https://fullnode.devnet.sui.io:443
SOLANA_WALLET_PRIVATE_KEY=<key>
SUI_WALLET_PRIVATE_KEY=<key>

BASE_REWARD_RECO=1.0
WEIGHT_FACTOR=0.05
TRUST_MULTIPLIER=0.1
DAO_BONUS=0.05
STAKING_REWARD_FACTOR=0.02
UPTIME_THRESHOLD=0.95

SIM_DEVICE_COUNT=5
SIM_INTERVAL_MS=5000

AI_MODEL_PATH=./ai/model
```

---

## <span style="color:#00AEEF">✅ Quick Start Recap</span>

1. Configure `.env` with wallets, staking parameters, AI model path
2. Start node locally:

```bash
cd backend
npm run dev
```

or via Docker:

```bash
docker-compose up --build
```

3. Observe **scan events, AI scoring, reward issuance, NFT minting, and ESG updates**
4. Dashboards receive **real-time updates via WebSocket**

---

### <span style="color:#00AEEF">📄 Export PDF with Pandoc</span>

```bash
pandoc README_for_pdf.md \
    -o Polymers_Node_Whitepaper.pdf \
    --pdf-engine=xelatex \
    --variable geometry:margin=1in \
    --variable mainfont="Arial" \
    --highlight-style=tango
```

* Use **SVG diagrams** for crisp vector quality if preferred:

```markdown
![Node Architecture](./backend/docs/polymers_node_architecture_brand.svg)
```

* Adjust page size for whitepaper:

```bash
--variable papersize:a4
```
