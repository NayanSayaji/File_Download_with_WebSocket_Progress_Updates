import React, { useState, useEffect } from "react";
import ProgressButton from "./components/ProgressButton/ProgressButton";
import "./App.css";

const App = () => {
  const [randomProgress, setRandomProgress] = useState(0);
  const [sequentialProgress, setSequentialProgress] = useState(0);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    // Listen for progress updates from the backend WebSocket
    socket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        console.debug(`\n🚀 ~ file: App.jsx:20 ~ useEffect ~ data:\n`, data);
        if (data.progress) {
          if (data.type === "random") {
            setRandomProgress(Number(data.progress));
          } else if (data.type === "sequential") {
            setSequentialProgress(Number(data.progress));
          }
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close(); // Cleanup WebSocket connection on component unmount
    };
  }, [sequentialProgress, randomProgress]);

  return (
    <div className="app-container">
      <div className="app-content">
        <ProgressButton
          endpoint="http://localhost:3000/download"
          progress={randomProgress}
        />
        <ProgressButton
          endpoint="http://localhost:3000/download-sequential"
          progress={sequentialProgress}
        />
      </div>
    </div>
  );
};

export default App;
