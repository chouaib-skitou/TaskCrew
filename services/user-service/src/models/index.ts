import { Sequelize } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

// Initialize models
const models = {
  User,
};

// Associate models
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize, Sequelize, models };
export default models;
