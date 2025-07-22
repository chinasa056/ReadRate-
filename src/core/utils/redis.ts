import Redis from 'ioredis';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost'; 
const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;
const REDIS_USERNAME = process.env.REDIS_USERNAME; 
const REDIS_PASSWORD = process.env.REDIS_PASSWORD; 

export const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
});

redisClient.on('connect', () => {
  console.log(`Connected to Redis at ${REDIS_HOST}:${REDIS_PORT}`);
});

redisClient.on('error', (err: any) => {
  console.error('Unable to connect to Redis: ', err);
});

