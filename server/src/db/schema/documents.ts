import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const documentVisibilityEnum = pgEnum("document_visibility", [
  "private",
  "public",
]);

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(),

  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),

  title: text("title").notNull(),

  slug: text("slug").notNull().unique(),

  content: text("content").notNull().default(""),

  visibility: documentVisibilityEnum("visibility").notNull().default("private"),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  deletedAt: timestamp("deleted_at", {
    withTimezone: true,
  }),
});
