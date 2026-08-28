import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import apiRouter from "./routes/index.js";
import morgan from "morgan";

import { errorMiddleware } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

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
app.use(morgan("dev", { immediate: false }));
app.use(cookieParser(env.COOKIE_SECRET));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Document Platform API",
  });
});

app.use("/api/v1", apiRouter);

app.use(errorMiddleware);

export default app;
