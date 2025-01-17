import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

const env = process.env.NODE_ENV || 'development';

let databaseUrl: string;

switch (env) {
  case 'development':
    databaseUrl = process.env.DEV_DATABASE_URL!;
    break;
  case 'test':
    databaseUrl = process.env.TEST_DATABASE_URL!;
    break;
  case 'production':
    databaseUrl = process.env.DATABASE_URL!;
    break;
  default:
    throw new Error('Invalid NODE_ENV, could not determine database URL');
}

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined for the current environment');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
