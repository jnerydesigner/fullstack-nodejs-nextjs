import { redisClient } from "./redis";

export async function getFromCache<T>(key: string): Promise<T | null> {
  const cached = await redisClient.get(key);

  return cached ? JSON.parse(cached) : null;
}

export async function setToCache<T>(key: string, data: T, ttlSeconds: number) {
  await redisClient.setEx(key, ttlSeconds, JSON.stringify(data));
}
