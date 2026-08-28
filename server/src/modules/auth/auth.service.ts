import { AppError } from "../../lib/app-error";
import { hashPassword, comparePassword } from "../../lib/password";
import {
  createUser,
  findUserByEmail,
  findUserByUsername,
  updateUser,
} from "./auth.repository";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { createOtp, findOtp, deleteOtp } from "./otp.repository";
import { compareOtp, generateOtp, hashOtp } from "../../lib/otp";
import { sendVerificationEmail } from "../../lib/email";
import { SignInInput, SignUpInput } from "./auth.schema";
import { serializeUser } from "./auth.utils";
import { generateAccessToken, generateRefreshToken } from "../../lib/jwt";
import {
  createSession,
  deleteSessionByDeviceId,
  findSessionById,
  revokeSession,
} from "./session.repository";
import { env } from "../../config/env";

type SessionOptions = {
  deviceId: string;
  userAgent?: string | undefined;
  ipAddress?: string | undefined;
};

export const signUp = async (data: SignUpInput) => {
  const email = data.email.trim().toLowerCase();
  const username = data.username.trim();

  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    throw new AppError(409, "Email is already registered");
  }

  const existingUsername = await findUserByUsername(username);
  if (existingUsername) {
    throw new AppError(409, "Username is already taken");
  }

  const passwordHash = await hashPassword(data.password);

  const user = await createUser({
    email,
    username,
    displayName: data.displayName.trim(),
    passwordHash,
  });

  if (!user) throw new AppError(500, "Could not create account.");

  const code = generateOtp();
  const codeHash = await hashOtp(code);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await deleteOtp(email, "email_verification");

  await createOtp({
    email,
    codeHash,
    expiresAt,
    purpose: "email_verification",
  });

  try {
    await sendVerificationEmail(email, user.username, code);
    console.log("Mail sent");
  } catch (error) {
    console.error("Error sending email: ", { error });
  }

  return { user: serializeUser(user) };
};

export const verifyEmail = async (email: string, code: string) => {
  email = email.trim().toLowerCase();
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError(400, "Invalid verification request");
  }

  if (user.emailVerifiedAt) {
    throw new AppError(400, "Email is already verified");
  }

  const otp = await findOtp(email, "email_verification");

  if (!otp) {
    throw new AppError(400, "Verification code is invalid or expired");
  }

  if (otp.expiresAt < new Date()) {
    await deleteOtp(email, "email_verification");

    throw new AppError(400, "Verification code has expired");
  }

  const valid = await compareOtp(code, otp.codeHash);

  if (!valid) {
    throw new AppError(400, "Verification code is invalid");
  }

  await updateUser(user.id, { emailVerifiedAt: new Date() });

  await deleteOtp(email, "email_verification");

  return { user: serializeUser(user) };
};

export const signIn = async (
  data: SignInInput,
  sessionOptions: SessionOptions,
) => {
  const email = data.email.trim().toLowerCase();

  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const passwordValid = await comparePassword(data.password, user.passwordHash);
  if (!passwordValid) {
    throw new AppError(401, "Invalid email or password");
  }

  if (!user.emailVerifiedAt) {
    throw new AppError(403, "Please verify your email before logging in");
  }

  const sessionId = crypto.randomUUID();
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id, sessionId);
  const refreshTokenHash = await hashPassword(refreshToken);

  await deleteSessionByDeviceId(sessionOptions.deviceId);
  await createSession({
    userId: user.id,
    id: sessionId,
    refreshTokenHash,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    deviceName: "unknown",
    ...sessionOptions,
  });

  return {
    user: serializeUser(user),
    accessToken,
    refreshToken,
  };
};

export const refreshTokens = async (
  refreshToken: string,
  sessionOptions: SessionOptions,
) => {
  let payload: jwt.JwtPayload;

  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    console.log({ decoded });
    if (typeof decoded !== "object" || decoded === null) {
      throw new Error();
    }
    payload = decoded;
  } catch {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  if (
    payload.type !== "refresh" ||
    typeof payload.sub !== "string" ||
    typeof payload.jti !== "string"
  ) {
    throw new AppError(401, "Invalid refresh token");
  }

  const session = await findSessionById(payload.jti);

  if (!session) {
    throw new AppError(401, "Session not found");
  }

  if (session.revokedAt) {
    throw new AppError(401, "Session has been revoked");
  }

  if (session.expiresAt < new Date()) {
    throw new AppError(401, "Session has expired");
  }

  const valid = await comparePassword(refreshToken, session.refreshTokenHash);

  if (!valid) {
    await revokeSession(session.id);
    throw new AppError(401, "Invalid refresh token");
  }

  await revokeSession(session.id);

  const newSessionId = crypto.randomUUID();

  const newRefreshToken = generateRefreshToken(session.userId, newSessionId);

  const newRefreshTokenHash = await hashPassword(newRefreshToken);

  await createSession({
    id: newSessionId,
    userId: session.userId,
    refreshTokenHash: newRefreshTokenHash,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    ...sessionOptions,
  });

  const accessToken = generateAccessToken(session.userId);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const logout = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.jti !== "string"
    ) {
      return;
    }

    await revokeSession(decoded.jti);
  } catch {
    // Logout should be idempotent.
  }
};
