"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("../../controllers/index.js");
const route = (0, express_1.Router)();
route.get("/get/:type", _controllers_1.OptionsController.getOptions);
const optionsRouter = {
    path: "/options",
    router: route,
};
exports.default = optionsRouter;
