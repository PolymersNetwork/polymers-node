/**
 * websocketService.ts
 * WebSocket server for real-time scan updates
 */

import WebSocket, { WebSocketServer } from "ws";

export class WebSocketService {
  private wss: WebSocketServer;

  constructor(private port: number = Number(process.env.WS_PORT) || 4001) {
    this.wss = new WebSocketServer({ port: this.port });
  }

  /** Start the WebSocket server */
  start() {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("[WebSocket] Client connected");

      ws.on("message", (message) => {
        console.log("[WebSocket] Received:", message.toString());
      });

      ws.send(JSON.stringify({ message: "Welcome to Polymers Node WS Server" }));
    });

    console.log(`[WebSocket] Server running on ws://localhost:${this.port}`);
  }

  /** Broadcast a message to all connected clients */
  broadcast(data: any) {
    const payload = JSON.stringify(data);
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }
}
