import { RequestHandler } from "express";

import { Post } from "@interfaces";

export interface GetPostListQuery {
  category: string;
}

export interface GetPostListResponse {
  posts: Post[];
}

export type GetPostListHandler = RequestHandler<
  void,
  GetPostListResponse,
  void,
  GetPostListQuery
>;
