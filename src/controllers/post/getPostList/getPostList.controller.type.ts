import { RequestHandler } from "express";

import { Post, PostCategory } from "@interfaces";

export interface GetPostListQuery {
  category: PostCategory;
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
