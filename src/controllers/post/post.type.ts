import { RequestHandler } from "express";

import { Post } from "@interfaces";

// ------------------------------------ GET ALL POSTS ------------------------------------
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

// ------------------------------------ GET POST LIST ------------------------------------

interface PostListQuery {
  category: string;
}

interface PostListResponse {
  posts: Post[];
}

export type GetPostListHandler = RequestHandler<
  void,
  PostListResponse,
  void,
  PostListQuery
>;
