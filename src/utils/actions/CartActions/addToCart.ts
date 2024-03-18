"use server"

import { sql } from "drizzle-orm"

import { db } from "@/app/db"
import { cart } from "@/app/db/schema"

export default async function addToCart(
  user_email: string,
  vendor_code: string
) {
  return await db
    .insert(cart)
    .values({
      user_email: user_email,
      item_vendor_code: vendor_code,
      amount: 1,
    })
    .onDuplicateKeyUpdate({
      set: { id: sql`id` },
    })
    .execute()
}
