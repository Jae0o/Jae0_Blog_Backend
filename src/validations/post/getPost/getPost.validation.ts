import { BlogErrorStatus, BlogStatusCode } from "@interfaces";

import { GetPostValidation } from "./getPost.validation.type";

const getPostValidation: GetPostValidation = (req, res, next) => {
  // 특정 req 내부 body 혹은 query 값 검증
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
