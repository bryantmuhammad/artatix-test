import { integer, pgTable, smallint, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const talentTable = pgTable("talent", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  isActive: smallint().notNull().default(0),
});
