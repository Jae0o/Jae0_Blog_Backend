import { PostService } from "@services";

import {
  GetAllPostsHandler,
  GetPostHandler,
  GetPostListHandler,
} from "./post.type";

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

const getPost: GetPostHandler = async (req, res, next) => {
  try {
    const { postId } = req.query;

    const result = await PostService.getPost({ postId });

    res.status(200).json({ post: result });
  } catch (error) {
    next(error);
  }
};

const PostController = {
  getAllPosts,
  getPostList,
  getPost,
};

export default PostController;
