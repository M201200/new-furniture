import type { Config } from "drizzle-kit"
import { loadEnvConfig } from "@next/env"
import { cwd } from "process"

loadEnvConfig(cwd())

export default {
  schema: "./src/app/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.PLANETSCALE_DB_HOST!,
    user: process.env.PLANETSCALE_DB_USERNAME!,
    password: process.env.PLANETSCALE_DB_PASSWORD!,
    database: process.env.PLANETSCALE_DB!,
  },
  out: "./migrations",
} satisfies Config
