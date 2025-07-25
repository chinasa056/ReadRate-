
import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "../../core/errors/CustomError";
import { ErrorCode } from "../../core/enum/error";
import { HttpStatus } from "../../core/enum/httpCode";
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

interface DecodedAccessTokenPayload { 
  userId: string;     
  user_name: string;
  isAdmin: boolean;   
  iat?: number;
  exp?: number;
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

    // FIX 2: Correctly decode the token directly into DecodedAccessTokenPayload
    // DO NOT destructure 'user' here, as your token is flat
    const decodedToken = jwt.verify(token, setting.jwt.secret) as DecodedAccessTokenPayload;

    // We get userId directly from the decoded token
    // FIX 3: Use decodedToken.userId, not user.userId
    const authUser = await findUserById(decodedToken.userId);

    if (!authUser) {
      throw new CustomError(
        "Authorization denied. User not found",
        ErrorCode.NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    }

    // FIX 4: Ensure the properties you assign to req.user match AuthenticatedUser
    req.user = {
      userId: authUser.id, // Your database user model likely has 'id'
      user_name: authUser.user_name,
      isAdmin: authUser.is_admin, // Your database user model likely has 'is_admin'
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
      next(error); // Pass other errors to your error handling middleware
    }
  }
};