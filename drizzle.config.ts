import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/migration",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
