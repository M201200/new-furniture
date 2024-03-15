import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { auth } from "@/app/lib/auth"

import Cart from "../components/Cart"

type ProfilePageParams = {
  params: {
    locale: Locale
  }
}

export default async function CartPage({ params }: ProfilePageParams) {
  const rates: Rates = await getCurrencyConversion()
  const session = await auth()

  return (
    <main>
      <Cart
        locale={params.locale}
        rates={rates}
        userEmail={session?.user?.email}
      />
    </main>
  )
}
