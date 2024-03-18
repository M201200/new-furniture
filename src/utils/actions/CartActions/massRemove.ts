"use server"

import { and, eq, inArray } from "drizzle-orm"

import { db } from "@/app/db"
import { cart } from "@/app/db/schema"

export default async function massRemove(
  user_email: string,
  vendor_codes: string[]
) {
  return await db
    .delete(cart)
    .where(
      and(
        eq(cart.user_email, user_email),
        inArray(cart.item_vendor_code, vendor_codes)
      )
    )
}
