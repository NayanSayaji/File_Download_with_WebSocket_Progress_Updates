const express = require("express");
const { downloadFile } = require("./controllers/downloadController");
const {
  downloadSequentialFile,
} = require("./controllers/downloadSequentialController");

const app = express();

// Routes
app.get("/download", downloadFile);
app.get("/download-sequential", downloadSequentialFile);

module.exports = app;
