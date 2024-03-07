import { eq } from "drizzle-orm"
import Link from "next/link"

import { db } from "@/app/db"
import { user_profile } from "@/app/db/schema"
import { auth } from "@/app/lib/auth"

import CurrencySwitcher from "./CurrencySwitcher"
import LanguageSwitcher from "./LanguageSwitcher"
import SignIn from "./SignIn"
import ThemeToggle from "./ThemeToggle"

type ProfileParams = {
  locale: Locale
}

export default async function Profile({ locale }: ProfileParams) {
  const session = await auth()
  const userEmail = session?.user?.email

  const userPreferencesResult = session
    ? await db
        .select({
          email: user_profile.user_email,
          theme: user_profile.theme,
          language: user_profile.language,
          currency: user_profile.currency,
        })
        .from(user_profile)
        .where(eq(user_profile.user_email, session.user?.email || ""))
    : null

  const userPreferences = userPreferencesResult
    ? userPreferencesResult[0]
    : null

  if (session && !userPreferences) {
    await db
      .insert(user_profile)
      .values({
        user_email: session.user?.email!,
      })
      .execute()
  }

  const theme = (
    userPreferences?.theme ? userPreferences.theme : null
  ) as Theme | null

  const preferredLocale = (userPreferences?.language || locale) as Locale
  return (
    <section>
      <button>{session ? session.user?.name : "Guest"}</button>
      <ul>
        <li>
          <Link href={`/${locale}/profile`}>Profile</Link>
        </li>
        <li>
          <LanguageSwitcher locale={preferredLocale} user_email={userEmail} />
        </li>
        <li>
          <ThemeToggle currentTheme={theme} user_email={userEmail} />
        </li>
        <li>
          <CurrencySwitcher
            user_email={userEmail}
            currentCurrency={userPreferences?.currency as Currency | null}
          />
        </li>
        <li>
          <SignIn />
        </li>
      </ul>
    </section>
  )
}
