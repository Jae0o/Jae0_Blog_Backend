"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("../../../interfaces/index.js");
const getPostValidation = (req, res, next) => {
    const { postId } = req.query;
    if (!postId) {
        res
            .status(_interfaces_1.BlogStatusCode.NOT_FULFILLED)
            .json({ code: _interfaces_1.BlogErrorStatus.GET_POST_NO_POST_ID });
        return;
    }
    next();
};
exports.default = getPostValidation;
