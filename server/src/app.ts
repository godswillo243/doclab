import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import apiRouter from "./routes/index.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Document Platform API",
  });
});

app.use("/api/v1", apiRouter);

export default app;
