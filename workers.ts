import { Worker } from "bullmq";

import { connection } from "./constants";
import { myQueue } from "./queue";

new Worker(
  "firstQueue",
  async function (job) {
    console.log(`Active count ${JSON.stringify(await myQueue.getJobCounts())}`);
    await new Promise((res) => setTimeout(res, 3000));
    console.log(`job ${job.id} completed ✅`);
  },
  {
    connection,
  }
);
