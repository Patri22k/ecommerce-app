import { Request, Response, NextFunction } from "express";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: Role;
  }
}

export const authorizeRole = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "Forbidden: You do not have permission to access this resource."
      });
    }

    next();
  };
}