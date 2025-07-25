import { AuthenticatedUser } from "../../api/middleware/authenticate"; 

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
