import { logger } from "@infra/logger/logger.log";
import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => logger.info("Redis off " + err));

export async function connectionRedis() {
  if (!redisClient.isOpen) {
    logger.info("Redis Server is on");
    await redisClient.connect();
  }
}
