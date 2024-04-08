import { db } from "../.."
import { itemsName } from "../../schema"
import { itemsNameArr } from "../../values/itemsName"

// export const runtime = "edge"

export async function POST() {
  const newItemsName = await db
    .insert(itemsName)
    .values(itemsNameArr)
    .onConflictDoNothing()
    .execute()

  return new Response(JSON.stringify(newItemsName))
}
