import { PostService } from "@services";

import { GetAllPostsHandler } from "./post.type";

const getAllPosts: GetAllPostsHandler = async (req, res, next) => {
  try {
    const { cursor } = req.query;

    const result = await PostService.getAllPosts({ cursor });

    res.status(200).json({ posts: result });
  } catch (error) {
    next(error);
  }
};

const PostController = {
  getAllPosts,
};

export default PostController;
