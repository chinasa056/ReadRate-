import { UserAttributes } from '../interfaces/user';
import { User } from '../models/users';

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const createUser = async (userData: {
  user_name: string;
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

export const findUserByUsername = async (user_name: string) => {
  return await User.findOne({ where: { user_name } });
};

export const findUserById = async (user_id: string) => {
  return await User.findByPk(user_id);
};