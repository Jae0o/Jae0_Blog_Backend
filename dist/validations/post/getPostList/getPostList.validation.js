"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("../../../interfaces/index.js");
const getPostListValidation = (req, res, next) => {
    const { category } = req.query;
    if (!category) {
        res
            .status(_interfaces_1.BlogStatusCode.NOT_FULFILLED)
            .json({ code: _interfaces_1.BlogErrorStatus.GET_POST_LIST_NO_CATEGORY });
        return;
    }
    next();
};
exports.default = getPostListValidation;
