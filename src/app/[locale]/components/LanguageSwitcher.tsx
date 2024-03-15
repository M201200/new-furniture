"use client"
import { useEffect, useTransition } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import updatePreferredLanguage from "@/utils/actions/ProfileActions/updatePreferredLanguage"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

type LanguageSwitcherParams = {
  locale: Locale
  user_email?: string | null
}

export default function LanguageSwitcher({
  locale,
  user_email,
}: LanguageSwitcherParams) {
  const [isPending, startTransition] = useTransition()

  const currentPath = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = `${currentPath}?${searchParams}`
  const userLocale = usePreferences((state) => state.locale)
  const setLocale = usePreferences((state) => state.setLocale)

  useEffect(() => {
    locale !== userLocale ? setLocale(locale) : null
  }, [locale, setLocale, userLocale])

  return isPending ? (
    <span className="bg-gray-600 text-white fluid-base p-[1px] rounded">
      Pending...
    </span>
  ) : (
    <select
      className="cursor-pointer bg-gray-600 text-white fluid-base p-[1px] rounded"
      defaultValue={locale}
      onChange={(e) => {
        if (user_email) {
          startTransition(() => {
            updatePreferredLanguage(user_email, e.target.value as Locale)
          })
          router.refresh()
        }
        setLocale(e.target.value as Locale)
        router.replace(url.replace(/\/en|\/ro|\/ru/, `/${e.target.value}`))
      }}
    >
      <option value={"en"}>Eng</option>
      <option value={"ro"}>Rom</option>
      <option value={"ru"}>Rus</option>
    </select>
  )
}
