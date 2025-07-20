import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../database/sequelize';
import { IBook } from '../interfaces/book';

interface BookCreationAttributes extends Optional<IBook, 'id' | 'average_rating' | 'summary'> { }

export class Book extends Model<IBook, BookCreationAttributes> implements IBook {
  public id!: string;
  public title!: string;
  public author!: string;
  public genre!: string;
  public published_date!: Date;
  public summary?: string;
  public averageRating?: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    average_rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
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
    }
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: true,
  }
);
