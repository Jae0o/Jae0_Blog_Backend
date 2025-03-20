"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsController = exports.PostController = void 0;
var post_controller_1 = require("./post/post.controller");
Object.defineProperty(exports, "PostController", { enumerable: true, get: function () { return __importDefault(post_controller_1).default; } });
var options_controller_1 = require("./options/options.controller");
Object.defineProperty(exports, "OptionsController", { enumerable: true, get: function () { return __importDefault(options_controller_1).default; } });
