import { setting } from './core/config/application';
import app from './app';
import { logger } from './core/utils/logger';
import sequelize from './core/database/sequelize';

// sequelize.authenticate().then(() => {   //this can be used to test the connection
sequelize.sync().then(() => {
  logger.info('Connected to the Database');
});

const startServer = async (): Promise<void> => {
  app.listen(setting.port, () => {
    logger.info(`
        ###############################################################
        ♦️♦️♦️♦️♦️♦️♦️♦️♦️♦️♦️ App listening on port: ${setting.port} ♦️♦️♦️♦️♦️♦️♦️♦️♦️♦️
        ###############################################################
        `);
    logger.info('BullMQ Board is available at http://localhost:1122/admin/queues')
  });
};

startServer();
