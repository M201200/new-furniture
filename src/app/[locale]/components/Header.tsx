import { eq } from "drizzle-orm"
import Link from "next/link"

import { db } from "@/app/db"
import { cart, categories, favorites, user_profile } from "@/app/db/schema"
import { auth } from "@/app/lib/auth"

import CartLink from "./CartLink"
import { Categories } from "./Categories"
import CurrencySwitcher from "./CurrencySwitcher"
import FavoritesLink from "./FavoritesLink"
import LanguageSwitcher from "./LanguageSwitcher"
import SearchBar from "./SearchBar"
import SignIn from "./SignIn"
import ThemeToggle from "./ThemeToggle"

type HeaderParams = {
  locale: Locale
}

export async function Header({ locale }: HeaderParams) {
  const session = await auth()
  const userEmail = session?.user?.email
  const categories = await loadCategories(locale)
  const userPreferences = await loadProfile(locale, userEmail)
  return (
    <header className="grid gap-1 px-2 py-1">
      <ul className="flex gap-2">
        <li>
          <LanguageSwitcher
            locale={userPreferences.preferredLocale}
            user_email={userEmail}
          />
        </li>
        <li>
          <ThemeToggle
            currentTheme={userPreferences.theme}
            user_email={userEmail}
          />
        </li>
        <li>
          <CurrencySwitcher
            user_email={userEmail}
            currentCurrency={userPreferences?.currency as Currency | null}
          />
        </li>
      </ul>
      <ul className="flex justify-between gap-2 items-center">
        <Link className="fluid-lg" href={`/${locale}/`}>
          <b>New</b> <em>Furniture</em>
        </Link>
        <ul className="flex gap-4">
          <Categories locale={locale} sortedCategories={categories} />
          <SearchBar locale={locale} />
        </ul>

        <ul className="flex gap-2">
          <CartLink locale={locale} cartArr={userPreferences?.cartArr} />
          <FavoritesLink
            locale={locale}
            favoritesArr={userPreferences?.favVendorCodes}
          />
          <li>
            <Link
              className="flex bg-gray-600 text-white fluid-base text-center p-2 rounded"
              href={`/${locale}/profile`}
            >
              {session ? session.user?.name : "Guest"}
            </Link>
          </li>
          <li>
            <SignIn />
          </li>
        </ul>
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
