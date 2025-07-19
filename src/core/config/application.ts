import dotenv from 'dotenv';
dotenv.config();

export const setting = {
  port: process.env.APP_PORT as string,
  secretKey: process.env.ACCESS_TOKEN as string,
};
