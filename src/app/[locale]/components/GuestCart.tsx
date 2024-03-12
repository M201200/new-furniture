"use client"

import { useCallback, useEffect, useState } from "react"

import getAllItems from "@/utils/actions/getAllItems"
import { useGuestCart } from "@/utils/hooks/zustand/useGuestCart"
import { useGuestFavorites } from "@/utils/hooks/zustand/useGuestFavorites"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

import ItemComponent from "./ItemComponent"

type GuestFavoritesProps = {
  locale: Locale
  rates: Rates
}

export default function GuestCart({ locale, rates }: GuestFavoritesProps) {
  const [items, setItems] = useState<
    | {
        vendor_code: string | null
        name: string
        amount: number
        price: number
        discount: number
        final_price: number | null
        thumbnailURL: string | null
      }[]
    | null
    | undefined
  >(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const language = usePreferences((state) => state.locale)
  const currency = usePreferences((state) => state.currency)

  const currentRate =
    currency === "EUR" ? rates.EUR : currency === "MDL" ? rates.MDL : 1

  const favorites = useGuestFavorites((state) => state.entries)
  const cart = useGuestCart((state) => state.entries)

  const loadItems = useCallback(() => {
    getAllItems(
      cart?.map((item) => item.vendor_code),
      language
    )
      .then((data) => {
        setItems(data)
        setTotalPrice(
          data && cart
            ? data
                ?.map(
                  (item) =>
                    +item.final_price! *
                    cart?.find(
                      (cartItem) => cartItem.vendor_code === item.vendor_code
                    )?.amount!
                )
                .reduce((a, b) => a + b)
            : 0
        )
        setLoading(false)
      })
      .catch((err) => {
        setError(true)
      })
  }, [language, cart])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  console.log(totalPrice)

  return (
    <section>
      <h2>Cart</h2>
      {loading ? (
        <li>Loading...</li>
      ) : error ? (
        <li>Error occurred</li>
      ) : totalPrice ? (
        <p>
          Total price: {(+totalPrice * currentRate).toFixed(2)} {currency}
        </p>
      ) : null}
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : error ? (
          <li>Error occurred</li>
        ) : items?.length ? (
          items.map((item) => (
            <ItemComponent
              key={item.vendor_code}
              vendorCode={item.vendor_code!}
              name={item.name}
              imageURL={item.thumbnailURL!}
              price={item.price}
              discount={item.discount}
              finalPrice={item.final_price!}
              user_email={null}
              currentCurrency={currency}
              locale={locale}
              favoritesArr={favorites}
              cartArr={cart}
              rates={rates}
            />
          ))
        ) : (
          <li>Nothing found</li>
        )}
      </ul>
    </section>
  )
}
