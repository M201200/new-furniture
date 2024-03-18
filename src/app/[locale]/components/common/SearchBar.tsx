"use client"
import { useState } from "react"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BsSearch } from "react-icons/bs"

import sanitizeString from "@/utils/functions/sanitizeString"

export default function SearchBar({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const currentPath = usePathname()
  const searchParams = useSearchParams()
  const href = sanitizeString(query)
    ? `/${locale}/search?query=${sanitizeString(query)}`
    : `${currentPath}?${searchParams}`
  return (
    <div className="flex fluid-base drop-shadow lg:col-start-3 lg:col-end-4 col-start-1 col-end-4 row-start-2 row-end-3 lg:row-start-1 lg:row-end-2">
      <input
        className="content-center p-2 rounded w-full text-textPrimary bg-bgPrimary border border-borderThin fluid-base"
        type="text"
        placeholder={"Search..."}
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
        className="flex content-center p-2 transition-colors duration-100 bg-brand1 fluid-base rounded-r-md text-gray-200"
      >
        <BsSearch className="fluid-lg" />
      </Link>
    </div>
  )
}
