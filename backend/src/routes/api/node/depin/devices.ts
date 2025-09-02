/**
 * devices.ts
 * Routes for managing IoT devices for a specific DePIN node
 */

import { Router } from "express";
import { Node } from "../../../../types/node";
import { Device } from "../../../../types/iot";

// In-memory node store (replace with DB in production)
const nodes: Node[] = [];

const router = Router();

/**
 * GET /api/node/depin/devices/:nodeId
 * List all devices registered under a specific node
 */
router.get("/:nodeId", (req, res) => {
  try {
    const nodeId = req.params.nodeId;
    const node = nodes.find((n) => n.nodeId === nodeId);

    if (!node) {
      return res.status(404).json({ success: false, message: "Node not found" });
    }

    res.json({ success: true, devices: node.devices || [] });
  } catch (err) {
    console.error("[DePIN Devices] Error fetching devices:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

/**
 * POST /api/node/depin/devices/:nodeId
 * Register a new device to a node
 */
router.post("/:nodeId", (req, res) => {
  try {
    const nodeId = req.params.nodeId;
    const { deviceId, type, location } = req.body as Partial<Device> & { deviceId: string };

    if (!deviceId) return res.status(400).json({ success: false, message: "Missing deviceId" });

    const node = nodes.find((n) => n.nodeId === nodeId);
    if (!node) return res.status(404).json({ success: false, message: "Node not found" });

    node.devices = node.devices || [];
    const existingDevice = node.devices.find((d) => d.deviceId === deviceId);
    if (existingDevice) return res.status(400).json({ success: false, message: "Device already exists" });

    const device: Device = {
      deviceId,
      type: type ?? "smart-bin",
      status: "online",
      location,
      lastActive: Date.now(),
    };

    node.devices.push(device);
    res.json({ success: true, device });
  } catch (err) {
    console.error("[DePIN Devices] Error registering device:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

/**
 * PATCH /api/node/depin/devices/:nodeId/:deviceId
 * Update device status, location, or type
 */
router.patch("/:nodeId/:deviceId", (req, res) => {
  try {
    const { nodeId, deviceId } = req.params;
    const { status, location, type } = req.body as Partial<Device>;

    const node = nodes.find((n) => n.nodeId === nodeId);
    if (!node) return res.status(404).json({ success: false, message: "Node not found" });

    const device = node.devices?.find((d) => d.deviceId === deviceId);
    if (!device) return res.status(404).json({ success: false, message: "Device not found" });

    if (status) device.status = status;
    if (location) device.location = location;
    if (type) device.type = type;
    device.lastActive = Date.now();

    res.json({ success: true, device });
  } catch (err) {
    console.error("[DePIN Devices] Error updating device:", err);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

export default router;
