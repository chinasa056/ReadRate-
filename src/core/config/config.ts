import dotenv from 'dotenv';
dotenv.config();

export interface DBConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port?: number;
  dialect: any;
  dialectOptions?: any;
  logging?: boolean;
}

const baseConfig: DBConfig = {
  database: process.env.DATABASE_NAME!,
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  host: process.env.DATABASE_HOST!,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
  port: Number(process.env.MYSQL_PORT) || 3306,
};

export const databaseConfig: Record<string, DBConfig> = {
  development: baseConfig,
  test: baseConfig,
  staging: baseConfig,
  production: {
    ...baseConfig,
    logging: false,
  },
};
