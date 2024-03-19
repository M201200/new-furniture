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
  tl: string
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
      } rounded lg:col-start-2 lg:col-end-3 col-start-1 col-end-2 row-start-1 row-end-2`}
    >
      <button
        className="text-center p-2 fluid-base bg-brand1 rounded flex gap-2 lg:w-fit justify-center text-gray-100 items-center hover:text-gray-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        title={params.tl}
      >
        <span>
          <BsTextLeft className="fluid-xl" />
        </span>
        <span className="lg:block hidden text-center px-2 w-0 lg:w-fit">
          {params.tl}
        </span>
      </button>
      <section
        className={`flex flex-wrap gap-3 gap-x-6 absolute w-80 lg:w-[30rem] transition-[visibility,opacity] rounded bg-bgPrimary text-textPrimary border border-borderThin z-50 p-4 ${
          isOpen ? "opacity-100 visible" : "invisible overflow-hidden opacity-0"
        }`}
      >
        {params.sortedCategories.map((category) => (
          <section key={category.code} className="flex flex-col gap-3 max-w-32">
            <Link
              className="fluid-lg text-wrap font-semibold hover:text-textCrossed transition-colors"
              onClick={() => setIsOpen(false)}
              href={`/${params.locale}/catalog/${category.code}`}
            >
              <h2 className="fluid-lg text-wrap">{category.name}</h2>
            </Link>{" "}
            <section className="flex flex-col gap-1 transition-colors">
              {category.subcategory?.map((subcategory) => (
                <Link
                  className="fluid-base text-wrap hover:text-textCrossed"
                  onClick={() => setIsOpen(false)}
                  key={subcategory.code}
                  href={`/${params.locale}/catalog/${subcategory.code}`}
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
