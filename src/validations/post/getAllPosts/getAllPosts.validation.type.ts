import { RequestHandler } from "express";

import { GetAllPostsQuery, GetAllPostsResponse } from "@controllers";

import { BlogResponse } from "@interfaces";

export type GetAllPostsValidation = RequestHandler<
  void,
  BlogResponse<GetAllPostsResponse>,
  void,
  GetAllPostsQuery
>;
