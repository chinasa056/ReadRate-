import { setting } from './core/config/application';
import app from './app';
import { logger } from './core/utils/logger';
import './core/models'; 
import sequelize from './core/database/sequelize';

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info('Connected to the Database successfully.');

    app.listen(setting.port, () => {
      logger.info(`
        ###############################################################
        ♦️♦️♦️♦️♦️♦️♦️♦️♦️♦️ App listening on port: ${setting.port} ♦️♦️♦️♦️♦️♦️♦️♦️♦️♦️
        ###############################################################
      `);
      logger.info('BullMQ Board is available at http://localhost:1122/admin/queues');
    });

  } catch (error) {
    logger.error('❌ Unable to connect to the database:', error);
    process.exit(1); // shut down gracefully if DB connection fails
  }
};

startServer();
