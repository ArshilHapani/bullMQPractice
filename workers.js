import { Worker } from "bullmq";

new Worker(
  "firstQueue",
  async function (job) {
    console.log(job.data);
    await new Promise((res) => setTimeout(res, 4000));
    console.log(`job ${job.id} completed ✅`);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);
