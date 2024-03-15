"use client"
import { useState } from "react"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import sanitizeString from "@/utils/functions/sanitizeString"

// import { dictionarySearchBar } from "../../../../../messages/dictionary/clientSide"

export default function SearchBar({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("")
  // const t = dictionarySearchBar(locale)
  const router = useRouter()
  const currentPath = usePathname()
  const searchParams = useSearchParams()
  const href = sanitizeString(query)
    ? `/${locale}/search?query=${sanitizeString(query)}`
    : `${currentPath}?${searchParams}`
  return (
    <div className="flex fluid-base drop-shadow">
      <input
        className="content-center px-2 rounded text-textPrimary bg-background w-36 lg:w-auto 2xl:w-64 fluid-base"
        type="text"
        placeholder={"placeholder"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(href)
          }
        }}
      />
      <Link
        href={href}
        title={"Search"}
        className="flex content-center p-2 transition-colors duration-100 bg-blue-700 hover:bg-hoverPrimary fluid-base rounded-r-md text-textSecondary"
      >
        Search
      </Link>
    </div>
  )
}
