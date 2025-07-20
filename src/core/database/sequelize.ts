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

// Retry logic
const MAX_RETRIES = 10;
const RETRY_DELAY = 5000; // 5 seconds

async function connectWithRetry(retries = MAX_RETRIES): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error(`Unable to connect to the database. Retries left: ${retries}`);
    if (retries > 0) {
      setTimeout(() => {
        connectWithRetry(retries - 1);
      }, RETRY_DELAY);
    } else {
      console.error('All retry attempts failed. Exiting...');
      process.exit(1);
    }
  }
}

connectWithRetry();

export default sequelize;
