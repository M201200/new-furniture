import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import * as schema from "./schema"
import * as dotenv from "dotenv"

dotenv.config({
  path: ".env.local",
})

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
})

export const db = drizzle(connection, { schema })
