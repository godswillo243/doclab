import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { AppError } from "../lib/app-error.js";

export interface AuthenticatedUser {
  id: string;
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError(401, "Authentication required");
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new AppError(401, "Invalid authorization header");
    }

    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);

    if (
      typeof payload !== "object" ||
      payload === null ||
      typeof payload.sub !== "string" ||
      payload.type !== "access"
    ) {
      throw new AppError(401, "Invalid access token");
    }

    req.auth = {
      userId: payload.sub,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError(401, "Invalid or expired access token"));

      return;
    }

    next(error);
  }
};
