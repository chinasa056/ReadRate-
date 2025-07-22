// server.ts
import { setting } from './core/config/application';
import app from './app'; 
import { logger } from './core/utils/logger';
import './core/models';
import './core/database/sequelize'; 

const PORT = setting.port || 5000;
process.on('uncaughtException', (err: Error) => {
  console.error('CRITICAL: Uncaught Exception - Application is crashing!', err.stack || err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('CRITICAL: Unhandled Rejection - Application is crashing!', reason, promise);
  process.exit(1);
});

const startServer = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      console.log(`app is listenin to port: ${PORT}`); 
      logger.info(`
        ##############################################################
        ♦️♦️♦️♦️♦️♦️♦️♦️♦️♦️ App listening on port: ${PORT} ♦️♦️♦️♦️♦️♦️♦️♦️♦️♦️
        ##############################################################
      `);
      logger.info('BullMQ Board is available at http://localhost:1122/admin/queues');
    });

  } catch (error) {
    console.error('Server failed to start due to an unexpected error during listen:', error);
    process.exit(1);
  }
};

startServer();