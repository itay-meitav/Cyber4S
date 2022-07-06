const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { WebSocketServer } = require("ws");

const portHttp = 4000;
const portWs = 4040;

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use("/", express.static(path.join(__dirname, "./dist/")));

const root = path.join(process.cwd(), "dist");
app.use(express.static(root), (req, res, next) => {
  next();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(root, "index.html"));
});

app.listen(portHttp, () => {
  console.log("Hosted: http://localhost:" + portHttp);
});

// WebSocket
const socketServer = new WebSocketServer({ port: portWs });
socketServer.on("connection", (newClient) => {
  newClient.on("message", (msg) => {
    console.log("WebSocket: " + msg);

    socketServer.clients.forEach((client) => {
      // if (client.readyState === WebSocket.OPEN)
      client.send(msg, { binary: false });
    });
  });

  newClient.on("close", () => {
    console.log("Websocket disconnected");
  });
});

console.log("Websocket: ws://localhost:" + portWs);
