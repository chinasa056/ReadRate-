import {
  Model,
  DataTypes,
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
  UUIDV4
} from 'sequelize';
import sequelize from '../database/sequelize';
import { UserAttributes } from '../interfaces/user';

export class User
  extends Model<
    InferAttributes<User>,
    InferCreationAttributes<
      User,
      {
        omit:
        | 'id'
        | 'is_verified'
        | 'is_admin'
      }
    >
  >
  implements UserAttributes {
  declare id: CreationOptional<string>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare is_verified: boolean;
  declare is_admin: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    sequelize,
    tableName: 'users',
    underscored: true,
  }
);
