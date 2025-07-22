import dotenv from 'dotenv';
import { setting } from './application';
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
  database: setting.mysql.database!,
  username: setting.mysql.user!,
  password: setting.mysql.password!,
  host: setting.mysql.host!,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
  port: setting.mysql.port || 3306,
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
