const WebSocket = require("ws");

const clients = new Set();

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("WebSocket connection established");
    clients.add(ws);

    ws.on("close", () => {
      clients.delete(ws);
      console.log("WebSocket connection closed");
    });
  });

  console.log("WebSocket server setup complete");
};

const broadcastProgress = (progress) => {
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ progress }));
    }
  }
};

module.exports = { setupWebSocket, broadcastProgress };
