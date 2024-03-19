"use client"
import { SetStateAction, useEffect, useState, useTransition } from "react"

import Image from "next/image"
import Link from "next/link"
import { BsFillHeartFill, BsTrashFill } from "react-icons/bs"

import updateAmount from "@/utils/actions/CartActions/updateAmount"
import addToFavorites from "@/utils/actions/FavoritesActions/addToFavorites"
import removeFromFavorites from "@/utils/actions/FavoritesActions/removeFromFavorites"
import {
  addItem,
  getValues,
  removeItem,
} from "@/utils/functions/LocalStorageActions"
import { useCart } from "@/utils/hooks/zustand/useCart"
import { useFavorites } from "@/utils/hooks/zustand/useFavorites"

type CartItemProps = {
  tl: string
  locale: Locale
  vendorCode: string
  name: string
  imageURL: string
  price: number
  discount: number
  finalPrice: number
  user_email: string | null | undefined
  rates: Rates
  currentCurrency: Currency | null
  setDialogState: (value: SetStateAction<boolean>) => void
  setDeleteItem: (value: SetStateAction<string | null>) => void
}

export default function CartItem({
  tl,
  locale,
  vendorCode,
  name,
  imageURL,
  price,
  discount,
  finalPrice,
  user_email,
  currentCurrency,
  rates,
  setDialogState,
  setDeleteItem,
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

  const cart = useCart()
  const [amount, setAmount] = useState<number>(
    cart.entries?.find((item) => item.vendor_code === vendorCode)?.amount || 0
  )
  const [isPending, startTransition] = useTransition()

  const favorites = useFavorites((state) => state.entries)
  const addFavorites = useFavorites((state) => state.add)
  const removeFavorites = useFavorites((state) => state.remove)
  const [isAdded, setIsAdded] = useState<boolean | undefined | null>(
    favorites?.some((vendor_code) => vendor_code === vendorCode) ? true : false
  )
  return (
    <div className="grid lg:grid-cols-[5rem,1fr,1fr,1fr] p-1 w-full items-center text-textPrimary gap-4">
      <Link href={`/${locale}/furniture/${vendorCode}`}>
        <Image
          className="rounded-lg drop-shadow-md"
          src={imageURL}
          alt={name}
          width={272}
          height={272}
        />
      </Link>

      <ul className="grid gap-1 truncate">
        <li className="truncate">
          <Link
            className="truncate text-center lg:text-start"
            href={`/${locale}/furniture/${vendorCode}`}
          >
            <h2 className="fluid-base text-textPrimary truncate">{name}</h2>
          </Link>
        </li>
        <li className="flex gap-2 items-center justify-center lg:justify-start">
          <button
            className="p-1  rounded-lg fluid-base flex justify-center transition-colors"
            onClick={() => {
              setIsAdded(!isAdded)
              if (user_email) {
                !isAdded
                  ? addFavorites(vendorCode)
                  : removeFavorites(vendorCode)
                startTransition(() => {
                  !isAdded
                    ? addToFavorites(user_email, vendorCode)
                    : removeFromFavorites(user_email, vendorCode)
                })
              } else {
                if (!isAdded) {
                  addFavorites(vendorCode)
                  addItem("favorites", vendorCode)
                } else {
                  removeFavorites(vendorCode)
                  removeItem("favorites", vendorCode)
                }
              }
            }}
          >
            <span>
              <BsFillHeartFill
                className={`${
                  isAdded ? "text-red-500" : "text-textSecondary"
                } fluid-lg transition-colors`}
              />
            </span>
          </button>
          <button
            className="p-1 text-textSecondary rounded-lg fluid-base flex justify-center"
            onClick={() => {
              setDialogState(true)
              setDeleteItem(vendorCode)
            }}
          >
            <BsTrashFill />
          </button>
        </li>
      </ul>

      <div className="flex gap-2 items-baseline justify-center flex-wrap">
        <div>
          <span className="text-textPrimary fluid-lg font-bold">
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
            <span className="text-red-600 fluid-lg font-semibold">
              {" "}
              -{discount}%
            </span>
          </div>
        ) : null}
      </div>
      <div className="grid gap-1 justify-self-center lg:justify-self-end min-w-40">
        <div className="text-gray-200 rounded-lg text-center grid gap-2 grid-cols-3 max-w-40">
          <button
            className={`px-1 py-2 rounded-lg fluid-base ${
              amount - 1 < 1
                ? "opacity-40 bg-gray-500 cursor-not-allowed"
                : "bg-brand1"
            }`}
            disabled={amount - 1 < 1}
            onClick={() => {
              if (amount - 1 < 1) {
                setAmount(1)
              } else {
                setAmount(amount - 1)
                cart.setAmount(vendorCode, amount - 1)
              }
              if (user_email) {
                startTransition(() => {
                  updateAmount(user_email, vendorCode, amount - 1)
                })
              } else {
                if (amount - 1 < 1) {
                  setAmount(1)
                } else {
                  const values = (getValues("cart") || []) as CartItem[]
                  values[
                    values.findIndex((item) => item.vendor_code === vendorCode)
                  ].amount = amount - 1
                  localStorage.setItem("cart", JSON.stringify(values))
                }
              }
            }}
          >
            -
          </button>
          <span className="px-1 py-2 bg-bgPrimary text-textPrimary fluid-base">
            {amount}
          </span>
          <button
            className="px-1 py-2 bg-brand1 rounded-lg fluid-base"
            onClick={() => {
              setAmount(amount + 1)
              cart.setAmount(vendorCode, amount + 1)
              if (user_email) {
                startTransition(() => {
                  updateAmount(user_email, vendorCode, amount + 1)
                })
              } else {
                const values = (getValues("cart") || []) as CartItem[]
                values[
                  values.findIndex((item) => item.vendor_code === vendorCode)
                ].amount = amount + 1
                localStorage.setItem("cart", JSON.stringify(values))
              }
            }}
          >
            +
          </button>
        </div>
        {amount > 1 ? (
          <div className="flex justify-center">
            <span className="fluid-sm text-gray-500 text-wrap text-center">
              {new Intl.NumberFormat(currencyLocale, {
                style: "currency",
                currency: currency || "USD",
              }).format(newFinalPrice)}{" "}
              {tl}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
