"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllPosts_validation_1 = __importDefault(require("./getAllPosts/getAllPosts.validation"));
const getPost_validation_1 = __importDefault(require("./getPost/getPost.validation"));
const getPostList_validation_1 = __importDefault(require("./getPostList/getPostList.validation"));
const PostValidation = {
    getPost: getPost_validation_1.default,
    getPostList: getPostList_validation_1.default,
    getAllPosts: getAllPosts_validation_1.default,
};
exports.default = PostValidation;
