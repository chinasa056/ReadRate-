import { RequestHandler } from 'express';
import { responseHandler } from '../../core/helpers/utilities';
import * as profileController from '../../core/controllers/profile';
import { ResponseMessage } from '../../core/constant/responses';
import ResourceNotFoundError from '../../core/errors/ResourceNotFoundError';
import { logger } from '../../core/utils/logger';

export const updateUser: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
   if (!userId) {
       throw new ResourceNotFoundError('User not found', new Error('not found'), {});
     };

    const response = await profileController.updateUserProfile(
      userId,
      req.body,
    );

    res.json(responseHandler(response, ResponseMessage.UpdateUser));
  } catch (error) {
    next(error);
  }
};

export const userProfile: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    logger.info('------>>>>>', req.headers['x-dashboard-error-handler']);
    const response = await profileController.getUserProfile(
      req.params.user_name,
    );

    res.json(responseHandler(response, ResponseMessage.UserProfile));
  } catch (error) {
    next(error);
  }
};
