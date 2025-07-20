import { AuthenticatedUser } from "../../core/interfaces/auth"; // or wherever AuthenticatedUser is defined

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
