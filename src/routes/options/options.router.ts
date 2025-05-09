import { Router } from "express";

import { OptionsController } from "@controllers";

import { Routes } from "@interfaces";

import { OptionsValidation } from "@/validations";

const route = Router();

route.get(
  "/get/:type",
  OptionsValidation.getOptions,
  OptionsController.getOptions,
);

const optionsRouter: Routes = {
  path: "/options",
  router: route,
};

export default optionsRouter;
