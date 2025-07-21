require('dotenv').config();

const databaseConfig = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
  port: Number(process.env.MYSQL_PORT) || 3306,
};

module.exports = {
  development: { ...databaseConfig },
  test: { ...databaseConfig },
  staging: { ...databaseConfig },
  production: {
    ...databaseConfig,
    logging: false,
  },
};
