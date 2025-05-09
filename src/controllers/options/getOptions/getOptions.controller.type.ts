import { RequestHandler } from "express";

import { OptionsType } from "@interfaces";

export interface GetOptionsQuery {
  type: OptionsType;
}

export interface GetOptionsResponse {
  options: string[];
}

export type GetOptionsHandler = RequestHandler<
  void,
  GetOptionsResponse,
  void,
  GetOptionsQuery
>;
