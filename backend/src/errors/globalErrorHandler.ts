import {ErrorRequestHandler} from "express";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  _,
  res,
  __) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  return res.status(status).json({
    status,
    message,
  })
}

export default globalErrorHandler;