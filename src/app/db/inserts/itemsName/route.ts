import { sql } from "drizzle-orm"
import { db } from "../.."
import { itemsName } from "../../schema"
import { itemsNameArr } from "../../values/itemsName"

export const runtime = "edge"

export async function POST() {
  const newCategory = await db
    .insert(itemsName)
    .values(itemsNameArr)
    .onDuplicateKeyUpdate({
      set: { id: sql`id` },
    })
    .execute()

  return new Response(JSON.stringify(newCategory))
}
