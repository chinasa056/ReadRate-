import dotenv from 'dotenv';
dotenv.config();

export const setting = {
  jwt: {
    secret: process.env.JWT_SECRET as string,
    access_token_expires_in: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
    refresh_token_secret_key: process.env.JWT_REFRESH_TOKEN_SECRET_KEY as string,
    refresh_token_expires_in: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN)
  },
  port: process.env.APP_PORT as string,
};
