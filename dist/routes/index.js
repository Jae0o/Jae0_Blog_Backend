"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const options_router_1 = __importDefault(require("./options/options.router"));
const post_router_1 = __importDefault(require("./post/post.router"));
const routes = [post_router_1.default, options_router_1.default];
exports.default = routes;
