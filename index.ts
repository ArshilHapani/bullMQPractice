import express from "express";
import { WebSocket } from "ws";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Arshil is legend",
    listeners: app.getMaxListeners(),
  });
});

const server = app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

// websocket

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Connected");

  ws.send("Welcome to the websocket server");

  ws.on("message", function (message) {
    console.log("Received: " + message);

    ws.send(`You sent -> ${message}`);
  });

  ws.on("close", function () {
    console.log("Client disconnected");
  });
});
console.log("Websocket is running on port ws://localhost:3000");
