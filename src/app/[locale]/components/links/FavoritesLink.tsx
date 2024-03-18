"use client"
import { SetStateAction, useCallback, useEffect } from "react"

import Link from "next/link"
import { BsHeart } from "react-icons/bs"

import { getValues } from "@/utils/functions/LocalStorageActions"
import { useFavorites } from "@/utils/hooks/zustand/useFavorites"

type FavoritesLinkProps = {
  locale: Locale
  favoritesArr: string[] | null | undefined
  isOpen: (value: SetStateAction<boolean>) => void
}
export default function FavoritesLink({
  locale,
  favoritesArr,
  isOpen,
}: FavoritesLinkProps) {
  const setFavorites = useFavorites((state) => state.set)
  const loadFavorites = useCallback(() => {
    favoritesArr
      ? setFavorites(favoritesArr)
      : setFavorites(getValues("favorites") as string[] | null)
  }, [favoritesArr, setFavorites])

  useEffect(() => {
    loadFavorites()
  }, [loadFavorites])

  return (
    <li>
      <Link
        className="grid items-center gap-2 text-center p-1 rounded"
        href={`/${locale}/favorites`}
        onClick={() => isOpen(false)}
      >
        <BsHeart className="fluid-lg justify-self-center" />
        <span className="fluid-sm font-semibold">Favorites</span>
      </Link>
    </li>
  )
}
