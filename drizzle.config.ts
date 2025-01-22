import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import env from "./src/schema/env";

export default defineConfig({
  out: "./src/db/migration",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  strict: true,
  dbCredentials: {
    url: `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:5432/${env.POSTGRES_DB}`,
  },
});
