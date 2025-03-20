"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllPosts_1 = __importDefault(require("./apis/getAllPosts"));
const PostService = {
    getAllPosts: getAllPosts_1.default,
};
exports.default = PostService;
