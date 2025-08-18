import {
  PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError,
  PrismaClientValidationError} from "@prisma/client/runtime/library";
import {ErrorRequestHandler} from "express";
import {HttpError} from "../types/HttpError";

const prismaErrorHandler: ErrorRequestHandler = (error, _, __, next) => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P1000":
      case "P1001":
      case "P1002":
        return next(new HttpError(503, "The database service is currently unavailable. Please try again later."));
      case "P2002":
        return next(new HttpError(409, "This value already exists. Please use a different one."));
      case "P2003":
      case "P2004":
      case "P2007":
        return next(new HttpError(400, "The provided data is invalid."));
      case "P2025":
        return next(new HttpError(404, "The requested record could not be found."));
      default:
        return next(new HttpError(500, "An unexpected error occurred. Please try again."));
    }
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    return next(new HttpError(500, "An unexpected error occurred. Please try again."));
  }

  if (error instanceof PrismaClientRustPanicError) {
    return next(new HttpError(500, "An internal server error occurred. Please try again later."));
  }

  if (error instanceof PrismaClientInitializationError) {
    return next(new HttpError(500, "The server failed to initialize. Please try again later."));
  }

  if (error instanceof PrismaClientValidationError) {
    return next(new HttpError(400, "The provided input is not valid."));
  }

  // Unknown or other error
  next(error);
}

export default prismaErrorHandler;