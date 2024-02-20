import { Categories } from "./Categories"

export function Header(params: { locale: string }) {
  return (
    <header className="flex gap-2">
      <span>Logo</span>
      <ul className="flex gap-2">
        <li>Search</li>
        <Categories locale={params.locale} />
        <li>Lang</li>
        <li>Theme</li>
      </ul>
    </header>
  )
}
