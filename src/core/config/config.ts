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
  database: process.env.MYSQL_DATABASE || 'book_management',
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  host: process.env.MYSQL_HOST || 'mysql', // Docker-compatible host
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
