import { Router } from "express";

import { PostController } from "@controllers";

import { Routes } from "@interfaces";

const route = Router();

route.get("/all", PostController.getAllPosts);
route.get("/list", PostController.getPostList);
route.get("", PostController.getPost);

const postRouter: Routes = {
  path: "/post",
  router: route,
};

export default postRouter;
