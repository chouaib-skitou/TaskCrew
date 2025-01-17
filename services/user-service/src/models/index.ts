import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

// Define a type-safe models object
type Models = {
  User: typeof User;
};

const models: Models = {
  User,
};

// Call the `associate` method for each model, if defined
Object.values(models).forEach((model) => {
  if ('associate' in model && typeof model.associate === 'function') {
    model.associate(models as unknown as Record<string, typeof model>);
  }
});

export { sequelize, Sequelize, models };
export default models;
