import express from "express";

import { errorMiddleware } from "@middlewares";

import { DEV_LOG } from "@config";

import routes from "@routes";

import morgan from "morgan";

const app = express();

app.use(morgan(DEV_LOG || "combined"));

routes.forEach(route => {
  const prefix = route.path ?? "";

  app.use(`/service/api${prefix}`, route.router);
});

app.use(errorMiddleware);

export default app;
