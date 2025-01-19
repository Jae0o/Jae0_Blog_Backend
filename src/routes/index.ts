import { Routes } from "@interfaces";

import optionsRouter from "./options/options.router";
import postRouter from "./post/post.router";

const routes: Routes[] = [postRouter, optionsRouter];

export default routes;
