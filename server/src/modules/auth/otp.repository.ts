import { and, eq } from "drizzle-orm";

import { db } from "../../db/index";
import { otps } from "../../db/schema/index";
import type { OtpPurpose } from "../../db/schema/types";

export const createOtp = async (data: {
  email: string;
  codeHash: string;
  purpose: OtpPurpose;
  expiresAt: Date;
}) => {
  const result = await db.insert(otps).values(data).returning();

  return result[0];
};

export const findOtp = async (email: string, purpose: OtpPurpose) => {
  const result = await db
    .select()
    .from(otps)
    .where(and(eq(otps.email, email), eq(otps.purpose, purpose)))
    .orderBy(otps.createdAt)
    .limit(1);

  return result[0] ?? null;
};

export const deleteOtp = async (email: string, purpose: OtpPurpose) => {
  await db
    .delete(otps)
    .where(and(eq(otps.email, email), eq(otps.purpose, purpose)));
};
