import type { ConnectionOptions } from "bullmq";
import * as dotenv from "dotenv";

dotenv.config();

const hostname = "localhost";
const port = 6379;

export const connection: ConnectionOptions = {
  host: hostname,
  port,
  //   url: process.env.REDIS_URL,
};
