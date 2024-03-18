"use client"
import { useEffect, useState } from "react"

type PriceProps = {
  price: number
  discount: number
  finalPrice: number
  currentCurrency: Currency | null
  exchangeRates: Rates
  user_email?: string | null
}

export default function PriceTag({
  price,
  discount,
  finalPrice,
  currentCurrency,
  exchangeRates,
  user_email,
}: PriceProps) {
  const [currency, setCurrency] = useState<Currency | null>(currentCurrency)
  const [newPrice, setNewPrice] = useState<number | string>(price)
  const [newFinalPrice, setNewFinalPrice] = useState<number | string>(
    finalPrice
  )
  const [locale, setLocale] = useState("us")
  const [rate, setRate] = useState(1)
  useEffect(() => {
    if (!user_email) {
      const storage = localStorage.getItem("currency") as Currency | null
      setCurrency(storage ? storage : "USD")
    } else setCurrency(currentCurrency)
    setLocale(currency === "USD" ? "en" : currency === "EUR" ? "de" : "ru")
    setRate(
      currency === "USD"
        ? 1
        : currency === "EUR"
        ? exchangeRates.EUR
        : exchangeRates.MDL
    )
    setNewPrice(
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency || "USD",
      }).format(price * rate)
    )
    setNewFinalPrice(
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency || "USD",
      }).format(finalPrice * rate)
    )
  }, [
    currency,
    currentCurrency,
    exchangeRates,
    rate,
    finalPrice,
    price,
    user_email,
    locale,
  ])
  return (
    <div className="flex gap-2 items-baseline flex-wrap">
      <div>
        <span
          className="text-textSecondary fluid-lg font-bold"
          title={`${newFinalPrice}`}
        >
          {newFinalPrice}
        </span>
      </div>
      {discount > 0 ? (
        <div className="flex gap-2 items-baseline">
          <span
            className="line-through text-textCrossed fluid-base"
            title={`${newPrice}`}
          >
            {newPrice}
          </span>
          <span className="text-red-600 fluid-lg font-semibold">
            {" "}
            -{discount}%
          </span>
        </div>
      ) : null}
    </div>
  )
}
