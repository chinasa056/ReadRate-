import { Router } from "express";
import * as RequestHandler from '../requestHandlers/review'
import { authenticate } from "../middleware/authenticate";
const router = Router();

/**
 * @swagger
 * /api/v1/reviews/{bookId}:
 *   post:
 *     summary: Create or update a review for a book
 *     description: Allows an authenticated user to create a new review or update an existing review for a specific book.
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to review
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "A really engaging and powerful story."
 *     responses:
 *       201:
 *         description: Review created or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     book_id:
 *                       type: string
 *                     user_id:
 *                       type: string
 *                     user_name:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     comment:
 *                       type: string
 *       401:
 *         description: Unauthorized – Missing or invalid token
 *       500:
 *         description: Server error
 */
router.post('/:bookId', authenticate, RequestHandler.createOrUpdateReview);

/**
 * @swagger
 * /api/v1/reviews/{bookId}:
 *   get:
 *     summary: Get all reviews for a book
 *     description: Returns all reviews that have been posted for the specified book.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to retrieve reviews for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_name:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       comment:
 *                         type: string
 *       404:
 *         description: Book not found or no reviews
 *       500:
 *         description: Server error
 */
router.get("/:bookId", RequestHandler.getReviews);

/**
 * @swagger
 * /api/v1/reviews/rating/{bookId}:
 *   get:
 *     summary: Get average rating for a book
 *     description: Returns the average rating score based on all reviews for the specified book.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Average rating retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Average rating retrieved successfully"
 *                 averageRating:
 *                   type: number
 *                   example: 4.3
 *       404:
 *         description: Book not found or no ratings
 *       500:
 *         description: Server error
 */
router.get("/rating/:bookId", RequestHandler.getAverageRating);

/**
 * @swagger
 * /api/v1/reviews/{bookId}:
 *   delete:
 *     summary: Delete a user's review for a book
 *     description: Deletes the authenticated user's review for the specified book.
 *     tags: [Reviews]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review deleted successfully"
 *       401:
 *         description: Unauthorized – Missing or invalid token
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.delete("/:bookId", authenticate, RequestHandler.deleteReview)

export {router as reviewRoutes};