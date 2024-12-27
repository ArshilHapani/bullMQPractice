import { Worker } from "bullmq";
import * as dotenv from "dotenv";

dotenv.config();

new Worker(
  "firstQueue",
  async function (job) {
    console.log(`job ${job.id} started -> "${job.data.message}"`);
    await new Promise((res) => setTimeout(res, 1000));
    console.log(`job ${job.id} completed ✅ -> "${job.data.message}"`);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
