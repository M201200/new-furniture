import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { auth } from "@/app/lib/auth"
import sanitizeStringToNumber from "@/utils/functions/sanitizeStringToNumber"

import Favorites from "../components/pageClientSide/Favorites"
import { getTranslations } from "next-intl/server"

type FavoritesPageParams = {
  params: {
    locale: Locale
  }
  searchParams?: {
    page?: string
  }
}

export default async function FavoritesPage({
  params,
  searchParams,
}: FavoritesPageParams) {
  const session = await auth()
  const maxItemsOnPage = 12
  const searchParamsSanitized = searchParams
    ? {
        page: sanitizeStringToNumber(searchParams?.page) || 1,
      }
    : null

  const rates = await getCurrencyConversion()

  const favoritesTlAsync = await getTranslations("Favorites")
  const statesTLAsync = await getTranslations("States")
  const tl = {
    Favorites: favoritesTlAsync("Favorites"),
    NothingFound: statesTLAsync("NothingFound"),
    Loading: statesTLAsync("Loading"),
    Error: statesTLAsync("Error"),
  }

  return (
    <main>
      <Favorites
        tl={tl}
        locale={params.locale}
        rates={rates}
        currentPage={searchParamsSanitized?.page || 1}
        maxItemsOnPage={maxItemsOnPage}
        userEmail={session?.user?.email}
      />
    </main>
  )
}
