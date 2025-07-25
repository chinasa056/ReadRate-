import { Router } from "express";
import * as RequestHandler from "../requestHandlers/book";
import { authenticate } from "../middleware/authenticate";
import { authorizeAdmin } from "../middleware/authorization";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: Book management endpoints
 */

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - published_date
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Alchemist"
 *               author:
 *                 type: string
 *                 example: "Paulo Coelho"
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *               published_date:
 *                 type: string
 *                 format: date
 *                 example: "1988-04-15"
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, RequestHandler.addBook);


/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [highestRated, oldest, newest]
 *     responses:
 *       200:
 *         description: List of books
 *       500:
 *         description: Server error
 */
router.get("/", RequestHandler.getAllBooks);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             example:
 *               message: "Book found"
 *               data:
 *                 _id: "64fa26b7f4f1e6ad9cbb4a32"
 *                 title: "The Angel"
 *                 author: "Olanda Ryans"
 *                 genre: "Romance"
 *                 published_date: "2024-03-12"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Book not found"
 */
router.get("/:id", RequestHandler.getBook);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Angel Returns"
 *               author:
 *                 type: string
 *                 example: "Olanda Ryans"
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             example:
 *               message: "Book updated successfully"
 *               data:
 *                 _id: "64fa26b7f4f1e6ad9cbb4a32"
 *                 title: "The Angel Returns"
 *       404:
 *         description: Book not found
 */
router.patch("/:id", authenticate, authorizeAdmin, RequestHandler.updateBook);

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             example:
 *               message: "Book deleted successfully"
 *       404:
 *         description: Book not found
 */
router.delete("/:id", authenticate, authorizeAdmin, RequestHandler.deleteBook);

/**
 * @swagger
 * /api/v1/books/top-rated:
 *   get:
 *     summary: Get top-rated books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Top-rated books
 *         content:
 *           application/json:
 *             example:
 *               message: "Top-rated books retrieved"
 *               data:
 *                 books:
 *                   - title: "The Angel"
 *                     author: "Olanda Ryans"
 *                     rating: 4.9
 *       500:
 *         description: Server error
 */
router.get("/top-rated", RequestHandler.getTopRatedBooksHandler)

export { router as bookRoutes };
