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

  const exchangeRate =
    currency === "USD"
      ? 1
      : currency === "EUR"
      ? exchangeRates.EUR
      : exchangeRates.MDL
  return (
    <div>
      <span>
        Price: {newFinalPrice}
        {sign}{" "}
      </span>
      {discount > 0 ? (
        <>
          <span className="line-through">
            {newPrice}
            {sign}{" "}
          </span>
          <span>{discount}%</span>
        </>
      ) : null}
    </div>
  )
}
