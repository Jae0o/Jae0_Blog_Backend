import e from "express";

import { BlogErrorStatus, BlogStatusCode } from "@interfaces";

import { GetAllPostsValidation } from "./getAllPosts.validation.type";

const getAllPostsValidation: GetAllPostsValidation = (req, res, next) => {
  try {
    const { cursor } = req.query;

    if (!cursor) {
      res
        .status(BlogStatusCode.NOT_FULFILLED)
        .json({ code: BlogErrorStatus.GET_ALL_POSTS_NO_CURSOR });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default getAllPostsValidation;
