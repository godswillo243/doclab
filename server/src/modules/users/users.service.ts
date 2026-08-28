import { AppError } from "../../lib/app-error.js";
import { findUserById } from "../auth/auth.repository.js";
import { serializeUser } from "./users.utils.js";

export const getCurrentUser = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return serializeUser(user);
};
