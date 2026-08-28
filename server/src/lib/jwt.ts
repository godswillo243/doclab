import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

export interface AccessTokenPayload {
  sub: string;
  type: "access";
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
  type: "refresh";
}

export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    {
      sub: userId,
      type: "access",
    } satisfies AccessTokenPayload,
    env.JWT_ACCESS_SECRET,
    {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    },
  );
};

export const generateRefreshToken = (userId: string, jti: string) => {
  return jwt.sign(
    {
      sub: userId,
      jti,
      type: "refresh",
    } satisfies RefreshTokenPayload,
    env.JWT_REFRESH_SECRET,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    },
  );
};
