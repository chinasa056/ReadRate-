import { Book } from '../models/book';
import { IBook } from '../interfaces/book';
import { Op } from 'sequelize';
import { Review } from '../models';

export const createBook = async (bookData: IBook): Promise<Book> => {
  return await Book.create(bookData);
};

interface GetAllBooksOptions {
  page: number;
  limit: number;
  title?: string;
  author?: string;
  genre?: string;
  sortBy?: string;
}

export const getAllBooks = async ({
  page,
  limit,
  title,
  author,
  genre,
  sortBy,
}: GetAllBooksOptions) => {
  const offset = (page - 1) * limit;

  const whereClause: any = {};
  if (title) whereClause.title = { [Op.like]: `%${title}%` };
  if (author) whereClause.author = { [Op.like]: `%${author}%` };
  if (genre) whereClause.genre = { [Op.like]: `%${genre}%` };

  let order: any = [['created_at', 'DESC']]; // Default sort: newest
  if (sortBy === 'highestRated') order = [['averageRating', 'DESC']];
  else if (sortBy === 'oldest') order = [['created_at', 'ASC']];

  const { rows: books, count } = await Book.findAndCountAll({
    where: whereClause,
    order,
    limit,
    offset,
  });

  return {
    books,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalBooks: count,
  };
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

export const getTopRatedBooks = async () => {
  const books = await Book.findAll({
    include: [{ model: Review, as: 'reviews' }],
  });

  const booksWithAvgRating = books.map((book: any) => {
    const highRatedReviews = book.reviews.filter((r: any) => r.rating >= 4.5);
    const ratings = highRatedReviews.map((r: any) => r.rating);
    
    const averageRating = ratings.length
      ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
      : 0;

    return { ...book.toJSON(), averageRating };
  });

  return booksWithAvgRating
    .filter((book) => book.averageRating >= 4.5)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 10);
};

