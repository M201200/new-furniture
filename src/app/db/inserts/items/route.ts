import { db } from "../.."
import { items } from "../../schema"
import { itemsArr } from "../../values/items"

// export const runtime = "edge"

export async function POST() {
  const newItems = await db
    .insert(items)
    .values(itemsArr)
    .onConflictDoNothing()
    .execute()

  return new Response(JSON.stringify(newItems))
}
