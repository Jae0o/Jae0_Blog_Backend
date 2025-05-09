"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _services_1 = require("../../../services/index.js");
const getOptionsController = async (req, res, next) => {
    try {
        const { type } = req.query;
        const options = await _services_1.OptionsService.getOptions({ type });
        res.status(200).json({ options });
    }
    catch (error) {
        next(error);
    }
};
exports.default = getOptionsController;
