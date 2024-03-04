"use server"

import { eq } from "drizzle-orm"

import { db } from "@/app/db"
import { user_profile } from "@/app/db/schema"

export default async function updatePreferredTheme(
  user_email: string,
  value: Theme
) {
  "use server"
  return await db
    .update(user_profile)
    .set({ theme: value })
    .where(eq(user_profile.user_email, user_email || ""))
    .execute()
}
