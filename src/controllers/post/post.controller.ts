import { PostService } from "@services";

import { GetAllPostsHandler, GetPostListHandler } from "./post.type";

const getAllPosts: GetAllPostsHandler = async (req, res, next) => {
  try {
    const { cursor } = req.query;

    const result = await PostService.getAllPosts({ cursor });

    res.status(200).json({ posts: result });
  } catch (error) {
    next(error);
  }
};

const getPostList: GetPostListHandler = async (req, res, next) => {
  try {
    const { category } = req.query;

    const result = await PostService.getPostList({ category });

    res.status(200).json({ posts: result });
  } catch (error) {
    next(error);
  }
};

const PostController = {
  getAllPosts,
  getPostList,
};

export default PostController;
