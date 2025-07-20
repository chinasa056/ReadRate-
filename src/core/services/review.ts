import { IReviewAttributes } from '../interfaces/review';
import Review from '../models/review';

export const findReview = async (user_id: string,  book_id: string) => {
  return await Review.findOne({ where: { user_id,  book_id } });
};

export const createReview = async (data: IReviewAttributes) => {
  return await Review.create(data);
};

export const updateReview = async (
  user_id: string,
   book_id: string,
  data: {
    rating?: number;
    comment?: string;
  }
) => {
  return await Review.update(data, { where: { user_id,  book_id } });
};

export const getReviewsBybookId = async ( book_id: string) => {
  return await Review.findAll({ where: {  book_id } });
};

export const deleteReview = async (user_id: string,  book_id: string) => {
  return await Review.destroy({ where: { user_id,  book_id } });
};

export const getAverageRating = async ( book_id: string) => {
  const reviews = await Review.findAll({ where: {  book_id:  book_id } });

  if (!reviews.length) return 0;

  const total = reviews.reduce((sum, r: any) => sum + r.rating, 0);
  return total / reviews.length;
};

