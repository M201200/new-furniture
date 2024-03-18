"use server"

import { and, eq } from "drizzle-orm"

import { db } from "@/app/db"
import { cart } from "@/app/db/schema"

export default async function updateAmount(
  user_email: string,
  vendor_code: string,
  amount: number
) {
  if (amount < 1) {
    return await db
      .delete(cart)
      .where(
        and(
          eq(cart.user_email, user_email),
          eq(cart.item_vendor_code, vendor_code)
        )
      )
  }
  return await db
    .update(cart)
    .set({ amount: amount })
    .where(
      and(
        eq(cart.user_email, user_email),
        eq(cart.item_vendor_code, vendor_code)
      )
    )
    .execute()
}
