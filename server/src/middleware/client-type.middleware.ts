import type { NextFunction, Request, Response } from "express";
import { CLIENT_TYPE_HEADER } from "../constants/headers";
import { AppError } from "../lib/app-error";

export const clientTypeMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const clientType = req.header(CLIENT_TYPE_HEADER) as "web" | "mobile";

  if (clientType !== "web" && clientType !== "mobile") {
    next(new AppError(400, "Invalid client type."));
    return;
  }
  req.clientType = clientType;
  next();
};
