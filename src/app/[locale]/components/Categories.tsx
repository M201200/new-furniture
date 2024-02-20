import { db } from "@/app/db"
import { categories } from "@/app/db/schema"
import Link from "next/link"

type sortedCategory = {
  code: number
  name: string
  layer: number
  subcategory: sortedCategory[]
}

async function getCategories(locale: string) {
  return await db
    .select({
      code: categories.code,
      name:
        locale === "en"
          ? categories.en
          : locale === "ro"
          ? categories.ro
          : locale === "ru"
          ? categories.ru
          : categories.en,
      layer: categories.layer,
    })
    .from(categories)
}

export async function Categories(params: { locale: string }) {
  const categories = await getCategories(params.locale)
  let sortedCategories: sortedCategory[] = []
  for (let i = 0; i < categories.length; i++) {
    if (categories[i].layer > 1) {
      if (
        categories[i].layer === 3 &&
        sortedCategories.some((element) =>
          categories[i].code.toString().startsWith(element?.code.toString())
        )
      ) {
        sortedCategories[
          sortedCategories.findIndex((element) =>
            categories[i].code.toString().startsWith(element.code.toString())
          )
        ].subcategory.push({
          code: categories[i].code,
          name: categories[i].name,
          layer: categories[i].layer,
          subcategory: [],
        })
      } else
        sortedCategories.push({
          code: categories[i].code,
          name: categories[i].name,
          layer: categories[i].layer,
          subcategory: [],
        })
    }
  }

  return (
    <section className="flex gap-1">
      {sortedCategories.map((category) => (
        <section key={category.code} className="grid gap-1">
          <Link
            href={`/${params.locale}/category/${category.code}`}
            className="text-xl"
          >
            {category.name}
          </Link>{" "}
          {category.subcategory?.map((subcategory) => (
            <Link
              key={subcategory.code}
              href={`/${params.locale}/category/${subcategory.code}`}
            >
              {subcategory.name}
            </Link>
          ))}
        </section>
      ))}
    </section>
  )
}
