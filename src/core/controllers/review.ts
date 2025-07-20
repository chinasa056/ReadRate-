import * as reviewService from '../services/review';
import { getBookById } from '../services/book';
import { ICreateReviewResponse, IReviewAttributes } from '../interfaces/review';
import { findUserById } from '../services/user';

export const createOrUpdateReview = async (
  userId: string,
  bookId: string,
  body: IReviewAttributes
): Promise<ICreateReviewResponse> => {
  const user = await findUserById(userId);
  if (!user) throw new Error('User not found');

  const book = await getBookById(bookId);
  if (!book) throw new Error('Book not found');

  const { rating, comment } = body;
  const existingReview = await reviewService.findReview(userId, bookId);

  let review;

  if (existingReview) {
    await reviewService.updateReview(userId, bookId, { rating, comment });
    review = await reviewService.findReview(userId, bookId);
  } else {
    review = await reviewService.createReview({
      userId,
      bookId,
      userName: user.username,
      bookName: book.title,
      rating,
      comment,
    });
  }

  const allReviews = await reviewService.getReviewsByBookId(bookId);
  const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
  book.averageRating = totalRating / allReviews.length;
  await book.save();

if (!review) throw new Error('Review could not be created or retrieved');

return {
    status: true,
  message: existingReview
    ? 'Review updated successfully'
    : 'Review created successfully',
  data: review.toJSON(),
};
}

export const getReviews = async (bookId: string) => {
  return await reviewService.getReviewsByBookId(bookId);
};

export const deleteReview = async (userId: string, bookId: string) => {
  const review = await reviewService.findReview(userId, bookId);
  if (!review) throw new Error('Review not found');
  await reviewService.deleteReview(userId, bookId);
  return { message: 'Review deleted successfully' };
};

export const fetchAverageRating = async (bookId: string) => {
  return await reviewService.getAverageRating(bookId);
};
