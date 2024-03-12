import { and, eq, isNull, or } from "drizzle-orm"

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

type ProfilePageParams = {
  params: {
    locale: Locale
  }
  searchParams?: {
    page?: string
  }
}

export default async function CartPage({
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

  const rates: Rates = await getCurrencyConversion()

  const userCartItems = await db
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
      cartAmount: cart.amount,
      price: items.price,
      discount: items.discount,
      final_price: items.final_price,
      thumbnailURL: itemsImageURL.url,
    })
    .from(cart)
    .where(
      and(
        eq(cart.user_email, session?.user?.email || ""),
        or(eq(itemsImageURL.image_number, 1), isNull(itemsImageURL.vendor_code))
      )
    )
    .innerJoin(items, eq(cart.item_vendor_code, items.vendor_code))
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

  const favoritesArr = await db
    .select({
      vendor_code: favorites.item_vendor_code,
    })
    .from(favorites)
    .where(eq(favorites.user_email, session?.user?.email || ""))
    .execute()

  const preferredCurrencyArr = await db
    .select()
    .from(user_profile)
    .where(eq(user_profile.user_email, session.user?.email || ""))
    .execute()

  const preferredCurrency = preferredCurrencyArr[0].currency as Currency

  const currentRate =
    preferredCurrency === "EUR"
      ? rates.EUR
      : preferredCurrency === "MDL"
      ? rates.MDL
      : 1

  const totalPrice = userCartItems
    .map((item) => item.final_price! * item.cartAmount)
    .reduce((a, b) => a + b)

  return (
    <main>
      <section>
        <h2>Cart</h2>
        {totalPrice ? (
          <p>
            Total price: {(+totalPrice * currentRate).toFixed(2)}{" "}
            {preferredCurrency}
          </p>
        ) : null}
        <ul>
          {userCartItems?.length ? (
            userCartItems.map((item) => (
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
                rates={rates}
                currentCurrency={preferredCurrency}
                favoritesArr={favoritesArr.map((item) => item.vendor_code)}
                cartArr={userCartItems.map(
                  (item) =>
                    ({
                      vendor_code: item.vendor_code,
                      amount: item.cartAmount,
                    } as CartItem)
                )}
              />
            ))
          ) : (
            <li>No items</li>
          )}
        </ul>
      </section>
    </main>
  )
}
