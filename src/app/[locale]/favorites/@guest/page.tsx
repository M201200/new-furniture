import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import sanitizeStringToNumber from "@/utils/functions/sanitizeStringToNumber"

import GuestFavorites from "../../components/GuestFavorites"

type ProfilePageParams = {
  params: {
    locale: Locale
  }
  searchParams?: {
    page?: string
  }
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageParams) {
  const maxItemsOnPage = 12
  const searchParamsSanitized = searchParams
    ? {
        page: sanitizeStringToNumber(searchParams?.page) || 1,
      }
    : null

  const rates = await getCurrencyConversion()

  return (
    <main>
      <GuestFavorites
        locale={params.locale}
        rates={rates}
        currentPage={searchParamsSanitized?.page || 1}
        maxItemsOnPage={maxItemsOnPage}
      />
    </main>
  )
}
