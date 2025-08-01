import {RequestHandler} from "express";

export const forwardingErrorHandler: RequestHandler = (_, __, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
}