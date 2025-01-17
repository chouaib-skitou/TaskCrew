import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database'; // Import sequelize instance

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static associate(_models: Record<string, typeof Model>): void {
    // Define associations if needed, e.g., User.hasMany(models.Post)
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
    sequelize, // Pass the sequelize instance here
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
