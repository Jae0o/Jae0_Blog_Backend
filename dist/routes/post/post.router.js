"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("../../controllers/index.js");
const validations_1 = require("../../validations");
const route = (0, express_1.Router)();
route.get("", validations_1.PostValidation.getPost, _controllers_1.PostController.getPost);
route.get("/list", validations_1.PostValidation.getPostList, _controllers_1.PostController.getPostList);
route.get("/all", validations_1.PostValidation.getAllPosts, _controllers_1.PostController.getAllPosts);
const postRouter = {
    path: "/post",
    router: route,
};
exports.default = postRouter;
