import ResourceNotFoundError from '../errors/ResourceNotFoundError';
import { ProfileResponse, UserAttributes } from '../interfaces/user';
import { redisClient } from '../utils/redis';
import * as userService from '../services/user';

export const updateUserProfile = async (
  user_id: string,
  body: Partial<UserAttributes>
): Promise<{ [key: string]: any }> => {
  const user = await userService.findUserById(user_id)
  if (!user) {
    throw new ResourceNotFoundError('User not found', null);
  }

  const updatedUser = await userService.updateUserById(user_id, body);
  return updatedUser;
};

export const getUserProfile = async (
  user_name: string
): Promise<ProfileResponse> => {
  const cacheKey = `user:${user_name}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  };

  const user = await userService.findUserByUsername(user_name);
  if (!user) {
    throw new ResourceNotFoundError('User not found', null);
  };

  const result = {
    email: user.email,
  };

  await redisClient.set(cacheKey, JSON.stringify(result), 'EX', 10800);
  return result;
};
