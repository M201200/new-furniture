import type { Category } from "../../schema"

export const fictionArr: Category[] = [
  { en: "Sci-fi", ro: "SF", ru: "Научная фантастика" },
  { en: "Fantasy", ro: "Fantezie", ru: "Фэнтези" },
  { en: "Adventure", ro: "Aventură", ru: "Приключение" },
  { en: "Detective", ro: "Detectiv", ru: "Детектив" },
  { en: "Thriller", ro: "Thriller", ru: "Триллер" },
] as const

export const comicsArr = fictionArr
export const mangaArr = fictionArr

export const educationalArr: Category[] = [
  { en: "Science", ro: "Ştiinţă", ru: "Наука" },
  { en: "Psychology", ro: "Psihologie", ru: "Психология" },
  { en: "History", ro: "Istorie", ru: "История" },
  { en: "Sociology", ro: "Sociologie", ru: "Социология" },
  { en: "Medicine", ro: "Medicină", ru: "Медицина" },
] as const
