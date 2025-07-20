import { RequestHandler } from 'express';
import * as reviewController from '../../core/controllers/review';
import { responseHandler } from '../../core/helpers/utilities';
import { getCache, setCache } from '../../core/utils/cache';

export const createOrUpdateReview: RequestHandler = async (req, res, next) => {
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

export const getReviews: RequestHandler = async (req, res, next) => {
    const { bookId } = req.params;
    const cacheKey = `reviews:${bookId}`;

    try {
        const cached = await getCache(cacheKey);
        if (cached) {
            return res.status(200).json(responseHandler(cached, 'Reviews fetched (cache)'));
        };

        const reviews = await reviewController.getReviews(bookId);
        await setCache(cacheKey, reviews, 300);
        return res.status(200).json(responseHandler(reviews, 'Reviews fetched successfully'));

    } catch (err) {
        return next(err);
    }
};

export const deleteReview: RequestHandler = async (
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

export const getAverageRating: RequestHandler = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const cacheKey = `averageRating:${bookId}`;
        const cached = await getCache(cacheKey);
        if (cached) {
            return res.status(200).json({ message: 'Average rating fetched (cache)', averageRating: cached });
        };

        const averageRating = await reviewController.fetchAverageRating(bookId);
        await setCache(cacheKey, averageRating, 300);

        return res.status(200).json({ message: 'Average rating fetched successfully', averageRating });
    } catch (error) {
        return next(error);
    }
};
