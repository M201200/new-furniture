"use server"

import { eq } from "drizzle-orm"

import { db } from "@/app/db"
import {
  accounts,
  cart,
  favorites,
  orders,
  user_profile,
  users,
} from "@/app/db/schema"

export default async function deleteProfile(user_email: string) {
  const userIdArr = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, user_email))
  const userId = userIdArr[0].id
  return await db.transaction(async (tx) => {
    await tx.delete(users).where(eq(users.email, user_email))
    await tx.delete(accounts).where(eq(accounts.userId, userId))
    await tx.delete(user_profile).where(eq(user_profile.user_email, user_email))
    await tx.delete(favorites).where(eq(favorites.user_email, user_email))
    await tx.delete(cart).where(eq(cart.user_email, user_email))
    await tx.delete(orders).where(eq(orders.user_email, user_email))
  })
}
