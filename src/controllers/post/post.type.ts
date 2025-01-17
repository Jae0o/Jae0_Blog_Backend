import { RequestHandler } from "express";

import { Post } from "@interfaces";

interface AllPostsQuery {
  cursor?: string;
}

interface AllPostsResponse {
  posts: Post[];
}

export type GetAllPostsHandler = RequestHandler<
  void,
  AllPostsResponse,
  void,
  AllPostsQuery
>;
