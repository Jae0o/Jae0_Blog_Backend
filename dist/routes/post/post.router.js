"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("../../controllers/index.js");
const route = (0, express_1.Router)();
route.get("/all", _controllers_1.PostController.getAllPosts);
route.get("/list", _controllers_1.PostController.getPostList);
const postRouter = {
    path: "/post",
    router: route,
};
exports.default = postRouter;
