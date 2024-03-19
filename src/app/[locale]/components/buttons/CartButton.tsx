"use client"

import { useState, useTransition } from "react"

import { BsCartPlus } from "react-icons/bs"

import addToCart from "@/utils/actions/CartActions/addToCart"
import updateAmount from "@/utils/actions/CartActions/updateAmount"
import {
  addItem,
  getValues,
  removeItem,
} from "@/utils/functions/LocalStorageActions"
import { useCart } from "@/utils/hooks/zustand/useCart"

type AddToCartProps = {
  user_email: string | null | undefined
  currentVendorCode: string
  locale: Locale
}

export default function CartButton({
  user_email,
  currentVendorCode,
  locale,
}: AddToCartProps) {
  const cart = useCart()
  const [amount, setAmount] = useState<number>(
    cart.entries?.find((item) => item.vendor_code === currentVendorCode)
      ?.amount || 0
  )
  const [isPending, startTransition] = useTransition()

  return (
    <div className="text-white rounded-lg text-center grid grid-cols-3">
      {!amount ? (
        <button
          className="px-2 py-3 bg-brand1 rounded-lg text-center col-span-3 fluid-lg"
          onClick={() => {
            cart.add({ vendor_code: currentVendorCode, amount: 1 })
            setAmount(1)
            if (user_email) {
              startTransition(() => {
                addToCart(user_email, currentVendorCode)
              })
            } else {
              addItem("cart", { vendor_code: currentVendorCode, amount: 1 })
            }
          }}
        >
          <span className="flex gap-2 items-center fluid-base justify-center">
            <BsCartPlus />{" "}
            {locale === "en"
              ? "Add to cart"
              : locale === "ru"
              ? "Добавить в корзину"
              : "Adaugă în coș"}
          </span>
        </button>
      ) : (
        <>
          <button
            className="px-1 py-2 bg-brand1 rounded-lg fluid-lg"
            onClick={() => {
              if (amount - 1 < 1) {
                cart.remove(currentVendorCode)
                setAmount(0)
              } else {
                setAmount(amount - 1)
                cart.setAmount(currentVendorCode, amount - 1)
              }
              if (user_email) {
                startTransition(() => {
                  updateAmount(user_email, currentVendorCode, amount - 1)
                })
              } else {
                if (amount - 1 < 1) {
                  cart.remove(currentVendorCode)
                  removeItem("cart", currentVendorCode)
                } else {
                  const values = (getValues("cart") || []) as CartItem[]
                  values[
                    values.findIndex(
                      (item) => item.vendor_code === currentVendorCode
                    )
                  ].amount = amount - 1
                  localStorage.setItem("cart", JSON.stringify(values))
                }
              }
            }}
          >
            -
          </button>
          <span className="px-1 py-2 bg-bgPrimary text-textPrimary fluid-lg">
            {amount}
          </span>
          <button
            className="px-1 py-2 bg-brand1 rounded-lg fluid-lg"
            onClick={() => {
              setAmount(amount + 1)
              cart.setAmount(currentVendorCode, amount + 1)
              if (user_email) {
                startTransition(() => {
                  updateAmount(user_email, currentVendorCode, amount + 1)
                })
              } else {
                const values = (getValues("cart") || []) as CartItem[]
                values[
                  values.findIndex(
                    (item) => item.vendor_code === currentVendorCode
                  )
                ].amount = amount + 1
                localStorage.setItem("cart", JSON.stringify(values))
              }
            }}
          >
            +
          </button>
        </>
      )}
    </div>
  )
}
