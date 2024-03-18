import { eq } from "drizzle-orm"
import Link from "next/link"

import { db } from "@/app/db"
import { cart, categories, favorites, user_profile } from "@/app/db/schema"
import { auth } from "@/app/lib/auth"

import { ActionButtons } from "./common/ActionButtons"
import { Categories } from "./common/Categories"
import SearchBar from "./common/SearchBar"
import CurrencySwitcher from "./switchers/CurrencySwitcher"
import LanguageSwitcher from "./switchers/LanguageSwitcher"
import ThemeToggle from "./switchers/ThemeToggle"

type HeaderParams = {
  locale: Locale
}

export async function Header({ locale }: HeaderParams) {
  const session = await auth()
  const userEmail = session?.user?.email
  const categories = await loadCategories(locale)
  const userPreferences = await loadProfile(locale, userEmail)
  return (
    <header className="grid gap-1 p-2">
      <ul className="flex gap-2 px-4 py-2">
        <li>
          <LanguageSwitcher
            locale={userPreferences.preferredLocale}
            user_email={userEmail}
          />
        </li>
        <li>
          <CurrencySwitcher
            user_email={userEmail}
            currentCurrency={userPreferences?.currency as Currency | null}
          />
        </li>
        <li>
          <ThemeToggle
            currentTheme={userPreferences.theme}
            user_email={userEmail}
          />
        </li>
      </ul>
      <ul className="grid lg:grid-cols-[0.5fr,0.5fr,3fr,1fr] grid-cols-[0.5fr,1fr,0.5fr] gap-6 items-center">
        <Link
          className="fluid-lg lg:justify-self-start flex gap-1 justify-center lg:col-start-1 lg:col-end-2 col-start-2 col-end-3"
          href={`/${locale}/`}
        >
          <b className="text-amber-700">New</b>{" "}
          <em className="text-brand2">Furniture</em>
        </Link>

        <Categories locale={locale} sortedCategories={categories} />
        <SearchBar locale={locale} />
        <ActionButtons
          locale={locale}
          session={session}
          userPreferences={userPreferences}
        />
      </ul>
    </header>
  )
}

type sortedCategory = {
  code: number
  name: string
  layer: number
  subcategory: sortedCategory[]
}

async function loadProfile(
  locale: Locale,
  userEmail: string | null | undefined
) {
  const userPreferencesResult = userEmail
    ? await db
        .select({
          email: user_profile.user_email,
          theme: user_profile.theme,
          language: user_profile.language,
          currency: user_profile.currency,
        })
        .from(user_profile)
        .where(eq(user_profile.user_email, userEmail || ""))
        .execute()
    : null

  const userPreferences = userPreferencesResult
    ? userPreferencesResult[0]
    : null

  if (userEmail && !userPreferences) {
    await db
      .insert(user_profile)
      .values({
        user_email: userEmail!,
      })
      .execute()
  }

  const favoritesArr = userEmail
    ? await db
        .select({ vendor_code: favorites.item_vendor_code })
        .from(favorites)
        .where(eq(favorites.user_email, userEmail))
        .execute()
    : null

  const favVendorCodes = favoritesArr
    ? favoritesArr.map((favorite) => favorite.vendor_code)
    : null

  const cartArr = userEmail
    ? await db
        .select({ vendor_code: cart.item_vendor_code, amount: cart.amount })
        .from(cart)
        .where(eq(cart.user_email, userEmail))
        .execute()
    : null

  const theme = (
    userPreferences?.theme ? userPreferences.theme : null
  ) as Theme | null

  const preferredLocale = (userPreferences?.language || locale) as Locale

  const currency = userPreferences?.currency as Currency | null

  return { theme, preferredLocale, currency, favVendorCodes, cartArr }
}

async function loadCategories(locale: Locale) {
  const categoriesArr = await db
    .select({
      code: categories.code,
      name:
        locale === "en"
          ? categories.en
          : locale === "ro"
          ? categories.ro
          : locale === "ru"
          ? categories.ru
          : categories.en,
      layer: categories.layer,
    })
    .from(categories)

  let sortedCategories: sortedCategory[] = []
  for (let i = 0; i < categoriesArr.length; i++) {
    if (categoriesArr[i].layer > 1) {
      if (
        categoriesArr[i].layer === 3 &&
        sortedCategories.some((element) =>
          categoriesArr[i].code.toString().startsWith(element?.code.toString())
        )
      ) {
        sortedCategories[
          sortedCategories.findIndex((element) =>
            categoriesArr[i].code.toString().startsWith(element.code.toString())
          )
        ].subcategory.push({
          code: categoriesArr[i].code,
          name: categoriesArr[i].name,
          layer: categoriesArr[i].layer,
          subcategory: [],
        })
      } else
        sortedCategories.push({
          code: categoriesArr[i].code,
          name: categoriesArr[i].name,
          layer: categoriesArr[i].layer,
          subcategory: [],
        })
    }
  }

  return sortedCategories
}
