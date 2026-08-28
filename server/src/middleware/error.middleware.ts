import type { ErrorRequestHandler } from "express";

import { AppError } from "../lib/app-error.js";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  // Invalid JSON sent by the client
  if (
    error &&
    typeof error === "object" &&
    "type" in error &&
    error.type === "entity.parse.failed"
  ) {
    res.status(400).json({
      success: false,
      error: {
        message: "Invalid JSON in request body",
      },
    });

    return;
  }

  if (error instanceof AppError || error.name == "AppError") {
    res.status(error.statusCode || 500).json({
      success: false,
      error: {
        message: error.message,
      },
    });
    return;
  }

  console.error("Unhandled error:", error);

  res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
    },
  });
};
