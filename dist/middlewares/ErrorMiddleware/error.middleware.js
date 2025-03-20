"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    console.log("error", error);
    next();
};
exports.default = errorMiddleware;
