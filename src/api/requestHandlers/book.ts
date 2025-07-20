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

export const getAllBooksHandler: RequestHandler = async (req, res, next) => {
    try {
        const {
            page = '1',
            limit = '10',
            title,
            author,
            genre,
            sortBy,
        } = req.query;

        const books = await bookController.getAllBooksController({
            page: parseInt(page as string, 10),
            limit: parseInt(limit as string, 10),
            title: title as string,
            author: author as string,
            genre: genre as string,
            sortBy: sortBy as string,
        });

        res.status(200).json({ success: true, data: books });
    } catch (error) {
        next(error);
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

export const getTopRatedBooksHandler:RequestHandler = async (req, res, next) => {
  try {
    const books = await bookController.fetchTopRatedBooks();
    return res.status(200).json(responseHandler(books, 'books fetched successfully'))
  } catch (error) {
    return next(error);
  }
};
