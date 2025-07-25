import {Response, Request, NextFunction} from "express";
const zodErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isZodError(error)) {
    console.log("DEBUG: Zod Error Handler Triggered");

    return res.status(400).json({
      status: "fail",
      message: JSON.parse(error.message)
    });
  }

  // Unknown or other error
  next();
}

import {ZodError} from "zod";

function isZodError(error: unknown): error is ZodError {
  return error instanceof ZodError;
}

export default zodErrorHandler;