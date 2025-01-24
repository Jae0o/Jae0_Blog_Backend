import { Router } from "express";

import { OptionsController } from "@controllers";

import { Routes } from "@interfaces";

const route = Router();

route.get("/get/:type", OptionsController.getOptions);

const optionsRouter: Routes = {
  path: "/options",
  router: route,
};

export default optionsRouter;
