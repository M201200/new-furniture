"use client"
import { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"

type CartItemProps = {
  locale: Locale
  vendorCode: string
  name: string
  imageURL: string
  price: number
  discount: number
  finalPrice: number
  user_email: string | null | undefined
  amount: number
  rates: Rates
  currentCurrency: Currency | null
  orderDate?: Date | null
}

export default function ReceiptItem({
  locale,
  vendorCode,
  name,
  imageURL,
  price,
  discount,
  finalPrice,
  user_email,
  amount,
  currentCurrency,
  rates,
  orderDate,
}: CartItemProps) {
  const [currency, setCurrency] = useState<Currency | null>(currentCurrency)
  const [newPrice, setNewPrice] = useState(price)
  const [newFinalPrice, setNewFinalPrice] = useState(finalPrice)
  const [currencyLocale, setCurrencyLocale] = useState("en")
  const [rate, setRate] = useState(1)

  useEffect(() => {
    if (!user_email) {
      const storage = localStorage.getItem("currency") as Currency | null
      setCurrency(storage ? storage : "USD")
    } else setCurrency(currentCurrency)
    setCurrencyLocale(
      currency === "USD" ? "en" : currency === "EUR" ? "de" : "ru"
    )
    setRate(currency === "USD" ? 1 : currency === "EUR" ? rates.EUR : rates.MDL)
    setNewPrice(+(price * rate).toFixed(2))
    setNewFinalPrice(+(finalPrice * rate).toFixed(2))
  }, [currency, currentCurrency, rates, rate, finalPrice, price, user_email])

  return (
    <div
      className={`grid ${
        orderDate
          ? "lg:grid-cols-[1fr,0.75fr,0.75fr,0.75fr,0.5fr]"
          : "lg:grid-cols-[5rem,1fr,0.75fr,0.75fr]"
      }  items-center gap-4 border-b text-textPrimary last:border-none p-2 border-b-borderThin`}
    >
      <Link href={`/${locale}/furniture/${vendorCode}`}>
        <Image
          className="rounded-lg drop-shadow-md"
          src={imageURL}
          alt={name}
          width={272}
          height={272}
        />
      </Link>

      <ul className="grid gap-1 justify-start truncate">
        <li className="truncate">
          <Link
            className="truncate"
            href={`/${locale}/furniture/${vendorCode}`}
          >
            <h2 className="fluid-base text-textSecondary truncate">{name}</h2>
          </Link>
        </li>
      </ul>

      <div className="grid gap-1 min-w-28 min-h-12 lg:items-center lg:px-3 lg:border-x lg:border-x-borderThin">
        <div className=" fluid-base rounded-lg text-center lg:justify-self-center flex">
          <span className=" text-textPrimary fluid-base">Amount: {amount}</span>
        </div>
        {amount > 1 ? (
          <div className="flex justify-center">
            <span className="fluid-sm text-textSecondary text-wrap text-center">
              {new Intl.NumberFormat(currencyLocale, {
                style: "currency",
                currency: currency || "USD",
              }).format(newFinalPrice)}{" "}
              per item
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex gap-2 items-baseline lg:justify-center flex-wrap">
        <div>
          <span className=" fluid-lg font-bold">
            {new Intl.NumberFormat(currencyLocale, {
              style: "currency",
              currency: currency || "USD",
            }).format(amount * newFinalPrice)}
          </span>
        </div>
        {discount > 0 ? (
          <div className="flex gap-2 items-baseline">
            <span className="line-through text-textCrossed fluid-base">
              {new Intl.NumberFormat(currencyLocale, {
                style: "currency",
                currency: currency || "USD",
              }).format(amount * newPrice)}
            </span>
            <span className="text-red-500 fluid-base font-semibold">
              {" "}
              -{discount}%
            </span>
          </div>
        ) : null}
      </div>
      {orderDate ? (
        <div className="fluid-base grid gap-1 px-2">
          <span className="text-textSecondary">Order date: </span>
          <span className="text-textPrimary text-sm">
            {orderDate.toLocaleString(locale, {
              hour12: false,
            })}
          </span>
        </div>
      ) : null}
    </div>
  )
}
