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
  declare user_id: string;
  declare user_name: string;
  declare  book_id: string;
  declare book_name: string;
  declare rating: number;
  declare comment: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id',
      },
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     book_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Books', 
        key: 'id',
      },
    },
    book_name: {
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
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
