/**
 * websocketService.ts
 * Real-time updates for dashboards and analytics clients
 */

import WebSocket, { Server as WSServer } from "ws";

export class WebSocketService {
  start() {
      throw new Error("Method not implemented.");
  }
  private wss: WSServer;

  constructor(port: number) {
    this.wss = new WSServer({ port });
    this.wss.on("connection", (ws) => console.log("Client connected"));
  }

  /** Broadcast message to all clients */
  broadcast(data: any) {
    const message = JSON.stringify(data);
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(message);
    });
  }
}
