import { Router, Request, Response } from 'express';
import { userRoutes } from './user';
import { profileRoutes } from './profile';

export const routes = (): Router => {
  const router = Router();
  router.get('/', (_req: Request, res: Response) => {
    res.json('Welcome to stack_overflow');
  });

  router.use('/api/users', userRoutes);
  router.use('/api/users/profile', profileRoutes);

  return router;
};
