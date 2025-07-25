import Redis from 'ioredis';
import { logger } from './logger';

let redisClientInstance: Redis | null = null;

// Initialize Redis only when needed
export function getRedisClient(): Redis {
  if (!redisClientInstance) {
    if (process.env.NODE_ENV === 'test') {
      redisClientInstance = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
        lazyConnect: true, 
        maxRetriesPerRequest: 0, 
        enableOfflineQueue: false
      });
    } else {
      // Normal Redis client for non-test environments
      redisClientInstance = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD
      });
      
      redisClientInstance.on('connect', () => {
        logger.info('Connected to Redis');
      });
      
      redisClientInstance.on('error', (err: any) => {
        logger.error('Redis Client Error: ', err);
      });
    }
  }
  
  return redisClientInstance;
}

export async function closeRedis(): Promise<void> {
  if (redisClientInstance) {
    await redisClientInstance.quit();
    redisClientInstance = null;
    logger.info('Redis connection closed');
  }
}

export const redisClient = getRedisClient();
