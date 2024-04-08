import { db } from "../.."
import { itemsImageURL } from "../../schema"
import { itemsImageURLArr } from "../../values/itemsImageURL"

// export const runtime = "edge"

export async function POST() {
  const newItemsImageURL = await db
    .insert(itemsImageURL)
    .values(itemsImageURLArr)
    .onConflictDoNothing()
    .execute()

  return new Response(JSON.stringify(newItemsImageURL))
}
