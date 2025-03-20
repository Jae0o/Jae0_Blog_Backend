"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _constants_1 = require("../../constants/index.js");
const _services_1 = require("../../services/index.js");
const getOptions = async (req, res, next) => {
    try {
        const { type } = req.params;
        if (!_constants_1.OPTIONS_TYPE_LIST.includes(type)) {
            throw new Error("Invalid type");
        }
        const list = await _services_1.OptionsService.getOptions({ type });
        res.status(200).json(list);
    }
    catch (error) {
        next(error);
    }
};
const PostController = {
    getOptions,
};
exports.default = PostController;
