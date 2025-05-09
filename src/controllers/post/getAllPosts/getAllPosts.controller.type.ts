import { RequestHandler } from "express";

import { Post } from "@interfaces";

export interface GetAllPostsQuery {
  cursor?: string;
}

export interface GetAllPostsResponse {
  posts: Post[];
}

export type GetAllPostsHandler = RequestHandler<
  void,
  GetAllPostsResponse,
  void,
  GetAllPostsQuery
>;
