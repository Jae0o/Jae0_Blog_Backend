import { Router } from "express";

import { Routes } from "@interfaces";

const route = Router();

const optionsRouter: Routes = {
  path: "/options",
  router: route,
};

export default optionsRouter;
