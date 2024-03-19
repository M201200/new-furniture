import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { auth } from "@/app/lib/auth"

import Cart from "../components/pageClientSide/Cart"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

type ProfilePageParams = {
  params: {
    locale: Locale
  }
}

export default async function CartPage({ params }: ProfilePageParams) {
  unstable_setRequestLocale(params.locale)
  const rates: Rates = await getCurrencyConversion()
  const session = await auth()
  const tlAsync = await getTranslations("Cart")
  const statesTl = await getTranslations("States")

  const tl = {
    Cart: tlAsync("Cart"),
    Select: tlAsync("Select"),
    DeleteSelected: tlAsync("DeleteSelected"),
    Accept: tlAsync("Accept"),
    Delete: tlAsync("Delete"),
    Cancel: tlAsync("Cancel"),
    Order: tlAsync("Order"),
    Congratulation: tlAsync("Congratulation"),
    Proceed: tlAsync("Proceed"),
    Total: tlAsync("Total"),
    Orders: tlAsync("Orders"),
    Selected: tlAsync("Selected"),
    Discount: tlAsync("Discount"),
    FinalPrice: tlAsync("FinalPrice"),
    DeleteDisclaimer: tlAsync("DeleteDisclaimer"),
    LogInDisclaimer: tlAsync("LogInDisclaimer"),
    EnterNumber: tlAsync("EnterNumber"),
    PerItem: tlAsync("PerItem"),
    NothingFound: statesTl("NothingFound"),
    Loading: statesTl("Loading"),
    Error: statesTl("Error"),
    TotalItems: tlAsync("TotalItems"),
    OrderDate: tlAsync("OrderDate"),
  }

  return (
    <main>
      <Cart
        tl={tl}
        locale={params.locale}
        rates={rates}
        userEmail={session?.user?.email}
      />
    </main>
  )
}
