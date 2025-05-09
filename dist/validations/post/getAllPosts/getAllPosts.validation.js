"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("../../../interfaces/index.js");
const getAllPostsValidation = (req, res, next) => {
    const { cursor } = req.query;
    if (!cursor) {
        res
            .status(_interfaces_1.BlogStatusCode.NOT_FULFILLED)
            .json({ code: _interfaces_1.BlogErrorStatus.GET_ALL_POSTS_NO_CURSOR });
        return;
    }
    next();
};
exports.default = getAllPostsValidation;
