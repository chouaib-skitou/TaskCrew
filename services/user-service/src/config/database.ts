/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const configurations = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    logging: true,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  },
};

// Define the keys of the configurations explicitly
type ConfigKeys = keyof typeof configurations;

const env = (process.env.NODE_ENV || 'development') as ConfigKeys; // Explicitly cast `env` to the correct type

const currentConfig = configurations[env];

// Ensure the database URL exists
if (!currentConfig.url) {
  throw new Error(`DATABASE_URL is not defined for the environment: ${env}`);
}

// Handle the optional `dialectOptions` field
const sequelizeConfig: any = {
  dialect: currentConfig.dialect,
  logging: currentConfig.logging,
};

if ('dialectOptions' in currentConfig && currentConfig.dialectOptions) {
  sequelizeConfig.dialectOptions = currentConfig.dialectOptions;
}

export const sequelize = new Sequelize(currentConfig.url, sequelizeConfig);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
