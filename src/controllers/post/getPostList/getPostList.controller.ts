import { PostService } from "@services";

import { GetPostListHandler } from "./getPostList.controller.type";

const getPostListController: GetPostListHandler = async (req, res, next) => {
  try {
    const { category } = req.query;

    const result = await PostService.getPostList({ category });

    res.status(200).json({ posts: result });
  } catch (error) {
    next(error);
  }
};

export default getPostListController;
