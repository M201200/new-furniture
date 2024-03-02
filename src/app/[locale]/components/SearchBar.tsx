"use client"
import { useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import processString from "@/utils/functions/processString"

// import { dictionarySearchBar } from "../../../../../messages/dictionary/clientSide"

// import { BsSearch } from "react-icons/bs"

export default function SearchBar({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("")
  // const t = dictionarySearchBar(locale)
  const router = useRouter()
  return (
    <div className="flex fluid-base drop-shadow">
      <input
        className="content-center px-2 text-textPrimary bg-background w-36 lg:w-auto 2xl:w-64 fluid-base"
        type="text"
        placeholder={"placeholder"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/${locale}/search/?query=${processString(query)}`)
          }
        }}
      />
      <Link
        href={`/${locale}/search/?query=${processString(query)}`}
        title={"Search"}
        className="flex content-center p-2 transition-colors duration-100 bg-primary hover:bg-hoverPrimary fluid-base rounded-r-md text-textSecondary"
      >
        {/* <BsSearch /> */} Search
      </Link>
    </div>
  )
}
