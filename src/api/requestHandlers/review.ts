import { RequestHandler } from 'express';
import * as reviewController from '../../core/controllers/review';
import { responseHandler } from '../../core/helpers/utilities';

export const createOrUpdateReviewHandler: RequestHandler = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const { bookId } = req.params;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        };
        const review = await reviewController.createOrUpdateReview(userId, bookId, req.body);
        return res.status(201).json(responseHandler(review.data, review.message));

    } catch (err) {
        return next(err);
    }
};

export const getReviewsHandler: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        const { bookId } = req.params;
        const reviews = await reviewController.getReviews(bookId);
        res.status(200).json(responseHandler(reviews, 'Reviews fetched successfully'))
        return
    } catch (err) {
        next(err);
    }
};

export const deleteReviewHandler: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        const userId = req.user?.userId;
        const { bookId } = req.params;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        };
        const result = await reviewController.deleteReview(userId, bookId);
        return res.status(200).json({ message: result.message, })
    } catch (err) {
       return next(err);
    }
};

export const getAverageRatingHandler: RequestHandler = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const averageRating = await reviewController.fetchAverageRating(bookId);
    return res.status(200).json({message: "Average rating fetched successfully", averageRating})
  } catch (error) {
   return next(error);
  }
};
