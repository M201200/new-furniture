import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import {
  mysqlTable,
  uniqueIndex,
  varchar,
  serial,
} from "drizzle-orm/mysql-core"

const connection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
})

const db = drizzle(connection)

export const categories = mysqlTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    category: varchar("category", { length: 64 }),
  },
  (categories) => ({
    categoryIndex: uniqueIndex("category_idx").on(categories.category),
  })
)

type NewCategory = typeof categories.$inferInsert

const insertCategory = async (newCategory: NewCategory) => {
  return await db.insert(categories).values(newCategory)
}

insertCategory({ category: "Electronics" })
