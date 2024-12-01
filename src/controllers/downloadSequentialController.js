const fs = require("fs");
const path = require("path");
const { broadcastProgress } = require("../utils/webSocket");

const filename =
  "JavaScript_Data_Structures_and_Algorithms__An_Introduction_to_Understanding_and_Implementing_Core_Data_Structure_and_Algorithm_Fundamentals.pdf";

exports.downloadSequentialFile = (req, res) => {
  const filePath = path.join(__dirname, "../", filename); // Path to the file
  const stat = fs.statSync(filePath);
  const totalSize = stat.size;

  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  res.setHeader("Content-Type", "application/zip");

  const stream = fs.createReadStream(filePath);
  let downloadedSize = 0;

  console.log("Starting sequential download...");

  // Use a pipe to read and manually send each chunk
  stream.on("data", (chunk) => {
    stream.pause(); // Pause the stream to send the chunk sequentially

    downloadedSize += chunk.length;
    const progress = ((downloadedSize / totalSize) * 100).toFixed(2);

    // Write the chunk and send the progress update
    res.write(chunk, () => {
      broadcastProgress(progress); // Send progress via WebSocket
      console.log(`Sequential download progress: ${progress}%`);

      // Simulate delay for sequential behavior
      setTimeout(() => {
        stream.resume(); // Resume stream for next chunk
      }, 500); // Adjust delay as needed
    });
  });

  stream.on("end", () => {
    res.end(); // End the response
    console.log("Sequential download complete");
    broadcastProgress(100); // Ensure 100% is sent at the end
  });

  stream.on("error", (err) => {
    console.error("Stream error:", err);
    res.status(500).send("Error during download");
  });
};
