"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllPosts_1 = __importDefault(require("./apis/getAllPosts"));
const getPostList_1 = require("./apis/getPostList");
const PostService = {
    getAllPosts: getAllPosts_1.default,
    getPostList: getPostList_1.getPostList,
};
exports.default = PostService;
