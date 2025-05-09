"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("../../controllers/index.js");
const validations_1 = require("../../validations");
const route = (0, express_1.Router)();
route.get("/get/:type", validations_1.OptionsValidation.getOptions, _controllers_1.OptionsController.getOptions);
const optionsRouter = {
    path: "/options",
    router: route,
};
exports.default = optionsRouter;
