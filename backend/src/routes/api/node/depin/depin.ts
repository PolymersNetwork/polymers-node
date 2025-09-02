/**
 * depin.ts
 * Routes for DePIN / IoT validator node operations
 */

import { Router } from "express";
import { Node } from "../../../types/node";
import { Device } from "../../../types/iot";
import { SafeResult } from "../../../types/utils";

// In-memory stores (replace with DB or persistent storage in production)
const nodes: Node[] = [];
const devices: Device[] = [];

const router = Router();

/**
 * POST /api/node/depin/register-device
 * Register a new IoT device to a node
 */
router.post("/register-device", (req, res) => {
  try {
    const { nodeId, deviceId, type, location } = req.body as Partial<Device> & { nodeId: string };

    if (!nodeId || !deviceId) {
      return res.status(400).json({ success: false, message: "Missing nodeId or deviceId" });
    }

    const node = nodes.find((n) => n.nodeId === nodeId);
    if (!node) return res.status(404).json({ success: false, message: "Node not found" });

    const device: Device = {
      deviceId,
      type: type ?? "smart-bin",
      status: "online",
      location,
      lastActive: Date.now(),
    };

    devices.push(device);
    node.devices = node.devices || [];
    node.devices.push(device);

    res.json({ success: true, node, device });
  } catch (err) {
    console.error("[DePIN] Register device error:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

/**
 * GET /api/node/depin/devices
 * List all devices or devices for a specific node
 */
router.get("/devices", (req, res) => {
  try {
    const { nodeId } = req.query as { nodeId?: string };
    let filteredDevices = devices;

    if (nodeId) {
      filteredDevices = devices.filter((d) => {
        const node = nodes.find((n) => n.nodeId === nodeId);
        return node?.devices?.some((nd) => nd.deviceId === d.deviceId);
      });
    }

    res.json({ success: true, devices: filteredDevices });
  } catch (err) {
    console.error("[DePIN] List devices error:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

/**
 * POST /api/node/depin/update-status
 * Update a device's status (online/offline/maintenance)
 */
router.post("/update-status", (req, res) => {
  try {
    const { deviceId, status } = req.body as { deviceId: string; status: "online" | "offline" | "maintenance" };

    const device = devices.find((d) => d.deviceId === deviceId);
    if (!device) return res.status(404).json({ success: false, message: "Device not found" });

    device.status = status;
    device.lastActive = Date.now();

    res.json({ success: true, device });
  } catch (err) {
    console.error("[DePIN] Update status error:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

export default router;
