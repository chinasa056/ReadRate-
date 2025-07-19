import { Book } from '../models/book';
import { IBook } from '../interfaces/book';

export const createBook = async (bookData: IBook): Promise<Book> => {
  return await Book.create(bookData);
};

export const getAllBooks = async (): Promise<Book[]> => {
  return await Book.findAll({ order: [['createdAt', 'DESC']] });
};

export const getBookById = async (id: string): Promise<Book | null> => {
  return await Book.findByPk(id);
};

export const updateBook = async (id: string, bookData: Partial<IBook>): Promise<[number, Book[]]> => {
  return await Book.update(bookData, { where: { id }, returning: true });
};

export const deleteBook = async (id: string): Promise<number> => {
  return await Book.destroy({ where: { id } });
};
