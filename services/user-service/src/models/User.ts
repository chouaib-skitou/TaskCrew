import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // Define optional `associate` method for associations
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static associate(_models: Record<string, typeof Model>) {
    // Define associations here if needed
    // Example:
    // this.hasMany(_models.Post, { foreignKey: 'userId', as: 'posts' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
