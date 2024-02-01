import type { Category } from "../../schema"

export const writingSuppliesArr: Category[] = [
  { en: "Pens", ro: "Pixuri", ru: "Ручки" },
  { en: "Pencils", ro: "Creioane", ru: "Карандаши" },
  { en: "Felt-tip pens", ro: "Creioane colorate", ru: "Фломастеры" },
  { en: "Markers", ro: "Markere", ru: "Маркеры" },
] as const

export const paperProductsArr: Category[] = [
  { en: "Notebooks", ro: "Caiete", ru: "Тетради" },
  { en: "Notepads", ro: "Blocnotes", ru: "Блокноты" },
  { en: "Planners", ro: "Planificatoare", ru: "Ежедневники" },
] as const

export const paperArr: Category[] = [
  { en: "Printer paper", ro: "Hârtie de imprimantă", ru: "Бумага для печати" },
  { en: "Colored paper", ro: "Hârtie colorată", ru: "Цветная бумага" },
  { en: "Drawing paper", ro: "Hârtie de desen", ru: "Бумага для черчения" },
] as const

export const foldersAndFilesArr: Category[] = [
  { en: "Folders", ro: "Dosare", ru: "Папки" },
  { en: "Files", ro: "Fișiere", ru: "Файлы" },
] as const

export const officeSuppliesArr: Category[] = [
  { en: "Staplers", ro: "Capsator", ru: "Степлеры" },
  { en: "Paper punches", ro: "Perforatoare", ru: "Дыроколы" },
  { en: "Erasers", ro: "Gumă de șters", ru: "Ластики" },
  { en: "Correction fluid", ro: "Corectoare", ru: "Корректоры" },
] as const
