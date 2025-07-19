import { RequestHandler } from 'express';
import { responseHandler } from '../../core/helpers/utilities';
import * as profileController from '../../core/controllers/profile';
import { validateUserProfileUpdate } from '../../core/validations/userValidations';
import { ResponseMessage } from '../../core/constant/responses';

export const updateUser: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    const validateUpdateData = validateUserProfileUpdate(req.body);
    const response = await profileController.updateUserProfile(
      res.locals.user,
      validateUpdateData,
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
    console.log('------>>>>>', req.headers['x-dashboard-error-handler']);
    const response = await profileController.getUserProfile(
      req.params.username,
    );

    res.json(responseHandler(response, ResponseMessage.UserProfile));
  } catch (error) {
    next(error);
  }
};
