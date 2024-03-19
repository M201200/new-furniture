import { and, between, desc, eq } from "drizzle-orm"

import { db } from "../db"
import { items, itemsImageURL, itemsName, user_profile } from "../db/schema"
import ItemComponent from "./components/items/ItemComponent"
import { auth } from "../lib/auth"
import getCurrencyConversion from "../api/currencyConversion/currencyConversion"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"

type HomeProps = {
  params: {
    locale: Locale
  }
}

export default async function Home({ params }: HomeProps) {
  unstable_setRequestLocale(params.locale)
  const session = await auth()
  const rates: Rates = await getCurrencyConversion()

  const tl = await getTranslations("MainPage")

  let currentCurrency: Currency | null

  if (session) {
    const preferredCurrencyArr = await db
      .select()
      .from(user_profile)
      .where(eq(user_profile.user_email, session.user?.email || ""))
      .execute()
    currentCurrency = preferredCurrencyArr[0].currency as Currency
  } else {
    currentCurrency = null
  }
  const itemsResults = await db
    .select({
      vendor_code: items.vendor_code,
      initial_price: items.price,
      discount: items.discount,
      final_price: items.final_price,
      name:
        params.locale === "en"
          ? itemsName.en
          : params.locale === "ro"
          ? itemsName.ro
          : params.locale === "ru"
          ? itemsName.ru
          : itemsName.en,
      amount: items.amount,
      thumbnailURL: itemsImageURL.url,
    })
    .from(items)
    .where(
      and(between(items.discount, 20, 30), eq(itemsImageURL.image_number, 1))
    )
    .innerJoin(itemsName, eq(items.vendor_code, itemsName.vendor_code))
    .innerJoin(itemsImageURL, eq(itemsImageURL.vendor_code, items.vendor_code))
    .limit(12)
    .orderBy(desc(items.discount))
  return (
    <main className="grid items-center justify-between">
      <section className="grid gap-4 text-center rounded-lg bg-cover p-8 bg-[url('/images/main-sale-bg.jpg')] bg-blend-difference text-gray-100 mt-4 mb-8  bg-green-900 ">
        <h1 className="text-4xl text-center font-bold">{tl("Sale")}</h1>
        <p className="text-2xl text-gray-200 font-semibold">
          {tl("UpTo")} <b className="text-gray-100">30%</b> {tl("Off")}
        </p>
      </section>

      <ul className="flex flex-wrap justify-center gap-8">
        {itemsResults?.length
          ? itemsResults.map((item) => (
              <ItemComponent
                key={item.vendor_code}
                locale={params.locale}
                vendorCode={item.vendor_code!}
                name={item.name!}
                imageURL={item.thumbnailURL!}
                price={item.initial_price!}
                discount={item.discount!}
                finalPrice={item.final_price!}
                user_email={session?.user?.email}
                currentCurrency={currentCurrency}
                rates={rates}
              />
            ))
          : null}
      </ul>
    </main>
  )
}
