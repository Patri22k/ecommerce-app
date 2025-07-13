import {Request, Response, NextFunction} from "express";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({
    status,
    message,
  })
}

export default globalErrorHandler;