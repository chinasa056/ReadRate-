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
