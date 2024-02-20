import { sql } from "drizzle-orm"
import { db } from "../.."
import { characteristicsFurniture } from "../../schema"
import { characteristicsFurnitureArr } from "../../values/characteristicsFurniture"

export const runtime = "edge"

export async function POST() {
  const newCharacteristics = await db
    .insert(characteristicsFurniture)
    .values(characteristicsFurnitureArr)
    .onDuplicateKeyUpdate({
      set: { id: sql`id` },
    })
    .execute()

  return new Response(JSON.stringify(newCharacteristics))
}
