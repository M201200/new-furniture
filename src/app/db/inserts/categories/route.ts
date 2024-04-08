import { db } from "../.."
import { categories } from "../../schema"
import { categoriesArr } from "../../values/categories"

// export const runtime = "edge"

export async function POST() {
  const newCategory = await db
    .insert(categories)
    .values(categoriesArr)
    .onConflictDoNothing()
    .execute()

  return new Response(JSON.stringify(newCategory))
}
