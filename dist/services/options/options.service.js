"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getOptions_api_1 = __importDefault(require("./apis/getOptions.api"));
const OptionsService = {
    getOptions: getOptions_api_1.default,
};
exports.default = OptionsService;
