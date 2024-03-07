"use client"

import { useEffect, useState } from "react"

import getGuestFavorites from "@/utils/actions/FavoritesActions/getGuestFavorites"
import { getValues } from "@/utils/functions/LocalStorageActions"

import FavoriteItem from "./FavoriteItem"

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
  const [favorites, setFavorites] = useState<
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
  >(null)
  const [currency, setCurrentCurrency] = useState<Currency | null>(null)
  const [cart, setCart] = useState<CartItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  console.log(favorites)
  console.log(loading)

  useEffect(() => {
    const currency = getValues("currency") as Currency | null
    setCurrentCurrency(currency)
    const cart = getValues("cart") as CartItem[] | null
    setCart(cart)
  }, [])

  useEffect(() => {
    let isCancelled = false
    const values = getValues("favorites") as string[] | null
    async function getFavorites() {
      try {
        const data = await getGuestFavorites(
          values || [""],
          locale,
          currentPage,
          maxItemsOnPage
        )
        if (!isCancelled) {
          setFavorites(data)
          setLoading(false)
        }
      } catch (err) {
        err ? setError(true) : null
      }
    }
    getFavorites()

    return () => {
      isCancelled = true
    }
  }, [locale, currentPage, maxItemsOnPage])
  return loading ? (
    <li>Loading...</li>
  ) : error ? (
    <li>Error occurred</li>
  ) : favorites?.length ? (
    favorites.map((item) => (
      <FavoriteItem
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
        cartArr={cart}
        rates={rates}
      />
    ))
  ) : (
    <li>Nothing found</li>
  )
}
