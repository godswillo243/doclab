import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/app-error";
import { DEVICE_ID_HEADER } from "../constants/headers";

export function deviceIdMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const deviceId = req.headers[DEVICE_ID_HEADER];

  if (!deviceId || typeof deviceId !== "string") {
    throw new AppError(400, "Device ID is required.");
  }

  req.deviceId = deviceId;

  next();
}
