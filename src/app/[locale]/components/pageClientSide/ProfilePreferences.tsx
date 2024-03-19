"use client"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

export default function ProfilePreferences({
  tl,
}: {
  tl: {
    Language: string
    Theme: string
    Currency: string
    USD: string
    EUR: string
    MDL: string
    en: string
    ro: string
    ru: string
    light: string
    dark: string
  }
}) {
  const preferences = usePreferences()

  return (
    <>
      <li className="flex gap-1">
        <span className="text-textSecondary">{tl.Language}:</span>{" "}
        <span className="font-semibold">
          {preferences.locale === "en"
            ? tl.en
            : preferences.locale === "ro"
            ? tl.ro
            : tl.ru}
        </span>{" "}
      </li>
      <li className="flex gap-1">
        <span className="text-textSecondary">{tl.Currency}:</span>
        <span className="font-semibold">
          {preferences.currency === "EUR"
            ? tl.EUR
            : preferences.currency === "MDL"
            ? tl.MDL
            : tl.USD}
        </span>{" "}
      </li>
      <li className="flex gap-1">
        <span className="text-textSecondary">{tl.Theme}:</span>{" "}
        <span className="font-semibold">
          {preferences.theme === "dark" ? tl.dark : tl.light}
        </span>
      </li>
    </>
  )
}
