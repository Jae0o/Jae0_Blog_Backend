import { PostService } from "@services";

import { GetAllPostsHandler } from "./getAllPosts.controller.type";

const getAllPostsController: GetAllPostsHandler = async (req, res, next) => {
  try {
    const { cursor } = req.query;

    const result = await PostService.getAllPosts({ cursor });

    res.status(200).json({ posts: result });
  } catch (error) {
    next(error);
  }
};

export default getAllPostsController;
