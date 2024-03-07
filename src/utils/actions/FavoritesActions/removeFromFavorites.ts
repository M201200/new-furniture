"use server"

import { and, eq } from "drizzle-orm"

import { db } from "@/app/db"
import { favorites } from "@/app/db/schema"

export default async function removeFromFavorites(
  user_email: string,
  vendor_code: string
) {
  "use server"
  return await db
    .delete(favorites)
    .where(
      and(
        eq(favorites.user_email, user_email),
        eq(favorites.item_vendor_code, vendor_code)
      )
    )
}
