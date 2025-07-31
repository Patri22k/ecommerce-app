import { PrismaClient } from "@prisma/client";
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

const JWT_TOKEN = process.env.JWT_TOKEN!;

export const authUserToken = async (
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
    const decoded = jwt.verify(token, JWT_TOKEN) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access. User not found."
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized access. Invalid or expired token."
    })
  }
};