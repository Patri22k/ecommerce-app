import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: { userId: string },
}

const JWT_SECRET = process.env.JWT_TOKEN!;

export const authUserToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized access. Please provide a valid token."
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded && typeof decoded.userId === 'string') {
      req.userId = {userId: decoded.userId};
      next();
    } else {
      return res.status(401).json({
        status: "fail",
        "message": "Invalid token format. Please provide a valid token."
      })
    }
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized access. Please provide a valid token."
    })
  }
};