import { db } from "../.."
import { colors } from "../../schema"
import { colorsArr } from "../../values/colors"

// export const runtime = "edge"

export async function POST() {
  const newColors = await db
    .insert(colors)
    .values(colorsArr)
    .onConflictDoNothing()
    .execute()

  return new Response(JSON.stringify(newColors))
}
