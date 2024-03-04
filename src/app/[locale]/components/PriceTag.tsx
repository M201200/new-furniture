"use client"
import { useEffect, useState } from "react"

type PriceProps = {
  price: number
  discount: number
  finalPrice: number
  currentCurrency: Currency | null
  exchangeRates: Rates
}

export default function PriceTag({
  price,
  discount,
  finalPrice,
  currentCurrency,
  exchangeRates,
}: PriceProps) {
  const [currency, setCurrency] = useState<Currency | null>(currentCurrency)
  useEffect(() => {
    const storage = localStorage.getItem("currency") as Currency | null
    setCurrency(storage ? storage : "USD")
  }, [currency, currentCurrency])
  const sign = currency === "USD" ? "$" : currency === "EUR" ? "€" : "MDL"

  const exchangeRate =
    currency === "USD"
      ? 1
      : currency === "EUR"
      ? exchangeRates.EUR
      : exchangeRates.MDL
  return (
    <div>
      <span>
        Price: {(finalPrice * exchangeRate).toFixed(2)}
        {sign}{" "}
      </span>
      {discount > 0 ? (
        <>
          <span className="line-through">
            {(price * exchangeRate).toFixed(2)}
            {sign}{" "}
          </span>
          <span>{discount}%</span>
        </>
      ) : null}
    </div>
  )
}
