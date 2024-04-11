"use server"

import { db } from "@/app/db"
import { favorites } from "@/app/db/schema"

export default async function addToFavorites(
  user_email: string,
  vendor_code: string
) {
  "use server"
  return await db
    .insert(favorites)
    .values({
      user_email: user_email,
      item_vendor_code: vendor_code,
    })
    .onConflictDoNothing()
    .execute()
}
