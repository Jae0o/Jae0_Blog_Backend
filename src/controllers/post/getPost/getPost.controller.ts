import { PostService } from "@services";

import { GetPostHandler } from "./getPost.controller.type";

const getPostController: GetPostHandler = async (req, res, next) => {
  try {
    const { postId } = req.query;

    const result = await PostService.getPost({ postId });

    res.status(200).json({ post: result });
  } catch (error) {
    next(error);
  }
};

export default getPostController;
