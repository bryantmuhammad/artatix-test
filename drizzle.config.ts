import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import databaseCredential from "./src/utils/database";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: databaseCredential,
});
