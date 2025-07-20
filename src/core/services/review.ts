import { IReviewAttributes } from '../interfaces/review';
import Review from '../models/review';

export const findReview = async (userId: string, bookId: string) => {
  return await Review.findOne({ where: { userId, bookId } });
};

export const createReview = async (data: IReviewAttributes) => {
  return await Review.create(data);
};

export const updateReview = async (
  userId: string,
  bookId: string,
  data: {
    rating?: number;
    comment?: string;
  }
) => {
  return await Review.update(data, { where: { userId, bookId } });
};

export const getReviewsByBookId = async (bookId: string) => {
  return await Review.findAll({ where: { bookId } });
};

export const deleteReview = async (userId: string, bookId: string) => {
  return await Review.destroy({ where: { userId, bookId } });
};

export const getAverageRating = async (bookId: string) => {
  const reviews = await Review.findAll({ where: { bookId: bookId } });

  if (!reviews.length) return 0;

  const total = reviews.reduce((sum, r: any) => sum + r.rating, 0);
  return total / reviews.length;
};

