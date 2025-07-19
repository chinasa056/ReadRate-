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
        | 'reputation';
      }
    >
  >
  implements UserAttributes {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare phone: string;
  declare bio?: string;
  declare image?: string;
  declare is_verified: boolean;
  declare is_admin: boolean;
  declare reputation: number;
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
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
    },
    reputation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'users',
    underscored: true,
  }
);
