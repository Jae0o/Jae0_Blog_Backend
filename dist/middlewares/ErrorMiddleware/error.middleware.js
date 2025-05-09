"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("../../interfaces/index.js");
const errorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || _interfaces_1.BlogStatusCode.SERVER_ERROR;
        const message = error.message || "unknown error";
        res.status(status).json({ message });
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
