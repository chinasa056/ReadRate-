import { DataTypes, Model, Optional,UUIDV4 } from 'sequelize';
import sequelize from '../database/sequelize';
import { IBook } from '../interfaces/book';

interface BookCreationAttributes extends Optional<IBook, 'id' | 'averageRating' | 'summary'> {}

export class Book extends Model<IBook, BookCreationAttributes> implements IBook {
  public id!: string;
  public title!: string;
  public author!: string;
  public genre!: string;
  public publishedDate!: Date;
  public summary?: string;
  public averageRating?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    publishedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    averageRating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    timestamps: true,
  }
);
