import type { Category } from "../../schema"

export const phonesArr: Category[] = [
  { en: "Cell phones", ro: "Telefoane mobile", ru: "Мобильные" },
  { en: "Smartphones", ro: "Smartphone-uri", ru: "Смартфоны" },
  { en: "Accessories", ro: "Accesorii", ru: "Комплектующие" },
] as const

export const computersArr: Category[] = [
  { en: "PCs", ro: "PC-uri", ru: "ПК" },
  { en: "Laptops", ro: "Laptopuri", ru: "Ноутбуки" },
  { en: "All-in-ones", ro: "Monoblocuri", ru: "Моноблоки" },
  { en: "Tablets", ro: "Tablete", ru: "Планшеты" },
] as const

export const consolesArr: Category[] = [
  { en: "XBOX", ro: "XBOX", ru: "XBOX" },
  { en: "PlayStation", ro: "PlayStation", ru: "PlayStation" },
  { en: "Nintendo", ro: "Nintendo", ru: "Nintendo" },
  { en: "Steam Deck", ro: "Steam Deck", ru: "Steam Deck" },
] as const

export const videoArr: Category[] = [
  { en: "TVs", ro: "Televizoare", ru: "Телевизоры" },
  { en: "Monitors", ro: "Monitoare", ru: "Мониторы" },
  { en: "Projectors", ro: "Projectoare", ru: "Проекторы" },
] as const

export const headphonesArr: Category[] = [
  { en: "Wired", ro: "Cu fir", ru: "Проводные" },
  { en: "Wireless", ro: "Fara fir", ru: "Беспроводные" },
] as const

export const accessoriesArr: Category[] = [
  { en: "Phone cases", ro: "Huse pentru telefoane", ru: "Чехлы для телефонов" },
  { en: "Keyboards", ro: "Tastaturi", ru: "Клавиатуры" },
  { en: "Computer mice", ro: "Mous-uri", ru: "Компьютерные мыши" },
  { en: "Controllers", ro: "Manete de joc", ru: "Геймпады" },
] as const
