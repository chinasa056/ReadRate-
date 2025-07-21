import { Router } from 'express';
import * as RequestHandler from '../requestHandlers/profile';
import { authenticate } from '../middleware/authenticate';

const router = Router();
/**
 * @swagger
 * /api/v1/users/profile/edit:
 *   patch:
 *     summary: Update user profile
 *     description: Allows an authenticated user to update their profile.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: User not found
 */
router.patch('/edit', authenticate, RequestHandler.updateUser);

/**
 * @swagger
 * /api/v1/profile/{user_name}:
 *   get:
 *     summary: Get user profile
 *     description: Returns the public profile of a user by username.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_name
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *       404:
 *         description: User not found
 */
router.get('/:user_name', authenticate, RequestHandler.userProfile);

export { router as profileRoutes };
