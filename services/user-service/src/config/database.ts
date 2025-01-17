import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

type Config = {
  url: string;
  dialect: string;
  logging: boolean;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
};

const configurations: Record<string, Config> = {
  development: {
    url: process.env.DEV_DATABASE_URL || '',
    dialect: 'postgres',
    logging: true,
  },
  test: {
    url: process.env.TEST_DATABASE_URL || '',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: process.env.DATABASE_URL || '',
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  },
};

const env: string = process.env.NODE_ENV || 'development';

const currentConfig = configurations[env];

// Ensure the database URL exists
if (!currentConfig.url) {
  throw new Error(`DATABASE_URL is not defined for the environment: ${env}`);
}

// Initialize Sequelize with the correct arguments
const sequelize = new Sequelize(currentConfig.url, {
  dialect: currentConfig.dialect as 'postgres',
  logging: currentConfig.logging,
  ...(currentConfig.dialectOptions && {
    dialectOptions: currentConfig.dialectOptions,
  }),
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export { sequelize };
module.exports = currentConfig; // Export raw configuration for Sequelize CLI
