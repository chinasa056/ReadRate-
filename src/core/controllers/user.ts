import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthorizationError from '../errors/AuthorizationError';
import { setting } from '../config/application';
import { logger } from '../utils/logger';

import {
  UserLoginRequest,
  UserLoginResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '../interfaces/user';

import * as userService from '../services/user';

export const processUserRegistration = async (
  body: UserRegistrationRequest,
): Promise<UserRegistrationResponse> => {
  const userExist = await userService.findUserByEmail(body.email);
  if (userExist) {
    throw new Error('User with this email already exists');
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.password, salt);

  const newUser = await userService.createUser({
    user_name: body.user_name,
    email: body.email,
    password: hashedPassword
  });

  logger.info('User registration successful');
  return {
    message: 'User registration successful',
    user: newUser,
  };
};

export const processUserLogin = async (
  body: UserLoginRequest,
): Promise<UserLoginResponse> => {
  const user = await userService.findUserByEmail(body.email);
  if (!user) {
    throw new AuthorizationError('Email or password incorrect', null);
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    throw new AuthorizationError('Wrong password', null);
  }

  const token = jwt.sign(
    {
      user: {
        userId: user.id,
        user_name: user.user_name,
        isAdmin: user.is_admin
      },
    },
    setting.secretKey,
    { expiresIn: '1d' },
  );

  logger.info('Login successful');

  return {
    email: user.email,
    token,
  };
};
