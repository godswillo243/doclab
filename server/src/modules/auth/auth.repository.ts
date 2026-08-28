import { eq } from "drizzle-orm";

import { db } from "../../db/index.js";
import { users } from "../../db/schema/index.js";
import { NewUser } from "../../db/schema/types.js";

export const findUserByEmail = async (email: string) => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result[0] ?? null;
};

export const findUserByUsername = async (username: string) => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  return result[0] ?? null;
};

export const findUserById = async (id: string) => {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result[0] ?? null;
};

export const createUser = async (data: {
  email: string;
  username: string;
  displayName: string;
  passwordHash: string;
}) => {
  const result = await db.insert(users).values(data).returning();

  return result[0] ?? null;
};

export const updateUser = async (userId: string, data: Partial<NewUser>) => {
  await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, userId));
};
