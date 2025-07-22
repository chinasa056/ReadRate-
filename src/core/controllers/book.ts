import * as bookService from '../services/book';
import { GetAllBooksOptions, IBook } from '../interfaces/book';
import { findUserById } from '../services/user';
import { CustomError } from '../errors/CustomError';
import { ErrorCode } from '../enum/error';
import { HttpStatus } from '../enum/httpCode';

export const createNewBook = async (user_id: string, bookData: IBook) => {
  const user = await findUserById(user_id)
   if (!user) {
    throw new CustomError(
      "user not found",
      ErrorCode.NOT_FOUND,
      HttpStatus.NOT_FOUND
    );
  };

    if (!bookData.title || !bookData.author || !bookData.genre || !bookData.published_date) {
        throw new Error('Missing required book fields');
    };
  return await bookService.createBook(bookData);
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
  return await bookService.getTopRatedBooks();
};
