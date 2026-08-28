import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import { authSessions } from "../../db/schema/index";
import { NewAuthSession } from "../../db/schema/types";

export const createSession = async (data: NewAuthSession) => {
  const result = await db.insert(authSessions).values(data).returning();

  return result[0];
};

export const findSessionByDeviceId = async (deviceId: string) => {
  const result = await db
    .select()
    .from(authSessions)
    .where(eq(authSessions.deviceId, deviceId))
    .limit(1);

  return result[0] ?? null;
};
export const findSessionById = async (id: string) => {
  const result = await db
    .select()
    .from(authSessions)
    .where(eq(authSessions.id, id))
    .limit(1);

  return result[0] ?? null;
};

export const deleteSessionByDeviceId = async (deviceId: string) => {
  await db.delete(authSessions).where(eq(authSessions.deviceId, deviceId));
};

export const revokeSession = async (id: string) => {
  await db
    .update(authSessions)
    .set({
      revokedAt: new Date(),
    })
    .where(eq(authSessions.id, id));
};
