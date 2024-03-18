import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { auth } from "@/app/lib/auth"
import sanitizeStringToNumber from "@/utils/functions/sanitizeStringToNumber"

import Favorites from "../components/pageClientSide/Favorites"

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

  return (
    <main>
      <Favorites
        locale={params.locale}
        rates={rates}
        currentPage={searchParamsSanitized?.page || 1}
        maxItemsOnPage={maxItemsOnPage}
        userEmail={session?.user?.email}
      />
    </main>
  )
}
