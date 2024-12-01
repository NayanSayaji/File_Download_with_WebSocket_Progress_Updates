const WebSocket = require("ws");

// WebSocket Server instance
let wss;

const initializeWebSocketServer = (port) => {
  wss = new WebSocket.Server({ port });
  console.log(`WebSocket server running on ws://localhost:${port}`);

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection established");

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });
};

// Function to broadcast progress updates to all connected clients
const broadcastProgress = (progress, type) => {
  if (wss) {
    // Send progress to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ progress, type }));
      }
    });
  }
};

module.exports = { initializeWebSocketServer, broadcastProgress };
