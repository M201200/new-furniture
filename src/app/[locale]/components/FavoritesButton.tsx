"use client"

import { useEffect, useState, useTransition } from "react"

import { useRouter } from "next/navigation"

import addToFavorites from "@/utils/actions/FavoritesActions/addToFavorites"
import removeFromFavorites from "@/utils/actions/FavoritesActions/removeFromFavorites"
import {
  addItem,
  getValues,
  removeItem,
} from "@/utils/functions/LocalStorageActions"

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

  useEffect(() => {
    if (user_email) {
      const item = favoritesArr?.find(
        (vendor_code) => vendor_code === currentVendorCode
      )
      setIsAdded(item ? true : false)
    } else {
      const values = getValues("favorites") as string[] | null
      const item = values?.find(
        (vendor_code) => vendor_code === currentVendorCode
      )
      setIsAdded(item ? true : false)
    }
  }, [user_email, favoritesArr, currentVendorCode])

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
          } else {
            addItem("favorites", currentVendorCode)
          }
          router.refresh()
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
          } else {
            removeItem("favorites", currentVendorCode)
          }
          router.refresh()
        }}
      >
        Remove from favorites
      </button>
    </div>
  )
}
