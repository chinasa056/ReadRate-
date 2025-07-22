import dotenv from 'dotenv';
dotenv.config();

export const setting = {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    access_token_expires_in: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
    refresh_token_secret_key: process.env.JWT_REFRESH_TOKEN_SECRET_KEY as string,
    refresh_token_expires_in: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN)
  },
  mysql: {
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USERNAME as string,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_NAME as string
  },
  port: Number(process.env.APP_PORT) || 3000,
};
