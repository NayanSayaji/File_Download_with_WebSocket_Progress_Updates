const express = require("express");
const { initializeWebSocketServer } = require("./src/utils/webSocket");
const { downloadFile } = require("./src/controllers/downloadController");
const {
  downloadSequentialFile,
} = require("./src/controllers/downloadSequentialController");
const cors = require("cors");

const app = express();

// Initialize WebSocket server on port 3001
initializeWebSocketServer(3001);

app.use(express.json());
app.use(cors());

// Routes
app.get("/download", downloadFile);
app.get("/download-sequential", downloadSequentialFile);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
