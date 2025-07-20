import { Router } from 'express';
import * as RequestHandler from '../requestHandlers/profile';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.patch('/edit', authenticate, RequestHandler.updateUser);
router.get('/:user_name', authenticate, RequestHandler.userProfile);

export { router as profileRoutes };
