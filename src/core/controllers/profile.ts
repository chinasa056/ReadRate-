import ResourceNotFoundError from '../errors/ResourceNotFoundError';
import { ProfileResponse, UserAttributes } from '../interfaces/user';
import { User } from '../models/users';
import { redisClient } from '../utils/redis';
import * as userService from '../services/user';

export const updateUserProfile = async (
  currentUser: User | undefined,
  body: Partial<UserAttributes>
): Promise<{ [key: string]: any }> => {
  if (!currentUser) {
    throw new ResourceNotFoundError('User not found', new Error('not found'), {});
  }

  const updatedUser = await userService.updateUserById(currentUser.id, body);
  return updatedUser;
};

export const getUserProfile = async (
  username: string
): Promise<ProfileResponse> => {
  const cacheKey = `user:${username}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const user = await userService.findUserByUsername(username);
  if (!user) {
    throw new ResourceNotFoundError('User not found', null);
  }

  const result = {
    email: user.email,
  };

  await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 10800);
  return result;
};
