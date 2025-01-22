import zod from "zod";

export const envSchema = zod.object({
  PORT: zod.string().default("8080"),
  POSTGRES_DB: zod.string().default("artatix-test"),
  POSTGRES_USER: zod.string().default("postgres"),
  POSTGRES_PASSWORD: zod.string().default("secret"),
  POSTGRES_HOST: zod.string().default("localhost"),
});

const env = envSchema.parse(process.env);

export default env;
