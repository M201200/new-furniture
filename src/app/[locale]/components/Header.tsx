import Link from "next/link"

import { auth } from "@/app/lib/auth"
import loadCategories from "@/utils/actions/loadCategories"
import loadProfile from "@/utils/actions/LoadProfile"

import { ActionButtons } from "./common/ActionButtons"
import { Categories } from "./common/Categories"
import SearchBar from "./common/SearchBar"
import CurrencySwitcher from "./switchers/CurrencySwitcher"
import LanguageSwitcher from "./switchers/LanguageSwitcher"
import ThemeToggle from "./switchers/ThemeToggle"
import { getTranslations } from "next-intl/server"

type HeaderParams = {
  locale: Locale
}

export async function Header({ locale }: HeaderParams) {
  const linksTlQuery = getTranslations("Header")
  const currencyTlQuery = getTranslations("CurrencySwitcher")
  const languageTlQuery = getTranslations("LanguageSwitcher")
  const themeTlQuery = getTranslations("ThemeSwitcher")
  const logInTlQuery = getTranslations("LogIn")

  const [
    linksTlAsync,
    currencyTlAsync,
    languageTlAsync,
    themeTlAsync,
    logInTlAsync,
  ] = await Promise.all([
    linksTlQuery,
    currencyTlQuery,
    languageTlQuery,
    themeTlQuery,
    logInTlQuery,
  ])

  const linksTl = {
    catalog: linksTlAsync("Catalog"),
    searchBar: linksTlAsync("SearchBar"),
    cart: linksTlAsync("Cart"),
    profile: linksTlAsync("Profile"),
    favorites: linksTlAsync("Favorites"),
    signin: logInTlAsync("Signin"),
    signout: logInTlAsync("Signout"),
  }

  const currencyTl = {
    changeCurrency: currencyTlAsync("ChangeCurrency"),
    USD: currencyTlAsync("USD"),
    EUR: currencyTlAsync("EUR"),
    MDL: currencyTlAsync("MDL"),
  }

  const languageTl = {
    changeLanguage: languageTlAsync("ChangeLanguage"),
    en: languageTlAsync("en"),
    ro: languageTlAsync("ro"),
    ru: languageTlAsync("ru"),
  }

  const themeTl = {
    changeTheme: themeTlAsync("ChangeTheme"),
    light: themeTlAsync("Light"),
    dark: themeTlAsync("Dark"),
  }

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
            tl={languageTl}
          />
        </li>
        <li>
          <CurrencySwitcher
            tl={currencyTl}
            user_email={userEmail}
            currentCurrency={userPreferences?.currency as Currency | null}
          />
        </li>
        <li>
          <ThemeToggle
            tl={themeTl}
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

        <Categories
          locale={locale}
          tl={linksTl.catalog}
          sortedCategories={categories}
        />
        <SearchBar locale={locale} tl={linksTl.searchBar} />
        <ActionButtons
          tl={linksTl}
          locale={locale}
          session={session}
          userPreferences={userPreferences}
        />
      </ul>
    </header>
  )
}
