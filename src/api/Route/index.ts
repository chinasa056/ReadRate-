import { Router, Request, Response } from 'express';
import { userRoutes } from './user';
import { profileRoutes } from './profile';
import { bookRoutes } from './book';
import { reviewRoutes } from './review';

export const routes = (): Router => {
  const router = Router();
  router.get('/', (_req: Request, res: Response) => {
    res.json('Welcome to ReadRate');
  });
  const appVersion = '/api/v1'

  router.use(`${appVersion}/users`, userRoutes);
  router.use(`${appVersion}/users/profile`, profileRoutes);
  router.use(`${appVersion}/books`,bookRoutes )
  router.use(`${appVersion}/reviews`,reviewRoutes )

  return router;
};
