"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _interfaces_1 = require("../../../interfaces/index.js");
const getOptionsValidation = (req, res, next) => {
    const { type } = req.query;
    if (!type) {
        res
            .status(_interfaces_1.BlogStatusCode.NOT_FULFILLED)
            .json({ code: _interfaces_1.BlogErrorStatus.GET_OPTIONS_NO_TYPE });
        return;
    }
    const OPTIONS_TYPE_LIST = Object.values(_interfaces_1.OptionsType);
    if (!OPTIONS_TYPE_LIST.includes(type)) {
        res
            .status(_interfaces_1.BlogStatusCode.BAD_REQUEST)
            .json({ code: _interfaces_1.BlogErrorStatus.GET_OPTIONS_TYPE_NOT_INVALID });
        return;
    }
    next();
};
exports.default = getOptionsValidation;
