"use client"
import { useEffect, useTransition } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import updatePreferredLanguage from "@/utils/actions/ProfileActions/updatePreferredLanguage"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

type LanguageSwitcherParams = {
  locale: Locale
  user_email?: string | null
  tl: {
    changeLanguage: string
    en: string
    ro: string
    ru: string
  }
}

export default function LanguageSwitcher({
  locale,
  user_email,
  tl,
}: LanguageSwitcherParams) {
  const [isPending, startTransition] = useTransition()

  const currentPath = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = `${currentPath}?${searchParams}`
  const userLocale = usePreferences((state) => state.locale)
  const setLocale = usePreferences((state) => state.setLocale)
  useEffect(() => {
    setLocale(locale)
    router.replace(url.replace(/\/en|\/ro|\/ru/, `/${locale}`))
  }, [locale, setLocale, router, url])
  return (
    <select
      className="cursor-pointer bg-gray-500 text-gray-50 fluid-base p-[1px] rounded"
      value={userLocale}
      disabled={isPending}
      title={tl.changeLanguage}
      onChange={(e) => {
        startTransition(() => {
          user_email
            ? updatePreferredLanguage(user_email, e.target.value as Locale)
            : null
        })
        setLocale(e.target.value as Locale)
        router.replace(url.replace(/\/en|\/ro|\/ru/, `/${e.target.value}`))
      }}
    >
      <option value={"en"}>{tl.en}</option>
      <option value={"ro"}>{tl.ro}</option>
      <option value={"ru"}>{tl.ru}</option>
    </select>
  )
}
