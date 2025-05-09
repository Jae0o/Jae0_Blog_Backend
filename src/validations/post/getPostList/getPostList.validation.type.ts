import { RequestHandler } from "express";

import { GetPostListQuery, GetPostListResponse } from "@controllers";

import { BlogResponse } from "@interfaces";

export type GetPostListValidation = RequestHandler<
  void,
  BlogResponse<GetPostListResponse>,
  void,
  GetPostListQuery
>;
