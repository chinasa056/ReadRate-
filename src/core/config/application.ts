import dotenv from 'dotenv';
dotenv.config();

export const setting = {
  jwt: {
    secret: process.env.JWT_SECRET as string
  },
  port: process.env.APP_PORT as string,
  secretKey: process.env.JWT_SECRET as string,

};
