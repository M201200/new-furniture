import { eq } from "drizzle-orm"

import { db } from "@/app/db"
import { cart, favorites, user_profile } from "@/app/db/schema"
import { auth } from "@/app/lib/auth"

export async function getUserPreferences() {
  const session = await auth()

  if (session) {
    const userCartQuery = db
      .select({
        vendor_code: cart.item_vendor_code,
        amount: cart.amount,
      })
      .from(cart)
      .where(eq(cart.user_email, session?.user?.email || ""))
      .execute()

    const userFavoritesArrQuery = db
      .select({
        vendor_code: favorites.item_vendor_code,
      })
      .from(favorites)
      .where(eq(favorites.user_email, session?.user?.email || ""))
      .execute()

    const preferredCurrencyArrQuery = db
      .select()
      .from(user_profile)
      .where(eq(user_profile.user_email, session.user?.email || ""))
      .execute()

    const [userCart, userFavoritesArr, preferredCurrencyArr] =
      await Promise.all([
        userCartQuery,
        userFavoritesArrQuery,
        preferredCurrencyArrQuery,
      ])

    const userFavorites = userFavoritesArr.map((item) => item.vendor_code)
    const currentCurrency = preferredCurrencyArr[0].currency as Currency

    return {
      favorites: userFavorites,
      cart: userCart,
      currency: currentCurrency,
    }
  } else {
    return { favorites: null, cart: null, currency: null }
  }
}
