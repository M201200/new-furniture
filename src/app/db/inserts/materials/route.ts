import { db } from "../.."
import { materials } from "../../schema"
import { materialsArr } from "../../values/materials"

// export const runtime = "edge"

export async function POST() {
  const newMaterials = await db
    .insert(materials)
    .values(materialsArr)
    .onConflictDoNothing()
    .execute()

  return new Response(JSON.stringify(newMaterials))
}
