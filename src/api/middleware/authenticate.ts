import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "../../core/errors/CustomError";
import { ErrorCode } from "../../core/enum/error";
import { HttpStatus } from "../../core/enum/httpCode";
// import { User } from "../../core/models";
import { setting } from "../../core/config/application";
import { findUserById } from "../../core/services/user";

export interface AuthenticatedUser {
  userId: string;
  user_name: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

interface JwtPayload {
  user: {
    userId: string;
    email: string;
    is_admin: boolean;
  };
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new CustomError(
        "Authorization denied. No token provided",
        ErrorCode.AUTHENTICATION_ERROR,
        HttpStatus.UNAUTHORIZED
      );
    }

    const { user } = jwt.verify(token, setting.jwt.secret) as JwtPayload;

    const authUser = await findUserById(user.userId);

    if (!authUser) {
      throw new CustomError(
        "Authorization denied. User not found",
        ErrorCode.NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    }

    req.user = {
      userId: authUser.id,
      user_name: authUser.user_name,
      isAdmin: authUser.is_admin,
    };

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      next(
        new CustomError(
          "Token has expired",
          ErrorCode.TOKEN_EXPIRED,
          HttpStatus.UNAUTHORIZED
        )
      );
    } else {
      next(error);
    }
  }
};

