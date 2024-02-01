import type { Category } from "../../schema"

export const shoesForMenArr: Category[] = [
  { en: "Boots", ro: "Cizme", ru: "Ботинки" },
  { en: "Shoes", ro: "Pantofi", ru: "Туфли" },
  { en: "Sandals", ro: "Sandale", ru: "Сандалии" },
] as const

export const shoesForWomenArr: Category[] = shoesForMenArr

export const shoesUnisexArr: Category[] = [
  { en: "Boots", ro: "Cizme", ru: "Ботинки" },
  { en: "Shoes", ro: "Pantofi", ru: "Туфли" },
  { en: "Sneakers", ro: "Sneakers", ru: "Кроссовки" },
  { en: "Sandals", ro: "Sandale", ru: "Сандалии" },
] as const

export const shoesForChildrenArr: Category[] = shoesUnisexArr
