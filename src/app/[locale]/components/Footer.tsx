import Link from "next/link"

import loadCategories from "@/utils/actions/loadCategories"

export default async function Footer({ locale }: { locale: Locale }) {
  const categoriesResults = await loadCategories(locale)
  return (
    <section className="flex justify-evenly flex-wrap gap-4 p-4 text-textPrimary border-t border-borderThin mt-6">
      {categoriesResults.map((category) => (
        <section key={category.code} className="flex flex-col gap-3 max-w-32">
          <Link
            className="fluid-lg text-wrap font-semibold hover:text-textCrossed transition-colors"
            href={`/${locale}/catalog/${category.code}`}
          >
            <h2 className="fluid-lg text-wrap">{category.name}</h2>
          </Link>{" "}
          <section className="flex flex-col gap-1 transition-colors text-textSecondary">
            {category.subcategory?.map((subcategory) => (
              <Link
                className="fluid-base text-wrap hover:text-textCrossed"
                key={subcategory.code}
                href={`/${locale}/catalog/${subcategory.code}`}
              >
                {subcategory.name}
              </Link>
            ))}
          </section>
        </section>
      ))}
    </section>
  )
}
