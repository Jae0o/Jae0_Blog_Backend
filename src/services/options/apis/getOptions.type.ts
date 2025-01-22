import { OptionsType } from "@interfaces";

export type GetOptions = (params: { type: OptionsType }) => Promise<string[]>;
