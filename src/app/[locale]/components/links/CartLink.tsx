"use client"
import { SetStateAction, useCallback, useEffect } from "react"

import Link from "next/link"
import { BsCart4 } from "react-icons/bs"

import { getValues } from "@/utils/functions/LocalStorageActions"
import { useCart } from "@/utils/hooks/zustand/useCart"

type FavoritesLinkProps = {
  tl: string
  locale: Locale
  cartArr: CartItem[] | null | undefined
  isOpen: (value: SetStateAction<boolean>) => void
}
export default function CartLink({
  tl,
  locale,
  cartArr,
  isOpen,
}: FavoritesLinkProps) {
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
        className="grid items-center gap-2 text-center p-1 rounded"
        href={`/${locale}/cart`}
        onClick={() => isOpen(false)}
        title={tl}
      >
        <BsCart4 className="fluid-lg justify-self-center" />
        <span className="fluid-sm font-semibold">{tl}</span>
      </Link>
    </li>
  )
}
