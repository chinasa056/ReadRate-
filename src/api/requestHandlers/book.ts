import { RequestHandler } from 'express';
import * as bookController from '../../core/controllers/book';
import { responseHandler } from '../../core/helpers/utilities';

export const addBook: RequestHandler = async (req, res, next) => {
  try {
    const newBook = await bookController.createNewBook(req.body);
    res.status(201).json(responseHandler(newBook, 'Book created successfully'));
  } catch (err) {
    next(err);
  }
};

export const getBooks: RequestHandler = async (req, res, next) => {
  try {
    const books = await bookController.fetchBooks();
    res.json(responseHandler(books, 'Books retrieved'));
  } catch (err) {
    next(err);
  }
};

export const getBook: RequestHandler = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await bookController.fetchBookById(bookId);
    res.json(responseHandler(book, 'Book retrieved'));
  } catch (err) {
    next(err);
  }
};
export const updateBook: RequestHandler = async (req, res, next) => {
  try {
    const bookId = req.params.id
    const updatedBook = await bookController.updateBookById(bookId, req.body);
    res.json(responseHandler(updatedBook, 'Book updated successfully'));
  } catch (err) {
    next(err);
  }
};

export const deleteBook: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = bookController.deleteBookById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};