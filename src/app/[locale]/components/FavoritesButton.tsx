"use client"

import { useEffect, useState, useTransition } from "react"

import { useRouter } from "next/navigation"

import addToFavorites from "@/utils/actions/FavoritesActions/addToFavorites"
import removeFromFavorites from "@/utils/actions/FavoritesActions/removeFromFavorites"
import { addItem, removeItem } from "@/utils/functions/LocalStorageActions"
import { useGuestFavorites } from "@/utils/hooks/zustand/useGuestFavorites"

type AddToCartProps = {
  user_email: string | null | undefined
  favoritesArr: string[] | null | undefined
  currentVendorCode: string
}

export default function FavoritesButton({
  user_email,
  favoritesArr,
  currentVendorCode,
}: AddToCartProps) {
  const [isAdded, setIsAdded] = useState<boolean | undefined | null>()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const favorites = useGuestFavorites()

  useEffect(() => {
    if (user_email) {
      setIsAdded(
        favoritesArr?.some((vendor_code) => vendor_code === currentVendorCode)
      )
    } else {
      setIsAdded(
        favorites.entries?.some(
          (vendor_code) => vendor_code === currentVendorCode
        )
      )
    }
  }, [user_email, favoritesArr, currentVendorCode, favorites])

  return isPending ? (
    <span>Pending</span>
  ) : !isAdded ? (
    <div>
      <button
        onClick={() => {
          setIsAdded(true)
          if (user_email) {
            startTransition(() => {
              addToFavorites(user_email, currentVendorCode)
            })
            router.refresh()
          } else {
            favorites.add(currentVendorCode)
            addItem("favorites", currentVendorCode)
          }
        }}
      >
        Add to favorites
      </button>
    </div>
  ) : (
    <div>
      <button
        onClick={() => {
          setIsAdded(false)
          if (user_email) {
            startTransition(() => {
              removeFromFavorites(user_email, currentVendorCode)
            })
            router.refresh()
          } else {
            favorites.remove(currentVendorCode)
            removeItem("favorites", currentVendorCode)
          }
        }}
      >
        Remove from favorites
      </button>
    </div>
  )
}
