import bcrypt from 'bcryptjs';
import AuthorizationError from '../errors/AuthorizationError';
import { logger } from '../utils/logger';
import ResourceNotFoundError from '../errors/ResourceNotFoundError';
import BadRequestError from '../errors/BadRequestError';
import {
  UserLoginRequest,
  UserLoginResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '../interfaces/user';

import { cacheRefreshToken, generateAccessJwtToken, generateRefreshJwtToken, isRefreshTokenValid } from '../helpers/auth';
import { createUser, findUserByEmail, findUserById } from '../services/user';


export const processUserRegistration = async (
  body: UserRegistrationRequest,
): Promise<UserRegistrationResponse> => {
  const userExist = await findUserByEmail(body.email);
  if (userExist) {
    throw new Error('User with this email already exists');
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(body.password, salt);

  const newUser = await createUser({
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
  const user = await findUserByEmail(body.email);
  if (!user) {
    throw new AuthorizationError('Email or password incorrect', null);
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    throw new AuthorizationError('Wrong password', null);
  }

  const accessToken = generateAccessJwtToken({ userId: user.id, user_name: user.user_name, isAdmin: user.is_admin });
  const refreshToken = generateRefreshJwtToken({ id: user.id });
  await cacheRefreshToken({ userId: user.id, refreshToken }); 

  logger.info('Login successful');

  return {
    email: user.email,
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

export const refreshToken = async (data: {
  userId: string;
  refreshToken: string;
}): Promise<{ id: string; user_name: string; email: string; accessToken: string; refreshToken: string }> => {
  const user = await findUserById(data.userId);
  if (!user) {
    throw new ResourceNotFoundError('User not found', null);
  }
  const isTokenValid = await isRefreshTokenValid({ userId: data.userId, refreshToken: data.refreshToken });
  if (!isTokenValid) {
    throw new BadRequestError('Invalid refresh token', null);
  }

  const refreshToken = generateRefreshJwtToken({ id: user.id });
  const accessToken = generateAccessJwtToken({ userId: user.id, user_name: user.user_name, isAdmin: user.is_admin });
  await cacheRefreshToken({ userId: user.id, refreshToken });

  const { id, user_name, email } = user;
  return { id, email, user_name, accessToken, refreshToken };
}

