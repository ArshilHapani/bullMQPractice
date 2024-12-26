import { Queue } from "bullmq";

import { connection } from "./constants";

export const myQueue = new Queue("firstQueue", {
  connection,
});
