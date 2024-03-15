"use client"

import { useState, useTransition } from "react"

import { BsFillHeartFill, BsHeart } from "react-icons/bs"

import addToFavorites from "@/utils/actions/FavoritesActions/addToFavorites"
import removeFromFavorites from "@/utils/actions/FavoritesActions/removeFromFavorites"
import { addItem, removeItem } from "@/utils/functions/LocalStorageActions"
import { useFavorites } from "@/utils/hooks/zustand/useFavorites"

type AddToCartProps = {
  user_email: string | null | undefined
  currentVendorCode: string
}

export default function FavoritesButton({
  user_email,
  currentVendorCode,
}: AddToCartProps) {
  const favorites = useFavorites((state) => state.entries)
  const addFavorites = useFavorites((state) => state.add)
  const removeFavorites = useFavorites((state) => state.remove)
  const [isAdded, setIsAdded] = useState<boolean | undefined | null>(
    favorites?.some((vendor_code) => vendor_code === currentVendorCode)
      ? true
      : false
  )
  const [isPending, startTransition] = useTransition()

  return (
    <button
      className="px-2 py-3 bg-green-700 text-white rounded-lg text-center fluid-base flex justify-center transition-colors"
      onClick={() => {
        setIsAdded(!isAdded)
        if (user_email) {
          !isAdded
            ? addFavorites(currentVendorCode)
            : removeFavorites(currentVendorCode)
          startTransition(() => {
            !isAdded
              ? addToFavorites(user_email, currentVendorCode)
              : removeFromFavorites(user_email, currentVendorCode)
          })
        } else {
          if (!isAdded) {
            addFavorites(currentVendorCode)
            addItem("favorites", currentVendorCode)
          } else {
            removeFavorites(currentVendorCode)
            removeItem("favorites", currentVendorCode)
          }
        }
      }}
    >
      <span className={`fluid-lg ${isAdded ? "text-red-600" : ""}`}>
        {" "}
        {isAdded ? <BsFillHeartFill /> : <BsHeart />}
      </span>
    </button>
  )
}
