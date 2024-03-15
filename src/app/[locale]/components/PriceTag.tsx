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
  const [newPrice, setNewPrice] = useState(price)
  const [newFinalPrice, setNewFinalPrice] = useState(finalPrice)
  const [sign, setSign] = useState("$")
  const [rate, setRate] = useState(1)
  useEffect(() => {
    if (!user_email) {
      const storage = localStorage.getItem("currency") as Currency | null
      setCurrency(storage ? storage : "USD")
    } else setCurrency(currentCurrency)
    setSign(currency === "USD" ? "$" : currency === "EUR" ? "€" : "MDL")
    setRate(
      currency === "USD"
        ? 1
        : currency === "EUR"
        ? exchangeRates.EUR
        : exchangeRates.MDL
    )
    setNewPrice(+(price * rate).toFixed(2))
    setNewFinalPrice(+(finalPrice * rate).toFixed(2))
  }, [
    currency,
    currentCurrency,
    exchangeRates,
    rate,
    finalPrice,
    price,
    user_email,
  ])
  return (
    <div className="flex gap-2 items-baseline flex-wrap">
      <div>
        <span className="text-gray-600 fluid-lg font-bold">
          {newFinalPrice}
          {sign}{" "}
        </span>
      </div>
      {discount > 0 ? (
        <div className="flex gap-2 items-baseline">
          <span className="line-through text-gray-500 fluid-base">
            {newPrice}
            {sign}{" "}
          </span>
          <span className="text-red-500 fluid-lg font-semibold">
            {" "}
            -{discount}%
          </span>
        </div>
      ) : null}
    </div>
  )
}
