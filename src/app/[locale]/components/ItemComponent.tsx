import { eq } from "drizzle-orm"
import Image from "next/image"
import Link from "next/link"

import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { db } from "@/app/db"
import { user_profile } from "@/app/db/schema"
import { auth } from "@/app/lib/auth"

import PriceTag from "./PriceTag"

type ItemProps = {
  locale: Locale
  vendorCode: string
  name: string
  imageURL: string
  price: number
  discount: number
  finalPrice: number
}

export default async function ItemComponent({
  locale,
  vendorCode,
  name,
  imageURL,
  price,
  discount,
  finalPrice,
}: ItemProps) {
  const conversions = await getCurrencyConversion()
  const rates: Rates = {
    EUR: conversions.EUR,
    MDL: conversions.MDL,
  }
  const session = await auth()

  let currentCurrency

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
  return (
    <li>
      <Link href={`/${locale}/furniture/${vendorCode}`}>
        <Image src={imageURL} alt={name} width={200} height={200} />
        <PriceTag
          price={price}
          discount={discount}
          finalPrice={finalPrice}
          currentCurrency={currentCurrency}
          exchangeRates={rates}
        />
        <h2>{name}</h2>
      </Link>
    </li>
  )
}
