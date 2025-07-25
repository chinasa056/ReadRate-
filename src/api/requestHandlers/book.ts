import { RequestHandler } from 'express';
import * as bookController from '../../core/controllers/book';
import { responseHandler } from '../../core/helpers/utilities';
import { getCache, setCache } from '../../core/utils/cache';
import { ResponseMessage } from '../../core/constant/responses';

export const addBook: RequestHandler = async (req, res, next) => {
    try {
      const userId = req.user?.userId
      if(!userId) {
        return res.status(404).json({message: 'user not found'})
      };
        const newBook = await bookController.createNewBook(userId,req.body);
        res.status(201).json(responseHandler(newBook, ResponseMessage.CreateBook));
    } catch (err) {
       return next(err);
    }
};

export const getAllBooks: RequestHandler = async (req, res, next) => {
  try {
    const {
      page: rawPage,    
      limit: rawLimit, 
      title = '',
      author = '',
      genre = '',
      sortBy = '',
    } = req.query;

    let page = parseInt(rawPage as string, 10);
    if (isNaN(page) || page < 1) { 
      page = 1; 
    }

    let limit = parseInt(rawLimit as string, 10);
    if (isNaN(limit) || limit < 1) { 

    }

    if (limit > 20) { 
        limit = 20;
    }

    const cacheKey = `books:all:page=${page}:limit=${limit}:title=${title}:author=${author}:genre=${genre}:sort=${sortBy}`;
    
    const cachedData = await getCache(cacheKey);
    if (cachedData) {
      return res.status(200).json({ success: true, cached: true, data: cachedData });
    }

    const books = await bookController.getAllBooksController({
      page: page, 
      limit: limit, 
      title: title as string,
      author: author as string,
      genre: genre as string,
      sortBy: sortBy as string,
    });

    await setCache(cacheKey, books, 300);

    res.status(200).json(responseHandler(books, ResponseMessage.GetBook));
  } catch (error) {
    return next(error);
  }
};

export const getBook: RequestHandler = async (req, res, next) => {
  const bookId = req.params.id;
  const cacheKey = `books:${bookId}`;

  try {
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.json(responseHandler(cached, 'Book retrieved (cache)'));
    };

    const book = await bookController.fetchBookById(bookId);
    await setCache(cacheKey, book, 900);
    return res.json(responseHandler(book, ResponseMessage.GetBook));
  } catch (err) {
   return next(err);
  };
};

export const updateBook: RequestHandler = async (req, res, next) => {
    try {
        const bookId = req.params.id
        const updatedBook = await bookController.updateBookById(bookId, req.body);
        res.status(200).json(responseHandler(updatedBook, ResponseMessage.UpdateBook));
    } catch (err) {
        next(err);
    };
};

export const deleteBook: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id
        await bookController.deleteBookById(id);
        res.status(200).json({ message: ResponseMessage.DeleteBook });
    } catch (err) {
        next(err);
    };
};

export const getTopRatedBooksHandler: RequestHandler = async (req, res, next) => {
  const cacheKey = 'books:top-rated';

  try {
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json(responseHandler(cached, 'Books fetched (cache)'));
    };

    const books = await bookController.fetchTopRatedBooks();
    await setCache(cacheKey, books, 600);
    return res.status(200).json(responseHandler(books, ResponseMessage.GetTopRatedBooks));
  } catch (error) {
   return next(error);
  };
};

