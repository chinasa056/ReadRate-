import { setting } from './core/config/application';
import app from './app';
import { logger } from './core/utils/logger';
import './core/models'; 
import sequelize from './core/database/sequelize';

const PORT = setting.port || 5000;

const startServer = async (): Promise<void> => {
  try {
    console.log("STARTING SERVER............")
    await sequelize.authenticate();
    logger.info('Connected to the Database successfully.');

console.log("Port to be used:", PORT);
    app.listen(PORT, () => {
      console.log(`app is listenin to port: ${PORT}`)
      logger.info(`
        ###############################################################
        ♦️♦️♦️♦️♦️♦️♦️♦️♦️♦️ App listening on port: ${PORT} ♦️♦️♦️♦️♦️♦️♦️♦️♦️♦️
        ###############################################################
      `);
      logger.info('BullMQ Board is available at http://localhost:1122/admin/queues');
    });

  } catch (error) {
 console.error('❌ Unable to connect to the database:', error); // <-- make this change  process.exit(1);
}
};

startServer();
