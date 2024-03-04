"use client"
import { useTransition } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import updatePreferredLanguage from "@/utils/actions/updatePreferredLanguage"

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

  return (
    <select
      className="cursor-pointer bg-primary"
      defaultValue={locale}
      onChange={(e) => {
        if (user_email) {
          startTransition(() => {
            updatePreferredLanguage(user_email, e.target.value as Locale)
          })
        }
        router.replace(url.replace(/\/en|\/ro|\/ru/, `/${e.target.value}`))
      }}
    >
      <option value={"en"}>Eng</option>
      <option value={"ro"}>Rom</option>
      <option value={"ru"}>Rus</option>
    </select>
  )
}
