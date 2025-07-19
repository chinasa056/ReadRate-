import joi from 'joi';
import {
  GetUserProfileData,
  UpdateUserProfile,
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
      username: string.trim().min(3).required(),
      email: string.trim().email().required(),
      // password: string.min(6).required(),
      password: passwordValidator.password().trim().min(8).required(),
      phone: string.min(6),
      bio: string.min(20).optional().allow('').max(255),
      image: string.min(5).optional().allow('').max(255),
      is_verified: joi.boolean(),
      is_admin: joi.boolean(),
      reputation: joi.number().integer(),
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

export const validateUserProfileUpdate = (requestData: {
  [key: string]: any;
}): UpdateUserProfile => {
  return validate(
    requestData,
    object.keys({
      phone: string.min(6),
      bio: string.min(20).optional().allow('').max(255),
      image: string.min(5).optional().allow('').max(255),
    }),
  );
};

export const validateGetUserProfileData = (requestData: {
  [key: string]: any;
}): GetUserProfileData => {
  return validate(
    requestData,
    object.keys({
      username: string.trim().min(3).required(),
    }),
  );
};
