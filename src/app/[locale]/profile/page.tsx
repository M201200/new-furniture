import { and, count, eq, isNull, or } from "drizzle-orm"

import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { db } from "@/app/db"
import {
  cart,
  favorites,
  items,
  itemsImageURL,
  itemsName,
  user_profile,
} from "@/app/db/schema"
import { auth } from "@/app/lib/auth"
import sanitizeStringToNumber from "@/utils/functions/sanitizeStringToNumber"

import FavoriteItem from "../components/FavoriteItem"
import GuestFavorites from "../components/GuestFavorites"

type ProfilePageParams = {
  params: {
    locale: Locale
  }
  searchParams?: {
    page?: string
  }
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageParams) {
  const session = await auth()

  const maxItemsOnPage = 12
  const searchParamsSanitized = searchParams
    ? {
        page: sanitizeStringToNumber(searchParams?.page) || 1,
      }
    : null

  const conversions = await getCurrencyConversion()
  const rates: Rates = {
    EUR: conversions.EUR,
    MDL: conversions.MDL,
  }

  if (session) {
    const userFavoriteItems = await db
      .select({
        vendor_code: items.vendor_code,
        name:
          params.locale === "en"
            ? itemsName.en
            : params.locale === "ro"
            ? itemsName.ro
            : params.locale === "ru"
            ? itemsName.ru
            : itemsName.en,
        amount: items.amount,
        price: items.price,
        discount: items.discount,
        final_price: items.final_price,
        thumbnailURL: itemsImageURL.url,
      })
      .from(favorites)
      .where(
        and(
          eq(favorites.user_email, session?.user?.email || ""),
          or(
            eq(itemsImageURL.image_number, 1),
            isNull(itemsImageURL.vendor_code)
          )
        )
      )
      .innerJoin(items, eq(favorites.item_vendor_code, items.vendor_code))
      .innerJoin(itemsName, eq(items.vendor_code, itemsName.vendor_code))
      .leftJoin(itemsImageURL, eq(items.vendor_code, itemsImageURL.vendor_code))
      .orderBy(items.id)
      .offset(
        searchParamsSanitized?.page
          ? (searchParamsSanitized?.page - 1) * maxItemsOnPage
          : 0
      )
      .limit(maxItemsOnPage)
      .execute()

    const cartArr = await db
      .select({
        vendor_code: cart.item_vendor_code,
        amount: cart.amount,
      })
      .from(cart)
      .where(eq(cart.user_email, session?.user?.email || ""))
      .execute()

    const preferredCurrencyArr = await db
      .select()
      .from(user_profile)
      .where(eq(user_profile.user_email, session.user?.email || ""))
      .execute()

    const preferredCurrency = preferredCurrencyArr[0].currency as Currency

    const userFavoritesCount = await db
      .select({
        totalItems: count(favorites.id),
      })
      .from(favorites)
      .where(
        and(
          eq(favorites.user_email, session?.user?.email || ""),
          or(
            eq(itemsImageURL.image_number, 1),
            isNull(itemsImageURL.vendor_code)
          )
        )
      )
      .orderBy(items.id)

    const itemsCount = userFavoritesCount[0]

    const totalPages =
      itemsCount.totalItems > maxItemsOnPage
        ? Math.ceil(itemsCount.totalItems / maxItemsOnPage)
        : 1

    return (
      <main>
        <h1>User Profile</h1>
        <ul>
          <li>User name: {session.user?.name}</li>
          <li>User email: {session.user?.email}</li>
        </ul>
        <section>
          <h2>Favorites</h2>
          <ul>
            {userFavoriteItems ? (
              userFavoriteItems.map((item) => (
                <FavoriteItem
                  key={item.vendor_code}
                  locale={params.locale}
                  vendorCode={item.vendor_code!}
                  name={item.name}
                  imageURL={item.thumbnailURL || ""}
                  price={item.price}
                  discount={item.discount}
                  finalPrice={item.final_price!}
                  user_email={session?.user?.email || ""}
                  cartArr={cartArr}
                  rates={rates}
                  currentCurrency={preferredCurrency}
                />
              ))
            ) : (
              <li>No items</li>
            )}
          </ul>
        </section>
      </main>
    )
  } else {
    return (
      <main>
        <h1>User Profile</h1>
        <ul>
          <li>User name: Guest</li>
        </ul>
        <section>
          <h2>Favorites</h2>
          <ul>
            <GuestFavorites
              locale={params.locale}
              rates={rates}
              currentPage={searchParamsSanitized?.page || 1}
              maxItemsOnPage={maxItemsOnPage}
            />
          </ul>
        </section>
      </main>
    )
  }
}
