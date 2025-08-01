import {ErrorRequestHandler} from "express";

const zodErrorHandler: ErrorRequestHandler = (
  error,
  _,
  res,
  next
) => {
  if (isZodError(error)) {
    return res.status(400).json({
      status: "fail",
      message: JSON.parse(error.message)
    });
  }

  // Unknown or other error
  next(error);
}

import {ZodError} from "zod";

function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export default zodErrorHandler;