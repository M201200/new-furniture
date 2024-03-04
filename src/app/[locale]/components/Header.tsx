import Link from "next/link"

import { Categories } from "./Categories"
import Profile from "./Profile"
import SearchBar from "./SearchBar"

type HeaderParams = {
  locale: Locale
}

export function Header({ locale }: HeaderParams) {
  return (
    <header className="flex gap-2">
      <Link href={`/${locale}/`}>Logo</Link>
      <ul className="flex gap-2">
        <SearchBar locale={locale} />
        <Categories locale={locale} />
        <Profile locale={locale} />
      </ul>
    </header>
  )
}
