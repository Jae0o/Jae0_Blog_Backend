import express from "express";

import { DEV_LOG } from "@/config";

import morgan from "morgan";

const app = express();

app.use(morgan(DEV_LOG || "combined"));

export default app;
