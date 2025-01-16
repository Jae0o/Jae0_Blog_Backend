import { Router } from "express";

import { Routes } from "@interfaces";

const route = Router();

route.get("/", (req, res) => {
  res.send("Hello World");
});

const postRouter: Routes = {
  path: "/post",
  router: route,
};
export default postRouter;
