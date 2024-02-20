import { sql } from "drizzle-orm"
import { db } from "../.."
import { itemsDescription } from "../../schema"
import { itemsDescriptionArr } from "../../values/itemsDescription"

export const runtime = "edge"

export async function POST() {
  const newItemsDescription = await db
    .insert(itemsDescription)
    .values(itemsDescriptionArr)
    .onDuplicateKeyUpdate({
      set: { id: sql`id` },
    })
    .execute()

  return new Response(JSON.stringify(newItemsDescription))
}
