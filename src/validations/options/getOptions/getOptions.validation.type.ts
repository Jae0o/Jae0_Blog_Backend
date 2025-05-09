import { RequestHandler } from "express";

import { GetOptionsQuery, GetOptionsResponse } from "@controllers";

import { BlogResponse } from "@interfaces";

export type GetOptionsValidation = RequestHandler<
  void,
  BlogResponse<GetOptionsResponse>,
  void,
  GetOptionsQuery
>;
