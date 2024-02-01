import type { Category } from "../schema"

// 1 level

export const categoriesArr: Category[] = [
  { en: "Electronics", ro: "Electronică", ru: "Электроника" },
  { en: "Clothes", ro: "Haine", ru: "Одежда" },
  { en: "Shoes", ro: "Incălțăminte", ru: "Обувь" },
  { en: "Stationery", ro: "Papetărie", ru: "Канцелярские товары" },
  { en: "Books", ro: "Cărți", ru: "Книги" },
] as const
