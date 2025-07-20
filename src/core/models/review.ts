// models/review.ts
import {
  Model,
  DataTypes,
  UUIDV4,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../database/sequelize';

class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare userName: string;
  declare bookId: string;
  declare bookName: string;
  declare rating: number;
  declare comment: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id',
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Books', 
        key: 'id',
      },
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'bookId'],
      },
    ],
  }
);

export default Review;
