"use client"

import { useEffect, useState, useTransition } from "react"

import { useRouter } from "next/navigation"

import addToCart from "@/utils/actions/CartActions/addToCart"
import updateAmount from "@/utils/actions/CartActions/updateAmount"
import {
  addItem,
  getValues,
  removeItem,
} from "@/utils/functions/LocalStorageActions"

type AddToCartProps = {
  user_email: string | null | undefined
  cartArr: CartItem[] | null | undefined
  currentVendorCode: string
}

export default function CartButton({
  user_email,
  cartArr,
  currentVendorCode,
}: AddToCartProps) {
  const [isAdded, setIsAdded] = useState<boolean | undefined | null>()
  const [amount, setAmount] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    if (user_email) {
      const item = cartArr?.find(
        (item) => item.vendor_code === currentVendorCode
      )
      setIsAdded(item ? true : false)
      setAmount(item ? item.amount : null)
    } else {
      const values = getValues("cart") as CartItem[] | null
      const item = values?.find(
        (item) => item.vendor_code === currentVendorCode
      )
      setIsAdded(item ? true : false)
      setAmount(item ? item.amount : null)
    }
  }, [user_email, cartArr, currentVendorCode, amount, isAdded])

  return isPending ? (
    <span>Pending</span>
  ) : !isAdded ? (
    <div>
      <button
        onClick={() => {
          setIsAdded(true)
          if (user_email) {
            startTransition(() => {
              addToCart(user_email, currentVendorCode)
            })
          } else {
            const values = (getValues("cart") || []) as CartItem[]
            // @ts-ignore
            addItem("cart", { vendor_code: currentVendorCode, amount: 1 })
          }
          router.refresh()
        }}
      >
        Add to cart
      </button>
    </div>
  ) : (
    <div>
      <button
        onClick={() => {
          setAmount(amount! - 1)
          if (amount! < 1) setIsAdded(false)
          if (user_email) {
            startTransition(() => {
              updateAmount(user_email, currentVendorCode, amount! - 1)
            })
          } else {
            if (amount! - 1 < 1) {
              removeItem("cart", currentVendorCode)
            } else {
              const values = (getValues("cart") || []) as CartItem[]
              values[
                values.findIndex(
                  (item) => item.vendor_code === currentVendorCode
                )
              ].amount = amount! - 1
              localStorage.setItem("cart", JSON.stringify(values))
            }
          }
          router.refresh()
        }}
      >
        -
      </button>
      <span>{amount}</span>
      <button
        onClick={() => {
          setAmount(amount! + 1)
          if (user_email) {
            startTransition(() => {
              updateAmount(user_email, currentVendorCode, amount! + 1)
            })
          } else {
            const values = (getValues("cart") || []) as CartItem[]
            values[
              values.findIndex((item) => item.vendor_code === currentVendorCode)
            ].amount = amount! + 1
            localStorage.setItem("cart", JSON.stringify(values))
          }
          router.refresh()
        }}
      >
        +
      </button>
    </div>
  )
}
