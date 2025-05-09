import { Router } from "express";

import { PostController } from "@controllers";

import { Routes } from "@interfaces";

import { PostValidation } from "@/validations";

const route = Router();

route.get("", PostValidation.getPost, PostController.getPost);
route.get("/list", PostValidation.getPostList, PostController.getPostList);
route.get("/all", PostValidation.getAllPosts, PostController.getAllPosts);

const postRouter: Routes = {
  path: "/post",
  router: route,
};

export default postRouter;
