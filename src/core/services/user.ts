import { User } from '../models/users';
import { UpdateUserProfile } from '../interfaces/user';

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
  phone: string;
  bio?: string;
  image?: string;
}) => {
  return await User.create(userData);
};


export const updateUserById = async (
  id: number,
  body: UpdateUserProfile
) => {
  return await User.update(body, { where: { id } });
};

export const findUserByUsername = async (username: string) => {
  return await User.findOne({ where: { username } });
};

export const findUserById = async (userId: string) => {
  return await User.findByPk(userId);
};