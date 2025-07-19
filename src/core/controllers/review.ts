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
    if (!user) {
        throw new Error ('User not found');
    }

    const book = await getBookById(bookId);
    if (!book) {
        throw new Error('Book not found');
    }

    const existingReview = await reviewService.findReview(userId, bookId);
    const { rating, comment } = body;

    if (existingReview) {
        await reviewService.updateReview(userId, bookId, { rating, comment });

        return {
            message: 'Review updated successfully',
            review: {
                ...existingReview.toJSON(),
                rating,
                comment
            },
        };
    }

    const newReview = await reviewService.createReview({
        userId,
        bookId,
        userName: user.username,
        bookName:book.title,
        rating: body.rating,
        comment: body.comment
    });

    return {
        message: 'Review created successfully',
        review: newReview.toJSON(),
    };
};
