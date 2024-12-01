const http = require("http");
const app = require("./src/app");
const { setupWebSocket } = require("./src/utils/webSocket");

const PORT = 3000;

// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket server
setupWebSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`HTTP server running at http://localhost:${PORT}`);
});
