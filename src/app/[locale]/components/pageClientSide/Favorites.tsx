"use client"

import { useCallback, useEffect, useState } from "react"

import getItems from "@/utils/actions/getItems"
import { useFavorites } from "@/utils/hooks/zustand/useFavorites"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

import Pagination from "../common/Pagination"
import ItemComponent from "../items/ItemComponent"

type GuestFavoritesProps = {
  locale: Locale
  currentPage: number
  maxItemsOnPage: number
  rates: Rates
  userEmail: string | null | undefined
  tl: {
    Favorites: string
    NothingFound: string
    Loading: string
    Error: string
  }
}

export default function Favorites({
  tl,
  locale,
  currentPage,
  maxItemsOnPage,
  rates,
  userEmail,
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
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const language = usePreferences((state) => state.locale)
  const currency = usePreferences((state) => state.currency)

  const favorites = useFavorites((state) => state.entries)

  const loadItems = useCallback(
    () =>
      getItems(favorites, language, currentPage, maxItemsOnPage)
        .then((data) => {
          setItems(data.items)
          setTotalItems(data.totalItems)
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
    <section className="text-textPrimary min-h-[40vh]">
      <h2 className="fluid-3xl font-bold py-4 px-2">{tl.Favorites}</h2>
      <ul className="flex flex-wrap justify-center gap-6 p-2">
        {loading ? (
          <li className="fluid-xl font-bold p-2">{tl.Loading}</li>
        ) : error ? (
          <li className="fluid-xl font-bold p-2">{tl.Error}</li>
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
              user_email={userEmail}
              currentCurrency={currency}
              locale={locale}
              rates={rates}
            />
          ))
        ) : (
          <li className="fluid-xl font-bold p-2">{tl.NothingFound}</li>
        )}
      </ul>
      <Pagination totalPages={Math.ceil(totalItems / maxItemsOnPage)} />
    </section>
  )
}
