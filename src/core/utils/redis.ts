import Redis  from 'ioredis';

export const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port:  Number(process.env.REDIS_PORT),
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err: any) => {
  console.error('Redis Client Error: ', err);
});

// afterAll(async () => {
//   await redisClient.quit();
// });
// config/redis.ts

