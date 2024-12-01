import React, { useState, useEffect } from "react";
import "./ProgressButton.css"; // Make sure to import your CSS for styles

const ProgressButton = ({ endpoint, progress }) => {
    const [downloadProgress, setDownloadProgress] = useState(progress || 0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3001");

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        // Listen for progress updates from the backend WebSocket
        socket.onmessage = (message) => {
            try {
                const data = JSON.parse(message.data);
                if (data.progress) {
                    setDownloadProgress(Number(data.progress));
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
    }, []);

    const startDownload = async () => {
        setIsDownloading(true);
        setIsDisabled(true);

        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    Accept: "application/zip",
                },
            });

            if (response.ok) {
                console.log("Download started");
                // You can trigger a file download from here as well
                const fileBlob = await response.blob();
                const link = document.createElement("a");
                link.href = URL.createObjectURL(fileBlob);
                link.download = "file.pdf"; // or dynamically use the file name
                link.click();
            } else {
                console.error("Download failed");
            }
        } catch (error) {
            console.error("Download error:", error);
        } finally {
            setIsDownloading(false);
            setIsDisabled(false);
        }
    };

    return (
        <button
            onClick={startDownload}
            className={`progress-button ${isDownloading ? "downloading" : ""}`}
            disabled={isDisabled}
        >
            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${downloadProgress}%` }}
                />
                <span className="progress-text">
                    {isDownloading ? `${downloadProgress}%` : "Download"}
                </span>
            </div>
        </button>
    );
};

export default ProgressButton;
