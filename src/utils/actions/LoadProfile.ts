"use server"

import { db } from "@/app/db"
import { cart, favorites, user_profile } from "@/app/db/schema"
import { eq } from "drizzle-orm"

export default async function loadProfile(
  locale: Locale,
  userEmail: string | null | undefined
) {
  const userPreferencesResult = userEmail
    ? await db
        .select({
          email: user_profile.user_email,
          theme: user_profile.theme,
          language: user_profile.language,
          currency: user_profile.currency,
        })
        .from(user_profile)
        .where(eq(user_profile.user_email, userEmail || ""))
        .execute()
    : null

  const userPreferences = userPreferencesResult
    ? userPreferencesResult[0]
    : null

  if (userEmail && !userPreferences) {
    await db
      .insert(user_profile)
      .values({
        user_email: userEmail!,
      })
      .execute()
  }

  const favoritesArr = userEmail
    ? await db
        .select({ vendor_code: favorites.item_vendor_code })
        .from(favorites)
        .where(eq(favorites.user_email, userEmail))
        .execute()
    : null

  const favVendorCodes = favoritesArr
    ? favoritesArr.map((favorite) => favorite.vendor_code)
    : null

  const cartArr = userEmail
    ? await db
        .select({ vendor_code: cart.item_vendor_code, amount: cart.amount })
        .from(cart)
        .where(eq(cart.user_email, userEmail))
        .execute()
    : null

  const theme = (
    userPreferences?.theme ? userPreferences.theme : null
  ) as Theme | null

  const preferredLocale = (userPreferences?.language || locale) as Locale

  const currency = userPreferences?.currency as Currency | null

  return { theme, preferredLocale, currency, favVendorCodes, cartArr }
}
