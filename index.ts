import express from "express";
import { WebSocket } from "ws";

import { myQueue } from "./queue";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const messages = await myQueue.getWaiting();
  const completedJobs = await myQueue.getCompletedCount();
  res.json({
    messages: messages.map((item) => item.data),
    completedJobs,
  });
});

const server = app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

app.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    res.status(400).json({ message: "Message is required" });
    return;
  }
  await myQueue.add(
    "myJob",
    { message },
    {
      removeOnComplete: 10 /*|| true*/, // for practice ideal can be 1000+
      removeOnFail: 50, // for practice ideal can be > removeOnComplete (5000)
    }
  );
  res.json({
    message: "Message added to the queue",
  });
});

// ignore this part if you are not interested in websocket

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
