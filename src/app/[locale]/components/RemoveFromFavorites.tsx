"use client"

import { useTransition } from "react"

import { useRouter } from "next/navigation"

import removeFromFavorites from "@/utils/actions/FavoritesActions/removeFromFavorites"
import { removeItem } from "@/utils/functions/LocalStorageActions"

type AddToCartProps = {
  user_email: string | null | undefined
  currentVendorCode: string
}

export default function RemoveFromFavorites({
  user_email,
  currentVendorCode,
}: AddToCartProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return isPending ? (
    <span>Pending</span>
  ) : (
    <div>
      <button
        onClick={() => {
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
        X
      </button>
    </div>
  )
}
