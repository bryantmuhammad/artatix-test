import {
  boolean,
  mysqlTable,
  serial,
  smallint,
  varchar,
} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: serial().primaryKey().autoincrement(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const talentTable = mysqlTable("talent", {
  id: serial().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  isActive: smallint().notNull().default(0),
});
