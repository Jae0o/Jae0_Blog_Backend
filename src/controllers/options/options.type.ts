import { RequestHandler } from "express";

import { OptionsType } from "@interfaces";

interface GetOptionParams {
  type: OptionsType;
}

type GetOptionsResponse = string[];

export type GetOptionsHandler = RequestHandler<
  GetOptionParams,
  GetOptionsResponse
>;
