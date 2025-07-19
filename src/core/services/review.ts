
import { IReviewAttributes } from '../interfaces/review';
import Review from '../models/review'

export const findReview = async (userId: string, bookId: string) => {
  return await Review.findOne({ where: { userId, bookId } });
};

export const createReview = async (data:IReviewAttributes) => {
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


