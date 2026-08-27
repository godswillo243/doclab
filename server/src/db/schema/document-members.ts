import { pgEnum, pgTable, timestamp, uuid, unique } from "drizzle-orm/pg-core";

import { documents } from "./documents.js";
import { users } from "./users.js";

export const documentRoleEnum = pgEnum("document_role", [
  "editor",
  "commenter",
  "viewer",
]);

export const documentMembers = pgTable(
  "document_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, {
        onDelete: "cascade",
      }),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    role: documentRoleEnum("role").notNull().default("viewer"),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("document_members_document_user_unique").on(
      table.documentId,
      table.userId,
    ),
  ],
);
