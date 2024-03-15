"use client"
import { useCallback, useEffect } from "react"

import Link from "next/link"
import { BsCart4 } from "react-icons/bs"

import { getValues } from "@/utils/functions/LocalStorageActions"
import { useCart } from "@/utils/hooks/zustand/useCart"

type FavoritesLinkProps = {
  locale: Locale
  cartArr: CartItem[] | null | undefined
}
export default function CartLink({ locale, cartArr }: FavoritesLinkProps) {
  const setCart = useCart((state) => state.set)
  const loadCart = useCallback(() => {
    cartArr ? setCart(cartArr) : setCart(getValues("cart") as CartItem[] | null)
  }, [cartArr, setCart])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  return (
    <li>
      <Link
        className="flex gap-2 bg-blue-700 text-white fluid-base text-center p-2 rounded"
        href={`/${locale}/cart`}
      >
        {" "}
        <BsCart4 className="fluid-lg" />
        Cart
      </Link>
    </li>
  )
}
