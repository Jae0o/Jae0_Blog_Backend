"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsService = exports.PostService = void 0;
var post_service_1 = require("./post/post.service");
Object.defineProperty(exports, "PostService", { enumerable: true, get: function () { return __importDefault(post_service_1).default; } });
var options_service_1 = require("./options/options.service");
Object.defineProperty(exports, "OptionsService", { enumerable: true, get: function () { return __importDefault(options_service_1).default; } });
