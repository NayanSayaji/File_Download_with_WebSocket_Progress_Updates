const fs = require("fs");
const path = require("path");
const { broadcastProgress } = require("../utils/webSocket");

const filename =
  "public/JavaScript_Data_Structures_and_Algorithms__An_Introduction_to_Understanding_and_Implementing_Core_Data_Structure_and_Algorithm_Fundamentals.pdf";

exports.downloadFile = (req, res) => {
  const filePath = path.join(__dirname, "../../", filename); // Path to the file
  const stat = fs.statSync(filePath);
  const totalSize = stat.size;

  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "application/zip");

  const stream = fs.createReadStream(filePath);
  let downloadedSize = 0;
  const chunks = [];

  stream.on("data", (chunk) => {
    chunks.push(chunk);
  });

  stream.on("end", async () => {
    console.log("Stream loaded into memory, starting controlled download...");

    for (const chunk of chunks) {
      downloadedSize += chunk.length;
      const progress = ((downloadedSize / totalSize) * 100).toFixed(2);

      // Simulate delay (e.g., random delay)
      await new Promise((resolve) => {
        res.write(chunk);

        // Random condition for broadcasting progress
        if (Math.random() > 0.7) {
          broadcastProgress(progress, "random"); // WebSocket update
          console.log(`Download progress: ${progress}%`);
        }

        setTimeout(resolve, Math.random() * 1000);
      });
    }

    res.end(); // End the response
    console.log("Download complete");
    broadcastProgress(100); // Ensure 100% is sent at the end
  });

  stream.on("error", (err) => {
    console.error("Stream error:", err);
    res.status(500).send("Error during download");
  });
};
