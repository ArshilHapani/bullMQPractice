import type { ConnectionOptions } from "bullmq";
import * as dotenv from "dotenv";

dotenv.config();

const mode = process.env.NODE_ENV || "development";

const hostname =
  mode === "development" ? "localhost" : process.env.REDIS_HOSTNAME;
const port =
  mode === "development" ? 6379 : parseInt(process.env.REDIS_PORT ?? "6379");
const password = mode === "development" ? "" : process.env.REDIS_PASSWORD;

export const connection: ConnectionOptions = {
  host: hostname,
  port,
  password,
};
