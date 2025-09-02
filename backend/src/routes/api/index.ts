/**
 * index.ts
 * Main API router for Polymers Node backend
 */

import { Router } from "express";

import scanRoutes from "./scan";
import nodeRoutes from "./node/status";
import userRoutes from "./user";
import rewardRoutes from "./metrics/reward";
import recyclingRoutesFactory from "./metrics/recycling";
import depinRoutes from "./node/depin/depin";
import devicesRoutes from "./node/depin/devices";
import esgRoutesFactory from "./metrics/esg";

import { ESGService } from "../../services/esgService";

// Single ESGService instance for all routes
const esgService = new ESGService();

const router = Router();

// Mount sub-routes
router.use("/scan", scanRoutes);                    
router.use("/node/status", nodeRoutes());           
router.use("/node/depin", depinRoutes);            
router.use("/node/devices", devicesRoutes);        
router.use("/user", userRoutes);                   
router.use("/reward", rewardRoutes);               
router.use("/recycling", recyclingRoutesFactory(esgService)); // Pass ESGService
router.use("/esg", esgRoutesFactory(esgService));  

export default router;
