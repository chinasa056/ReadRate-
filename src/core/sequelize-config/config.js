require('dotenv').config();

const databaseConfig = {
  database: process.env.MYSQL_DATABASE || 'book_management',
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  host: process.env.MYSQL_HOST || 'mysql',
  dialect: 'mysql',
  dialectOptions: {
    bigNumberStrings: true,
  },
};

module.exports = {
  development: {
    ...databaseConfig,
  },
  test: {
    ...databaseConfig,
  },
  staging: {
    ...databaseConfig,
  },
  production: {
    ...databaseConfig,
    logging: false,
  },
};
