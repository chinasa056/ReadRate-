require('dotenv').config();

const databaseConfig = {
  database: process.env.DATABASE_NAME || 'book_management',
  username: process.env.DATABASE_USERNAME || 'user',
  password: process.env.DATABASE_PASSWORD || 'userpass',
  host: process.env.DATABASE_HOST || 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
  port: Number(process.env.MYSQL_PORT) || 3307,
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
