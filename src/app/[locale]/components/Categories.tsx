"use client"
import { useEffect, useRef, useState } from "react"

import Link from "next/link"
import { BsTextLeft } from "react-icons/bs"

type sortedCategory = {
  code: number
  name: string
  layer: number
  subcategory: sortedCategory[]
}

export function Categories(params: {
  locale: string
  sortedCategories: sortedCategory[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref])
  return (
    <div
      ref={ref}
      className={`relative ${
        isOpen ? "max-w-[30rem]" : ""
      } bg-blue-600 text-white rounded`}
    >
      <button
        className="text-center p-2 fluid-base rounded flex gap-2 items-center hover:text-blue-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {<BsTextLeft className="fluid-xl" />} Categories
      </button>
      <section
        className={`flex flex-wrap gap-3 gap-x-6 absolute w-80 lg:w-[30rem] transition-[visibility,opacity] rounded bg-blue-600 z-10 p-4 ${
          isOpen ? "opacity-100 visible" : "invisible overflow-hidden opacity-0"
        }`}
      >
        {params.sortedCategories.map((category) => (
          <section key={category.code} className="flex flex-col gap-3 max-w-32">
            <Link
              className="fluid-lg text-wrap font-semibold hover:text-blue-200 transition-colors"
              onClick={() => setIsOpen(false)}
              href={`/${params.locale}/category/${category.code}`}
            >
              <h2 className="fluid-lg text-wrap">{category.name}</h2>
            </Link>{" "}
            <section className="flex flex-col gap-1 transition-colors">
              {category.subcategory?.map((subcategory) => (
                <Link
                  className="fluid-base text-wrap hover:text-blue-200"
                  onClick={() => setIsOpen(false)}
                  key={subcategory.code}
                  href={`/${params.locale}/category/${subcategory.code}`}
                >
                  {subcategory.name}
                </Link>
              ))}
            </section>
          </section>
        ))}
      </section>
    </div>
  )
}
