import * as bookService from '../services/book';
import { IBook } from '../interfaces/book';

export const createNewBook = async (bookData: IBook) => {
    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.publishedDate) {
        throw new Error('Missing required book fields');
    };
  return await bookService.createBook(bookData);
};

export const fetchBooks = async () => {
  return await bookService.getAllBooks();
};

export const fetchBookById = async (id: string) => {
  const book = await bookService.getBookById(id);
  if (!book) throw new Error('Book not found');
  return book;
};

export const updateBookById = async (id: string, bookData: IBook) => {
  const book = await bookService.getBookById(id);
  if (!book) throw new Error('Book not found');
  
  return await bookService.updateBook(id, bookData);
};

export const deleteBookById = async (id: string) => {
  const book = await bookService.getBookById(id);
  if (!book) throw new Error('Book not found');
  
  return await bookService.deleteBook(id);
};

