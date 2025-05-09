import { ErrorRequestHandler } from "express";

import { BlogStatusCode } from "@interfaces";

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  try {
    const status: number = error.status || BlogStatusCode.SERVER_ERROR;
    const message = error.message || "unknown error";

    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
