"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllPosts_controller_1 = __importDefault(require("./getAllPosts/getAllPosts.controller"));
const getPost_controller_1 = __importDefault(require("./getPost/getPost.controller"));
const getPostList_controller_1 = __importDefault(require("./getPostList/getPostList.controller"));
const PostController = {
    getAllPosts: getAllPosts_controller_1.default,
    getPostList: getPostList_controller_1.default,
    getPost: getPost_controller_1.default,
};
exports.default = PostController;
