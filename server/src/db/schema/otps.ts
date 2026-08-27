import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

export const otpPurposeEnum = pgEnum("otp_purpose", [
  "email_verification",
  "password_reset",
]);

export const otps = pgTable("otps", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: text("email").notNull(),

  codeHash: text("code_hash").notNull(),

  purpose: otpPurposeEnum("purpose").notNull(),

  attempts: integer("attempts").notNull().default(0),

  expiresAt: timestamp("expires_at", {
    withTimezone: true,
  }).notNull(),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
