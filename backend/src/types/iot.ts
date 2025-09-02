/**
 * iot.ts
 * IoT devices, scan events, and telemetry types for Polymers Node
 */

/**
 * Represents a physical IoT device (smart bin, sensor, camera)
 */
export interface Device {
  deviceId: string;                        // Unique device ID
  type: "smart-bin" | "camera" | "sensor" | string;
  status: "online" | "offline" | "maintenance";
  location?: { lat: number; lng: number }; // Optional geolocation
  lastActive: number;                       // Epoch timestamp
  firmwareVersion?: string;                 // Optional firmware version
  uptimePercentage?: number;                // Optional calculated uptime
}

/**
 * Event emitted by a device (scan, weight, contamination, telemetry)
 */
export interface DeviceEvent {
  eventId: string;                          // Unique event ID
  deviceId: string;                         // Originating device
  nodeId?: string;                           // Optional associated node
  type: "scan" | "weight" | "image" | "telemetry" | string;
  payload: any;                              // Event-specific payload
  timestamp: number;                         // Epoch timestamp
  location?: { lat: number; lng: number };  // Optional geolocation
  imageUrl?: string;                         // Optional captured image URL
  weight?: number;                           // Optional weight in kg
  contaminationScore?: number;               // Optional AI contamination score
}

/**
 * Device telemetry for monitoring health and activity
 */
export interface DeviceTelemetry {
  deviceId: string;
  batteryLevel?: number;                     // % battery remaining
  temperature?: number;                      // Device temperature
  signalStrength?: number;                   // Signal / connectivity strength
  errors?: string[];                         // Array of error codes or messages
  lastReported: number;                      // Epoch timestamp
}

/**
 * Optional mapping of device IDs to Device objects
 */
export type DeviceMap = Record<string, Device>;

/**
 * Optional mapping of event IDs to DeviceEvent objects
 */
export type DeviceEventMap = Record<string, DeviceEvent>;
