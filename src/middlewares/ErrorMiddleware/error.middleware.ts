import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  try {
    const status: number = error.status || 500;
    const message = error.message || "unknown error";

    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
