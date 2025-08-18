import {RequestHandler} from "express";

const forwardingErrorHandler: RequestHandler = (_, __, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

export default forwardingErrorHandler;
