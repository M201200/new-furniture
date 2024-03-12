import { and, count, eq, isNull, like, or } from "drizzle-orm"

import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { db } from "@/app/db"
import { items, itemsImageURL, itemsName } from "@/app/db/schema"
import { auth } from "@/app/lib/auth"
import { getUserPreferences } from "@/utils/functions/getUserPreferences"
import sanitizeStringToNumber from "@/utils/functions/sanitizeStringToNumber"

import ItemComponent from "../components/ItemComponent"
import Pagination from "../components/Pagination"

type Search = {
  params: {
    locale: Locale
  }
  searchParams?: {
    query?: string
    page?: string
  }
}
export default async function Search({ params, searchParams }: Search) {
  const maxItemsOnPage = 12
  const sanitizedPage = sanitizeStringToNumber(searchParams?.page) || 1
  const sanitizedQuery = searchParams?.query
    ? decodeURI(searchParams?.query)?.replace(
        /[^a-zA-Zа-яА-Я0-9\s\(\)\-]/gi,
        ""
      )
    : ""
  console.log(sanitizedQuery)
  const itemName =
    params.locale === "en"
      ? itemsName.en
      : params.locale === "ro"
      ? itemsName.ro
      : params.locale === "ru"
      ? itemsName.ru
      : itemsName.en

  const searchCountArrQuery = db
    .select({ totalItems: count(itemsName.id) })
    .from(itemsName)
    .where(like(itemName, `%${sanitizedQuery}%`))
    .execute()

  const searchResultsQuery = db
    .select({
      vendorCode: items.vendor_code,
      name: itemName,
      price: items.price,
      discount: items.discount,
      finalPrice: items.final_price,
      thumbnailURL: itemsImageURL.url,
    })
    .from(itemsName)
    .where(
      or(
        and(
          like(itemName, `%${sanitizedQuery}%`),
          eq(itemsImageURL.image_number, 1)
        ),
        and(
          like(itemName, `%${sanitizedQuery}%`),
          isNull(itemsImageURL.vendor_code)
        )
      )
    )
    .innerJoin(items, eq(itemsName.vendor_code, items.vendor_code))
    .leftJoin(
      itemsImageURL,
      eq(itemsName.vendor_code, itemsImageURL.vendor_code)
    )
    .limit(maxItemsOnPage)
    .offset(sanitizedPage ? (sanitizedPage - 1) * maxItemsOnPage : 0)
    .execute()

  const [searchCountArr, searchResults] = await Promise.all([
    searchCountArrQuery,
    searchResultsQuery,
  ])

  const totalItems = searchCountArr[0].totalItems

  const session = await auth()
  const user_email = session?.user?.email || null

  const userPreferences = await getUserPreferences()
  const userCart = userPreferences.cart
  const userFavorites = userPreferences.favorites
  const currentCurrency = userPreferences.currency

  const rates: Rates = await getCurrencyConversion()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {totalItems > 0 && searchResults?.length ? (
        <ul>
          {searchResults?.map((item) => (
            <ItemComponent
              key={item.vendorCode}
              vendorCode={item.vendorCode!}
              locale={params.locale}
              imageURL={
                item.thumbnailURL
                  ? item.thumbnailURL
                  : "/images/" +
                    item.vendorCode
                      ?.replace(/\-/gi, "/")
                      .replace(/m\d+w\d+h\d+d\d+/gi, "m0w0h0d0") +
                    "/1.webp"
              }
              name={item.name}
              price={item.price}
              discount={item.discount}
              finalPrice={item.finalPrice!}
              cartArr={userCart}
              favoritesArr={userFavorites}
              currentCurrency={currentCurrency}
              user_email={user_email}
              rates={rates}
            />
          ))}
        </ul>
      ) : (
        <ul>
          <li>Nothing found</li>
        </ul>
      )}
      <Pagination totalPages={Math.ceil(totalItems / maxItemsOnPage)} />
    </main>
  )
}
