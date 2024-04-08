"use server"

import { sql } from "drizzle-orm"

import { db } from "@/app/db"
import { orders } from "@/app/db/schema"

export type Order = typeof orders.$inferInsert

export default async function orderItems(userOrders: Order[]) {
  return await db
    .insert(orders)
    .values(userOrders)
    .onConflictDoNothing()
    .execute()
}
