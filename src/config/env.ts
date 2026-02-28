import "dotenv/config";
import { AppError } from "../errors/app-error";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new AppError(`Missing env: ${name}`, 500, "ENV_MISSING");
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  HOST: process.env.HOST ?? "0.0.0.0",
  PORT: Number(process.env.PORT ?? 3000),
  JWT_SECRET: required("JWT_SECRET"),
} as const;