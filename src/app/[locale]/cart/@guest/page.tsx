import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"

import GuestCart from "../../components/GuestCart"

type ProfilePageParams = {
  params: {
    locale: Locale
  }
}

export default async function CartPage({ params }: ProfilePageParams) {
  const rates: Rates = await getCurrencyConversion()

  return (
    <main>
      <GuestCart locale={params.locale} rates={rates} />
    </main>
  )
}
