import { sql } from "drizzle-orm"
import { db } from "../.."
import { items } from "../../schema"
import { itemsArr } from "../../values/items"

export const runtime = "edge"

export async function POST() {
  const newCategory = await db
    .insert(items)
    .values(itemsArr)
    .onDuplicateKeyUpdate({
      set: { id: sql`id` },
    })
    .execute()

  return new Response(JSON.stringify(newCategory))
}
