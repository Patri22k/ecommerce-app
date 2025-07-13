import { Prisma } from "@prisma/client";
import {NextFunction} from "express";

const prismaErrorHandler = (error: any, next: NextFunction) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return next({
          status: 409,
          message: "Duplicate entry, unique constraint violated.",
        });
      case "P2025":
        return next({
          status: 404,
          message: "Record not found.",
        });
      default:
        return next({
          status: 500,
          message: "Database error occurred.",
          details: error.meta,
        })
    }
  }

  // Unknown or other error
  next(error);
}

export default prismaErrorHandler;