import {Prisma} from "@prisma/client";
import {ErrorRequestHandler} from "express";

class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const prismaErrorHandler: ErrorRequestHandler = (error, _, __, next) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P1000":
        return next(new HttpError(401,  "Authentication failed, invalid credentials."));
      case "P1001":
        return next(new HttpError(503, "Database connection error, service unavailable."));
      case "P1002":
        return next(new HttpError(500, "Database connection timed out."));
      case "P2002":
        return next(new HttpError(409, "Duplicate entry, unique constraint violated."));
      case "P2003":
        return next(new HttpError(400, "Foreign key constraint failed."));
      case "P2004":
        return next(new HttpError(400, "Invalid value for a field."));
      case "P2007":
        return next(new HttpError(400, "Invalid input, data type mismatch."));
      case "P2025":
        return next(new HttpError(404, "Record not found."));
      default:
        return next(new HttpError(500, "An unknown database error occurred."));
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return next(new HttpError(500, "An unknown request error occurred in Prisma."));
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return next(new HttpError(500, "Prisma internal panic occurred. Please restart the server."));
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return next(new HttpError(500, "Failed to initialize Prisma Client. Check your environment."));
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return next(new HttpError(400, "Validation error. Input does not match schema."));
  }

  // Unknown or other error
  next(error);
}

export default prismaErrorHandler;