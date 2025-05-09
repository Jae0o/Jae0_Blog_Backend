import { BlogErrorStatus, BlogStatusCode } from "@interfaces";

import { GetPostValidation } from "./getPost.validation.type";

const getPostValidation: GetPostValidation = (req, res, next) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      res
        .status(BlogStatusCode.NOT_FULFILLED)
        .json({ code: BlogErrorStatus.GET_POST_NO_POST_ID });

      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default getPostValidation;
