"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getOptions_controller_1 = __importDefault(require("./getOptions/getOptions.controller"));
const OptionsController = {
    getOptions: getOptions_controller_1.default,
};
exports.default = OptionsController;
