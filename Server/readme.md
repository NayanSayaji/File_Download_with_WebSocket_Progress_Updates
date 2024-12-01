# File Download with WebSocket Progress Updates

This project demonstrates how to serve file downloads using Node.js and provide real-time download progress updates to clients via WebSockets. It includes two approaches for handling file downloads:

1. **Random Progress Updates**: Progress updates are broadcasted at random intervals during the download.
2. **Sequential Progress Updates**: Progress updates are broadcasted sequentially after each chunk is processed.

---

## **Project Structure**

```
project/
│
├── controllers/
│   ├── downloadController.js         # Handles random progress download logic
│   ├── downloadSequentialController.js # Handles sequential progress download logic
│
├── utils/
│   ├── webSocket.js                  # WebSocket server setup and utilities
│
├── app.js                            # Main Express app setup
├── server.js                         # Entry point for the application
├── package.json                      # Project dependencies
└── README.md                         # Documentation
```

---

## **How It Works**

1. **HTTP Server**:

   - Serves file downloads through specific API endpoints.
   - Uses `fs.createReadStream` to stream file chunks to the client.

2. **WebSocket Server**:

   - Sends real-time download progress updates to connected WebSocket clients.
   - Broadcasts progress as a percentage of the file downloaded.

3. **Two Download Modes**:
   - **Random Progress Updates**: Sends updates at random intervals.
   - **Sequential Progress Updates**: Sends updates after each chunk is processed.

---

## **API Endpoints**

### 1. **Random Progress Download**

- **Endpoint**: `/download`
- **Description**: Downloads the file and broadcasts progress updates at random intervals.
- **Method**: `GET`
- **Headers**:
  - `Content-Disposition: attachment; filename="<filename>"`
  - `Content-Type: application/zip`

---

### 2. **Sequential Progress Download**

- **Endpoint**: `/download-sequential`
- **Description**: Downloads the file and broadcasts progress updates sequentially after each chunk is processed.
- **Method**: `GET`
- **Headers**:
  - `Content-Disposition: attachment; filename="<filename>"`
  - `Content-Type: application/zip`

---

## **Setup and Installation**

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   node server.js
   ```

4. Access the endpoints:

   - Random Progress: [http://localhost:3000/download](http://localhost:3000/download)
   - Sequential Progress: [http://localhost:3000/download-sequential](http://localhost:3000/download-sequential)

5. Connect a WebSocket client to:
   ```bash
   ws://localhost:3000
   ```

---

## **How to Test**

1. Open the browser and start a download by visiting one of the endpoints:

   - [http://localhost:3000/download](http://localhost:3000/download) (Random Progress)
   - [http://localhost:3000/download-sequential](http://localhost:3000/download-sequential) (Sequential Progress)

2. Use a WebSocket client to observe progress updates in real-time:
   - Example WebSocket client libraries: `ws`, `websocket`, or browser developer tools.

---

## **WebSocket Integration**

The WebSocket server is set up on the same port as the HTTP server. Progress updates are sent as JSON objects:

### **Message Format**

```json
{
  "progress": "<percentage>"
}
```

---

## **Customization**

- **File to Download**:
  Replace the `filename` variable in the controllers with the path to your desired file:

  ```javascript
  const filename = "<your_file_name>";
  ```

- **Randomness Frequency**:
  Adjust the randomness frequency in `downloadController.js`:

  ```javascript
  if (Math.random() > 0.7) {
    // Adjust threshold
    broadcastProgress(progress);
  }
  ```

- **Sequential Delay**:
  Modify the delay for sequential updates in `downloadSequentialController.js`:
  ```javascript
  setTimeout(() => {
    stream.resume();
  }, 500); // Adjust delay
  ```

---

## **Dependencies**

- [Express](https://expressjs.com/): Web framework for building HTTP servers.
- [WS](https://github.com/websockets/ws): WebSocket library for Node.js.
- [Node.js](https://nodejs.org/): JavaScript runtime for server-side applications.

---
