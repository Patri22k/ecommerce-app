import { Prisma } from "@prisma/client";
import {NextFunction} from "express";

const prismaErrorHandler = (error: any, next: NextFunction) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P1000":
        return next({
          status: 401,
          message: "Authentication failed, invalid credentials.",
        });
      case "P1001":
        return next({
          status: 503,
          message: "Database connection error, service unavailable.",
        });
      case "P1002":
        return next({
          status: 500,
          message: "Database connection timed out.",
        });
      case "P2002":
        return next({
          status: 409,
          message: "Duplicate entry, unique constraint violated.",
        });
      case "P2003":
        return next({
          status: 400,
          message: "Foreign key constraint failed.",
        });
      case "P2004":
        return next({
          status: 400,
          message: "Invalid value for a field.",
        });
      case "P2007":
        return next({
          status: 400,
          message: "Invalid input, data type mismatch.",
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