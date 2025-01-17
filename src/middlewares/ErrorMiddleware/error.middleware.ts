import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  console.log("error", error);

  next();
};

export default errorMiddleware;
