import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthorizationError from '../../core/errors/AuthorizationError';
import { User } from '../../core/models/users';
import { setting } from '../../core/config/application';

interface JwtPayload {
  user: {
    id: number;
    username: string;
  };
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  const token = req.header('Authorization');

  if (!token) {
    const error = new Error('not_authenticated');
    const authorizationError = new AuthorizationError(
      'Authorization denied. No token provided',
      error
    );
    throw authorizationError;
  }
    const decodedToken = jwt.verify(
      token.replace('Bearer ', ''),
      setting.secretKey,
    ) as JwtPayload;
    const user = await User.findOne({ where: { id: decodedToken.user.id } });
    if (!user) {
      const error = new Error('not_authenticated');
      const authorizationError = new AuthorizationError(
        'Authorization denied. User not found',
        error
      );
      throw authorizationError;
    }
    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
