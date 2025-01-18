import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date; // Add readonly timestamp
  public readonly updatedAt!: Date; // Add readonly timestamp

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static associate(_models: Record<string, typeof Model>): void {}
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
    timestamps: true, // Adds createdAt and updatedAt
    paranoid: true, // Enables soft deletes (deletedAt)
    hooks: {
      beforeCreate: async (user: User) => {
        try {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        } catch (error) {
          console.error('Error hashing password during user creation:', error);
          throw error;
        }
      },
      beforeUpdate: async (user: User) => {
        try {
          if (user.password && user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        } catch (error) {
          console.error('Error hashing password during user update:', error);
          throw error;
        }
      },
    },
    indexes: [
      {
        unique: true,
        fields: ['email'], // Ensure email is unique for quick lookups
      },
    ],
  }
);

export default User;
