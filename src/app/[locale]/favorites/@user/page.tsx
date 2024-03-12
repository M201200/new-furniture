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

import ItemComponent from "../../components/ItemComponent"
import Pagination from "../../components/Pagination"

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
  if (!session) return

  const maxItemsOnPage = 12
  const searchParamsSanitized = searchParams
    ? {
        page: sanitizeStringToNumber(searchParams?.page) || 1,
      }
    : null

  const rates = await getCurrencyConversion()

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
        or(eq(itemsImageURL.image_number, 1), isNull(itemsImageURL.vendor_code))
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
    .where(eq(user_profile.user_email, session?.user?.email || ""))
    .execute()

  const preferredCurrency = preferredCurrencyArr[0].currency as Currency

  const userFavoritesCount = await db
    .select({
      totalItems: count(favorites.id),
    })
    .from(favorites)
    .where(
      // and(
      eq(favorites.user_email, session?.user?.email || "")
      //   or(eq(itemsImageURL.image_number, 1), isNull(itemsImageURL.vendor_code))
      // )
    )
    .orderBy(favorites.id)

  const totalItems = userFavoritesCount[0].totalItems

  const totalPages =
    totalItems > maxItemsOnPage ? Math.ceil(totalItems / maxItemsOnPage) : 1

  return (
    <main>
      <section>
        <h2>Favorites</h2>
        <ul>
          {totalItems ? (
            userFavoriteItems.map((item) => (
              <ItemComponent
                key={item.vendor_code}
                locale={params.locale}
                vendorCode={item.vendor_code!}
                name={item.name}
                imageURL={
                  item.thumbnailURL
                    ? item.thumbnailURL
                    : "/images/" +
                      item.vendor_code
                        ?.replace(/\-/gi, "/")
                        .replace(/m\d+w\d+h\d+d\d+/gi, "m0w0h0d0") +
                      "/1.webp"
                }
                price={item.price}
                discount={item.discount}
                finalPrice={item.final_price!}
                user_email={session?.user?.email || ""}
                cartArr={cartArr}
                rates={rates}
                currentCurrency={preferredCurrency}
                favoritesArr={
                  userFavoriteItems.map((item) => item.vendor_code) as
                    | string[]
                    | null
                }
              />
            ))
          ) : (
            <li>No items</li>
          )}
        </ul>
      </section>
      <Pagination totalPages={totalPages} />
    </main>
  )
}
