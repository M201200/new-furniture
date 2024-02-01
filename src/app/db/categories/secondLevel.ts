import type { Category } from "../schema"

export const electronicsArr: Category[] = [
  { en: "Phones", ro: "Telefoane", ru: "Телефоны" },
  { en: "Computers", ro: "Calculatoare", ru: "Компьютеры" },
  { en: "Gaming consoles", ro: "Console de jocuri", ru: "Игровые консоли" },
  { en: "Video equipment", ro: "Echipament video", ru: "Видеотехника" },
  { en: "Headphones", ro: "Căști", ru: "Наушники" },
  { en: "Accessories", ro: "Accesorii", ru: "Комплектующие" },
] as const

export const clothesArr: Category[] = [
  { en: "For men", ro: "A bărbaţilor", ru: "Мужская" },
  { en: "For women", ro: "Femei", ru: "Женская" },
  { en: "For children", ro: "Pentru copii", ru: "Детская" },
  { en: "Unisex", ro: "Unisex", ru: "Унисекс" },
] as const

export const shoesArr: Category[] = clothesArr

export const stationeryArr: Category[] = [
  {
    en: "Writing supplies",
    ro: "Articole de papetărie",
    ru: "Письменные принадлежности",
  },
  { en: "Paper products", ro: "Produse de hârtie", ru: "Бумажная продукция" },
  { en: "Paper", ro: "Hârtie", ru: "Бумага" },
  { en: "Folders and files", ro: "Dosare și fișiere", ru: "Папки и файлы" },
  {
    en: "Office supplies",
    ro: "Articole de birou",
    ru: "Офисные принадлежности",
  },
] as const

export const booksArr: Category[] = [
  {
    en: "Fiction",
    ro: "Literatură artistică",
    ru: "Художественная литература",
  },
  { en: "Comics", ro: "Benzi desenate", ru: "Комиксы" },
  { en: "Manga", ro: "Manga", ru: "Манга" },
  {
    en: "Educational literature",
    ro: "Literatură didactică",
    ru: "Учебная литература",
  },
] as const
