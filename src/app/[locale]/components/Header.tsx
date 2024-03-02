import Link from "next/link"

import { Categories } from "./Categories"
import LanguageSwitcher from "./LanguageSwitcher"
import SearchBar from "./SearchBar"
import SignIn from "./SignIn"
import ThemeToggle from "./ThemeToggle"

export function Header(params: { locale: Locale }) {
  return (
    <header className="flex gap-2">
      <Link href={`/${params.locale}/`}>Logo</Link>
      <ul className="flex gap-2">
        <SearchBar locale={params.locale} />
        <Categories locale={params.locale} />
        <LanguageSwitcher locale={params.locale} />
        <ThemeToggle locale={params.locale} />
        <SignIn />
      </ul>
    </header>
  )
}
