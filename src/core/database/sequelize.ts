import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { databaseConfig } from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    define: {
      underscored: true,
    },
    logging: config.logging ?? env !== 'production',
  }
);

export default sequelize
