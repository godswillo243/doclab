import { z } from "zod";
import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config({ quiet: true });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(4000),

  CLIENT_URL: z.url(),

  DATABASE_URL: z.url(),

  COOKIE_SECRET: z.string().min(32),

  JWT_ACCESS_SECRET: z.string().min(32),

  JWT_REFRESH_SECRET: z.string().min(32),

  JWT_ACCESS_EXPIRES_IN: z
    .string()
    .default("15m")
    .transform((value) => value as StringValue),

  JWT_REFRESH_EXPIRES_IN: z
    .string()
    .default("30d")
    .transform((value) => value as StringValue),

  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  SMTP_SERVICE: z.string(),
  SMTP_FROM: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(z.treeifyError(parsed.error));

  process.exit(1);
}

export const env = parsed.data;
