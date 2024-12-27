import { Worker } from "bullmq";

import { connection } from "./constants";

new Worker(
  "firstQueue",
  async function (job) {
    console.log(`job ${job.id} started -> "${job.data}"`);
    await new Promise((res) => setTimeout(res, 1000));
    console.log(`job ${job.id} completed ✅ -> "${job.data}"`);
  },
  {
    connection,
  },
);
