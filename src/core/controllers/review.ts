import * as reviewService from '../services/review';
import { getBookById } from '../services/book';
import { ICreateReviewResponse, IReviewAttributes } from '../interfaces/review';
import { findUserById } from '../services/user';
import ResourceNotFoundError from '../errors/ResourceNotFoundError';
// import { ResponseMessage } from '../constant/responses';

export const createOrUpdateReview = async (
  user_id: string,
   book_id: string,
  body: IReviewAttributes
): Promise<ICreateReviewResponse> => {
  const user = await findUserById(user_id);
  if (!user) throw new Error('User not found');

  const book = await getBookById( book_id);
  if (!book) throw new ResourceNotFoundError('Book not found', null);

  const { rating, comment } = body;
  const existingReview = await reviewService.findReview(user_id,  book_id);

  let review;

  if (existingReview) {
    await reviewService.updateReview(user_id,  book_id, { rating, comment });
    review = await reviewService.findReview(user_id,  book_id);
  } else {
    review = await reviewService.createReview({
      user_id,
       book_id,
      user_name: user.user_name,
      book_name: book.title,
      rating,
      comment
    });
  }

  const allReviews = await reviewService.getReviewsBybookId( book_id);
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

export const getReviews = async ( book_id: string) => {
  return await reviewService.getReviewsBybookId( book_id);
};

export const deleteReview = async (user_id: string,  book_id: string) => {
  const review = await reviewService.findReview(user_id,  book_id);
  if (!review) throw new Error('Review not found');
  await reviewService.deleteReview(user_id,  book_id);
  return { message: 'Review deleted successfully' };
};

export const fetchAverageRating = async ( book_id: string) => {
  return await reviewService.getAverageRating( book_id);
};
