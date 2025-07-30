import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authUserToken";

export const authorizeRole = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log("Authenticated request:", req);

    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "Forbidden: You do not have permission to access this resource."
      });
    }

    next();
  };
}