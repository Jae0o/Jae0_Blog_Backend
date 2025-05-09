import { BlogErrorStatus, BlogStatusCode, PostCategory } from "@interfaces";

import { GetPostListValidation } from "./getPostList.validation.type";

const getPostListValidation: GetPostListValidation = (req, res, next) => {
  const { category } = req.query;

  if (!category) {
    res
      .status(BlogStatusCode.NOT_FULFILLED)
      .json({ code: BlogErrorStatus.GET_POST_LIST_NO_CATEGORY });

    return;
  }

  const categoryList = Object.values(PostCategory);
  if (!categoryList.includes(category)) {
    res
      .status(BlogStatusCode.NOT_FULFILLED)
      .json({ code: BlogErrorStatus.GET_POST_LIST_CATEGORY_NOT_INVALID });

    return;
  }

  next();
};

export default getPostListValidation;
