"use client"
// import { dictionaryLanguageSwitcher } from "../../../../../messages/dictionary/clientSide"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  // const t = dictionaryLanguageSwitcher(locale)
  const currentPath = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const url = `${currentPath}?${searchParams}`
  return (
    <select
      className="cursor-pointer bg-primary"
      defaultValue={locale}
      onChange={(e) => {
        router.replace(url.replace(/\/en|\/ro|\/ru/, `/${e.target.value}`))
      }}
    >
      <option value={"en"}>Eng</option>
      <option value={"ro"}>Rom</option>
      <option value={"ru"}>Rus</option>
    </select>
  )
}
