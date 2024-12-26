import express from "express";
import { WebSocket } from "ws";

import { myQueue } from "./queue";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  console.log("processing request...");
  const messages = await myQueue.getWaiting();
  const completedJobs = await myQueue.getCompletedCount();

  res.json({
    message: "Arshil is legend",
    listeners: app.getMaxListeners(),
    messages: messages.map((item) => item.data),
    completedJobs,
  });
});

const server = app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

app.post("/", async (req, res) => {
  const name = req.body?.name as string;
  if (!name) {
    res.status(401);
    res.json({
      message: "Please provide name",
    });
    return;
  }
  await myQueue.add("users", name, {
    removeOnComplete: 10, // for practice ideal can be 1000+
    removeOnFail: 50, // for practice ideal can be > removeOnComplete (5000)
  });
  res.json({
    message: "name added!",
  });
});
// websocket

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Connected");
  ws.send("Welcome to the websocket server");

  ws.on("message", async function (message) {
    await myQueue.add("message", message);
    console.log("Received: " + message);
    ws.send(`You sent -> ${message}`);
  });

  ws.on("close", function () {
    console.log("Client disconnected");
  });
});
console.log("Websocket is running on port ws://localhost:3000");
