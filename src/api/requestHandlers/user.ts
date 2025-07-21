import { RequestHandler } from 'express';
import { responseHandler } from '../../core/helpers/utilities';
import * as userController from '../../core/controllers/user';
import {
  validateLogin,
  validateUserRegistration,
} from '../../core/validations/userValidations';
import { ResponseMessage } from '../../core/constant/responses';

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const validatedData = validateUserRegistration(req.body);
    const response = await userController.processUserRegistration(validatedData);
    res.json(responseHandler(response, ResponseMessage.SuccessfulRegistration));
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const validatedData = validateLogin(req.body);
    const response = await userController.processUserLogin(validatedData);
    res.json(responseHandler(response, ResponseMessage.SuccessfulLogin));
  } catch (error) {
    next(error);
  }
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.userId
    if(!userId){
      return res.status(404).json({message: 'User not found'});
    };
    const user = await userController.refreshToken({ userId, refreshToken: req.body.refresh_token });
    res.json(responseHandler(user, 'User access token refreshed successfully'));
  } catch (error) {
   return next(error);
  }
};
