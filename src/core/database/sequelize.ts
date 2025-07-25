import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { databaseConfig } from '../config/config';
import { logger } from '../utils/logger';

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
 
const MAX_RETRIES = 10;
const RETRY_DELAY = 5000;

// Exported for testing purposes
export async function connectWithRetry(retries = MAX_RETRIES): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');
  } catch (error) {
    logger.error(`Unable to connect to the database. Retries left: ${retries}`);
    
    if (retries > 0 && process.env.NODE_ENV !== 'test') {
      // In non-test environments, retry the connection
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(connectWithRetry(retries - 1));
        }, RETRY_DELAY);
      });
    } else if (process.env.NODE_ENV !== 'test') {
      // Only exit in non-test environments
      logger.error('All database connection retry attempts failed');
      process.exit(1);
    }
  }
}

if (process.env.NODE_ENV !== 'test') {
  connectWithRetry().catch(err => {
    logger.error('Failed to connect to database:', err);
  });
}

export default sequelize;
