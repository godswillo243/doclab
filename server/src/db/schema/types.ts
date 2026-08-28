import { authSessions } from "./auth-sessions";
import type { otpPurposeEnum } from "./otps";
import { users } from "./users";

export type OtpPurpose = (typeof otpPurposeEnum.enumValues)[number];
export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type AuthSession = typeof authSessions.$inferSelect;
export type NewAuthSession = typeof authSessions.$inferInsert;
