import type { RequestHandler } from "express";

import * as usersService from "./users.service";
import { catchAsync } from "../../lib/catch-async";
import { AppError } from "../../lib/app-error";

export const getCurrentUser = catchAsync(async (req, res, next) => {
  if (!req.auth || !req.auth.userId) {
    throw new AppError(401, "Authenticated user missing");
  }

  const user = await usersService.getCurrentUser(req.auth.userId);

  res.json({
    success: true,
    data: {
      user,
    },
  });
});
