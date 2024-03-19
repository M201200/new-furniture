"use server"

import { db } from "@/app/db"
import { categories } from "@/app/db/schema"

export default async function loadCategories(locale: Locale) {
  const categoriesArr = await db
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

  let sortedCategories: sortedCategory[] = []
  for (let i = 0; i < categoriesArr.length; i++) {
    if (categoriesArr[i].layer > 1) {
      if (
        categoriesArr[i].layer === 3 &&
        sortedCategories.some((element) =>
          categoriesArr[i].code.toString().startsWith(element?.code.toString())
        )
      ) {
        sortedCategories[
          sortedCategories.findIndex((element) =>
            categoriesArr[i].code.toString().startsWith(element.code.toString())
          )
        ].subcategory.push({
          code: categoriesArr[i].code,
          name: categoriesArr[i].name,
          layer: categoriesArr[i].layer,
          subcategory: [],
        })
      } else
        sortedCategories.push({
          code: categoriesArr[i].code,
          name: categoriesArr[i].name,
          layer: categoriesArr[i].layer,
          subcategory: [],
        })
    }
  }

  return sortedCategories
}
