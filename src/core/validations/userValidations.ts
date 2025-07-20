import joi from 'joi';
import {
  GetUserProfileData,
  UserLoginRequest,
  UserRegistrationRequest,
} from '../interfaces/user';
import { validate } from '../helpers/utilities';
import { passwordValidator } from '../helpers/validators';

const { object, string } = joi.types();

export const validateUserRegistration = (requestData: {
  [key: string]: any;
}): UserRegistrationRequest => {
  return validate(
    requestData,
    object.keys({
      user_name: string.trim().min(3).required(),
      email: string.trim().email().required(),
      // password: string.min(6).required(),
      password: passwordValidator.password().trim().min(8).required(),
      is_verified: joi.boolean(),
      is_admin: joi.boolean(),
    }),
  );
};

export const validateLogin = (requestData: {
  [key: string]: any;
}): UserLoginRequest => {
  return validate(
    requestData,
    object.keys({
      email: string.trim().email().required(),
      password: string.min(6).required(),
    }),
  );
};

export const validateGetUserProfileData = (requestData: {
  [key: string]: any;
}): GetUserProfileData => {
  return validate(
    requestData,
    object.keys({
      user_name: string.trim().min(3).required(),
    }),
  );
};
