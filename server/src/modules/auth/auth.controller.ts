import {
  refreshTokenSchema,
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
} from "./auth.schema";
import * as authService from "./auth.service";
import { catchAsync } from "../../lib/catch-async";
import { env } from "../../config/env";

export const signUp = catchAsync(async (req, res) => {
  const data = signUpSchema.parse(req.body);

  const { user } = await authService.signUp(data);

  res.status(201).json({
    success: true,
    data: {
      user,
    },
  });
});
export const verifyEmail = catchAsync(async (req, res) => {
  const data = verifyEmailSchema.parse(req.body);

  const { user } = await authService.verifyEmail(data.email, data.code);

  res.status(201).json({
    success: true,
    data: {
      user,
    },
  });
});

export const signIn = catchAsync(async (req, res, next) => {
  const data = signInSchema.parse(req.body);
  const { accessToken, refreshToken, user } = await authService.signIn(data, {
    deviceId: req.deviceId,
    userAgent: req.get("user-agent"),
    ipAddress: req.ip,
  });
  const result: Record<string, string | object> = { accessToken, user };
  const isWeb = req.clientType === "web";
  if (isWeb) {
    const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30days
    res.cookie("refreshToken", refreshToken, {
      maxAge: MAX_AGE,
      httpOnly: env.NODE_ENV == "production",
      sameSite: "strict",
      secure: env.NODE_ENV === "production",
    });
  } else {
    result.refreshToken = refreshToken;
  }

  res.json({
    success: true,
    data: result,
  });
});

export const refresh = catchAsync(async (req, res) => {
  const isWeb = req.clientType === "web";
  const data = { refreshToken: "" };
  if (isWeb) {
    data.refreshToken = req.cookies.refreshToken;
  } else {
    data.refreshToken = refreshTokenSchema.parse(req.body).refreshToken;
  }

  const { accessToken, refreshToken } = await authService.refreshTokens(
    data.refreshToken,
    {
      deviceId: req.deviceId,
      userAgent: req.get("user-agent"),
      ipAddress: req.ip,
    },
  );

  const result: Record<string, string | object> = { accessToken };
  if (isWeb) {
    const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30days
    res.cookie("refreshToken", refreshToken, {
      maxAge: MAX_AGE,
      httpOnly: env.NODE_ENV == "production",
      sameSite: "strict",
      secure: env.NODE_ENV === "production",
    });
  } else {
    result.refreshToken = refreshToken;
  }

  res.json({
    success: true,
    data: result,
  });
});

export const logout = catchAsync(async (req, res) => {
  const data = refreshTokenSchema.parse(req.body);

  await authService.logout(data.refreshToken);

  res.clearCookie("refreshToken");

  res.json({
    success: true,
    data: null,
  });
});
