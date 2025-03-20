import express from "express";

import { errorMiddleware } from "@middlewares";

import { DEV_LOG } from "@config";

import routes from "@routes";

import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(morgan(DEV_LOG || "combined"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------- Router -------------
routes.forEach(route => {
  const prefix = route.path ?? "";

  app.use(`/service/api${prefix}`, route.router);
});

app.use(errorMiddleware);

app.get("/*", (_req, res) => {
  res.status(404).send("Not Found");
});

export default app;
