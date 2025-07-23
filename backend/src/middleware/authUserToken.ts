import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const JWT_TOKEN = process.env.JWT_TOKEN!;

export const authUserToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  console.log("Auth Header:", authHeader);
  console.log("JWT_TOKEN:", JWT_TOKEN);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized access. Please provide a valid token."
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_TOKEN) as { id: string, role: string };
    console.log("Decoded JWT:", decoded);

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized access. Invalid or expired token."
    })
  }
};