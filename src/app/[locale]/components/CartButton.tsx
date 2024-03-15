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
}

export default function CartButton({
  user_email,
  currentVendorCode,
}: AddToCartProps) {
  const cart = useCart()
  const [amount, setAmount] = useState<number>(
    cart.entries?.find((item) => item.vendor_code === currentVendorCode)
      ?.amount || 0
  )
  const [isPending, startTransition] = useTransition()

  return (
    <div className="text-white rounded-lg text-center grid grid-flow-col">
      {!amount ? (
        <button
          className="px-2 py-3 bg-blue-800 rounded-lg text-center fluid-lg"
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
            <BsCartPlus /> Add to cart
          </span>
        </button>
      ) : (
        <>
          <button
            className="px-2 py-3 bg-blue-700 rounded-lg fluid-base"
            onClick={() => {
              if (amount! - 1 < 1) cart.remove(currentVendorCode)
              else {
                setAmount(amount - 1)
                cart.setAmount(currentVendorCode, amount - 1)
              }
              if (user_email) {
                startTransition(() => {
                  updateAmount(user_email, currentVendorCode, amount - 1)
                })
              } else {
                if (amount! - 1 < 1) {
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
          <span className="px-2 py-3 bg-white text-black fluid-base">
            {amount}
          </span>
          <button
            className="px-2 py-3 bg-blue-700 rounded-lg fluid-base"
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
