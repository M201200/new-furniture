"use client"

import { useCallback, useEffect, useState } from "react"

import getItems from "@/utils/actions/getItems"
import { useGuestCart } from "@/utils/hooks/zustand/useGuestCart"
import { useGuestFavorites } from "@/utils/hooks/zustand/useGuestFavorites"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

import ItemComponent from "./ItemComponent"
import Pagination from "./Pagination"

type GuestFavoritesProps = {
  locale: Locale
  currentPage: number
  maxItemsOnPage: number
  rates: Rates
}

export default function GuestFavorites({
  locale,
  currentPage,
  maxItemsOnPage,
  rates,
}: GuestFavoritesProps) {
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const language = usePreferences((state) => state.locale)
  const currency = usePreferences((state) => state.currency)

  const favorites = useGuestFavorites((state) => state.entries)
  const cart = useGuestCart((state) => state.entries)

  const loadItems = useCallback(
    () =>
      getItems(favorites, language, currentPage, maxItemsOnPage)
        .then((data) => {
          setItems(data)
          setLoading(false)
        })
        .catch((err) => {
          setError(true)
        }),
    [language, currentPage, maxItemsOnPage, favorites]
  )

  useEffect(() => {
    loadItems()
  }, [loadItems])

  return (
    <section>
      <h2>Favorites</h2>
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
      <Pagination
        totalPages={Math.ceil((items?.length || 0) / maxItemsOnPage)}
      />
    </section>
  )
}
