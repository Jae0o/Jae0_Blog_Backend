import { RequestHandler } from "express";

import { Post } from "@interfaces";

export interface GetPostQuery {
  postId: string;
}

export interface GetPostResponse {
  post: Post;
}

export type GetPostHandler = RequestHandler<
  void,
  GetPostResponse,
  void,
  GetPostQuery
>;
