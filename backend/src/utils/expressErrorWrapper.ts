import {RequestHandler} from "express";

const handlerMethodNames = ["get", "post", "put", "delete", "patch"];

/**
 * Patches the Express router methods to ensure that all request handlers handle errors properly.
 *
 * @param router The Express router instance to patch.
 */
export const patchExpressMethods = (router: any) => {
  handlerMethodNames.forEach(method => {
    const originalRequestHandlerFunc = router[method];

    router[method] = function (path: any, ...handlers: any[]) {
      originalRequestHandlerFunc.call(this, path, ...handlers.map(patchExpressHandler));
    };
  });
};

const patchExpressHandler = (handler: any): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch((reason) => next(reason));
  };
};