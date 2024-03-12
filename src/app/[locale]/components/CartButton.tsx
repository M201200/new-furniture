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
import { useGuestCart } from "@/utils/hooks/zustand/useGuestCart"

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
  const [isAdded, setIsAdded] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(0)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const cart = useGuestCart()
  useEffect(() => {
    if (user_email) {
      const item = cartArr?.find(
        (item) => item.vendor_code === currentVendorCode
      )
      setIsAdded(item ? true : false)
      setAmount(item ? item.amount : 0)
    } else {
      const item = cart.entries?.find(
        (item) => item.vendor_code === currentVendorCode
      )
      setIsAdded(item ? true : false)
      setAmount(item ? item.amount : 0)
    }
  }, [user_email, cartArr, currentVendorCode, amount, isAdded, cart])

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
            router.refresh()
          } else {
            cart.add({ vendor_code: currentVendorCode, amount: 1 })
            addItem("cart", { vendor_code: currentVendorCode, amount: 1 })
          }
        }}
      >
        Add to cart
      </button>
    </div>
  ) : (
    <div>
      <button
        onClick={() => {
          setAmount(amount - 1)
          if (amount! < 1) setIsAdded(false)
          if (user_email) {
            startTransition(() => {
              updateAmount(user_email, currentVendorCode, amount - 1)
            })
            router.refresh()
          } else {
            if (amount! - 1 < 1) {
              cart.remove(currentVendorCode)
              removeItem("cart", currentVendorCode)
              router.refresh()
            } else {
              const values = (getValues("cart") || []) as CartItem[]
              values[
                values.findIndex(
                  (item) => item.vendor_code === currentVendorCode
                )
              ].amount = amount - 1
              localStorage.setItem("cart", JSON.stringify(values))
              cart.setAmount(currentVendorCode, amount - 1)
            }
          }
        }}
      >
        -
      </button>
      <span>{amount}</span>
      <button
        onClick={() => {
          setAmount(amount + 1)
          if (user_email) {
            startTransition(() => {
              updateAmount(user_email, currentVendorCode, amount + 1)
            })
            router.refresh()
          } else {
            const values = (getValues("cart") || []) as CartItem[]
            values[
              values.findIndex((item) => item.vendor_code === currentVendorCode)
            ].amount = amount + 1
            localStorage.setItem("cart", JSON.stringify(values))
            cart.setAmount(currentVendorCode, amount + 1)
          }
        }}
      >
        +
      </button>
    </div>
  )
}
