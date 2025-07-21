import Redis from 'ioredis';

export const redisClient = new Redis({
  host: process.env.REDIS_CLIENT_HOST,
  port: process.env.REDIS_CLIENT_PORT ? parseInt(process.env.REDIS_CLIENT_PORT, 10) : 6379, 
  username: process.env.REDIS_CLIENT_USERNAME,
  password: process.env.REDIS_CLIENT_PASSWORD,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err: any) => {
  console.error('Redis Client Error: ', err);
});


//  export const redisClient = new Redis({
//   host: process.env.REDIS_CLIENT_HOST,
//   port: process.env.REDIS_CLIENT_PORT,
//   username: process.env.REDIS_CLIENT_USERNAME,
//   password: process.env.REDIS_CLIENT_PASSWORD
// //   tls: {} // Redis Cloud requires TLS
// });

// redisClient.on('connect', () => {
//   console.log('Connected to Redis Cloud');
// });

// redisClient.on('error', (err) => {
//   console.error('Redis error:', err);
// });
