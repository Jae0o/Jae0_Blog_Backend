import { RequestHandler } from "express";

import { GetPostQuery, GetPostResponse } from "@controllers";

import { BlogResponse } from "@interfaces";

export type GetPostValidation = RequestHandler<
  void,
  BlogResponse<GetPostResponse>,
  void,
  GetPostQuery
>;
