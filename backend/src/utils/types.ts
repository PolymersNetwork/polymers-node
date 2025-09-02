export interface IoTScanEvent {
  tagId: string;
  weight: number;
  contaminationScore?: number;
  imageUrl?: string;
  geoLocation: {
    lat: number;
    lng: number;
  };
  timestamp?: number;
}

export interface Reward {
  reco: number;
  crt: number;
  ply: number;
  daoBonus?: number;
}

export interface NodeStatus {
  uptime: number;
  stakedAmount: number;
  lastActive: number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Record<string, any>;
}
