import { User } from "../../db/schema/types";

export function generateOTP(length: number = 6): string {
  const otp = Math.floor(
    10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1),
  );
  return otp.toString().padStart(6, "0");
}

export const serializeUser = (user: User) => ({
  id: user.id,
  email: user.email,
  username: user.username,
  displayName: user.displayName,
  avatarUrl: user.avatarUrl,
  emailVerifiedAt: user.emailVerifiedAt,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
