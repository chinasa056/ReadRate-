import { UserAttributes } from '../interfaces/user';
import { User } from '../models/users';

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  return await User.create(userData);
};


export const updateUserById = async (
  id: string,
  body: Partial<UserAttributes>
) => {
  return await User.update(body, { where: { id } });
};

export const findUserByUsername = async (username: string) => {
  return await User.findOne({ where: { username } });
};

export const findUserById = async (userId: string) => {
  return await User.findByPk(userId);
};