"use client"
import { useCallback, useEffect } from "react"

import Link from "next/link"
import { BsHeart } from "react-icons/bs"

import { getValues } from "@/utils/functions/LocalStorageActions"
import { useFavorites } from "@/utils/hooks/zustand/useFavorites"

type FavoritesLinkProps = {
  locale: Locale
  favoritesArr: string[] | null | undefined
}
export default function FavoritesLink({
  locale,
  favoritesArr,
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
        className="flex gap-2 bg-green-700 text-white fluid-base text-center p-2 rounded"
        href={`/${locale}/favorites`}
      >
        <BsHeart className="fluid-lg" /> Favorites
      </Link>
    </li>
  )
}
