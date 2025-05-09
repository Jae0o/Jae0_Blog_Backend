import { BlogErrorStatus, BlogStatusCode } from "@interfaces";

import { GetPostListValidation } from "./getPostList.validation.type";

const getPostListValidation: GetPostListValidation = (req, res, next) => {
  try {
    const { category } = req.query;

    if (!category) {
      res
        .status(BlogStatusCode.NOT_FULFILLED)
        .json({ code: BlogErrorStatus.GET_POST_LIST_NO_CATEGORY });

      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default getPostListValidation;
