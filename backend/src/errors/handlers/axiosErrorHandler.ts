import {ErrorRequestHandler} from "express";
import {isAxiosError} from "axios";
import {HttpError} from "../types/HttpError";

const statusMessages: Record<number, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
};

const axiosErrorHandler: ErrorRequestHandler = (
  error,
  _,
  __,
  next
) => {
  if (isAxiosError(error)) {
    const status = error.response?.status || 500;
    const message = statusMessages[status] || "An unexpected error occurred.";
    return next(new HttpError(status, message));
  }

  // Unknown or other error
  next(error);
}

export default axiosErrorHandler;