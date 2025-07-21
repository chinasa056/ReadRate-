import { redisClient } from './redis';

export const setCache = async (key: string, data: any, ttl: number = 300) => {
  await redisClient.set(key, JSON.stringify(data), 'EX', ttl);
};

export const getCache = async (key: string) => {
  const cached = await redisClient.get(key);
  return cached ? JSON.parse(cached) : null;
};

export const deleteCache = async (key: string) => {
  await redisClient.del(key);
};

export const cacheExpiry = async (key: string, ttl: number) => {
  await redisClient.expire(key, ttl);
}
