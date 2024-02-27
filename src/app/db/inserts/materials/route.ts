import { sql } from "drizzle-orm"
import { db } from "../.."
import { materials } from "../../schema"
import { materialsArr } from "../../values/materials"

export const runtime = "edge"

export async function POST() {
  const newMaterials = await db
    .insert(materials)
    .values(materialsArr)
    .onDuplicateKeyUpdate({
      set: { id: sql`id` },
    })
    .execute()

  return new Response(JSON.stringify(newMaterials))
}
