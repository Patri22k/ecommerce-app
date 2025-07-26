import {Request, Response, NextFunction} from "express";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  return res.status(status).json({
    status,
    message,
  })
}

export default globalErrorHandler;