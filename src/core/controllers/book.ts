import * as bookService from '../services/book';
import { IBook } from '../interfaces/book';
import { getTopRatedBooks } from '../services/book';

export const createNewBook = async (bookData: IBook) => {
    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.publishedDate) {
        throw new Error('Missing required book fields');
    };
  return await bookService.createBook(bookData);
};

interface GetAllBooksOptions {
  page: number;
  limit: number;
  title?: string;
  author?: string;
  genre?: string;
  sortBy?: string;
};

export const getAllBooksController = async (options: GetAllBooksOptions) => {
  return await bookService.getAllBooks(options);
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

export const fetchTopRatedBooks = async () => {
  return await getTopRatedBooks();
};
