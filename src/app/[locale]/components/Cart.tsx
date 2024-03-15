"use client"

import { useCallback, useEffect, useState } from "react"

import getAllItems from "@/utils/actions/getAllItems"
import { useCart } from "@/utils/hooks/zustand/useCart"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

import ItemComponent from "./ItemComponent"

type CartProps = {
  locale: Locale
  rates: Rates
  userEmail: string | null | undefined
}

export default function Cart({ locale, rates, userEmail }: CartProps) {
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
  const [vendorCodes, setVendorCodes] = useState<string[] | null | undefined>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const language = usePreferences((state) => state.locale)
  const currency = usePreferences((state) => state.currency)

  const currentRate =
    currency === "EUR" ? rates.EUR : currency === "MDL" ? rates.MDL : 1

  const sign = currency === "EUR" ? "€" : currency === "MDL" ? "MDL" : "$"

  const cart = useCart((state) => state.entries)
  console.log(cart)

  useEffect(() => {
    setVendorCodes(cart?.map((item) => item.vendor_code))
  }, [cart])

  const loadItems = useCallback(() => {
    // const cartVendorCodes = cart?.map((item) => item.vendor_code)
    getAllItems(vendorCodes, language)
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
  }, [language, cart, vendorCodes])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  return (
    <section className="min-h-screen">
      <h1 className="fluid-3xl font-bold p-4">Cart</h1>
      {totalPrice ? (
        <ul className="p-2 flex gap-2">
          <li className="fluid-lg">Total price:</li>
          <li className="fluid-lg font-bold">
            {(+totalPrice * currentRate).toFixed(2)}
            {sign}
          </li>
        </ul>
      ) : null}
      <ul className="flex flex-wrap gap-6">
        {loading ? (
          <li className="fluid-xl font-bold p-2">Loading...</li>
        ) : error ? (
          <li className="fluid-xl font-bold p-2">Error occurred</li>
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
          <li className="fluid-xl font-bold p-2">Nothing found</li>
        )}
      </ul>
    </section>
  )
}
