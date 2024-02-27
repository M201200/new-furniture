import { sql } from "drizzle-orm"
import { db } from "../.."
import { colors } from "../../schema"
import { colorsArr } from "../../values/colors"

export const runtime = "edge"

export async function POST() {
  const newColors = await db
    .insert(colors)
    .values(colorsArr)
    .onDuplicateKeyUpdate({
      set: { id: sql`id` },
    })
    .execute()

  return new Response(JSON.stringify(newColors))
}
