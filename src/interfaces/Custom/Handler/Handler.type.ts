import { BlogError } from "@interfaces/Error/Error.type";

export type BlogResponse<T> = BlogError | T;
