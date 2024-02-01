import type { AdapterAccount } from "@auth/core/adapters"
import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  primaryKey,
  serial,
} from "drizzle-orm/mysql-core"
import { categoriesArr } from "./categories/topLevel"
import {
  booksArr,
  clothesArr,
  electronicsArr,
  shoesArr,
  stationeryArr,
} from "./categories/secondLevel"

function createCategoryTable(tableName: string) {
  const formattedName = tableName
    .replaceAll(/\s/g, "_")
    .replaceAll(/\W/g, "")
    .toLowerCase()
  return mysqlTable(formattedName, {
    id: serial("id").primaryKey(),
    en: varchar("en", { length: 64 }).unique(),
    ro: varchar("ro", { length: 64 }),
    ru: varchar("ru", { length: 64 }),
  })
}

export const categories = createCategoryTable("Categories")
export type Category = typeof categories.$inferInsert

export const electronics = createCategoryTable(categoriesArr[0].en!)
export const clothes = createCategoryTable(categoriesArr[1].en!)
export const shoes = createCategoryTable(categoriesArr[2].en!)
export const stationery = createCategoryTable(categoriesArr[3].en!)
export const books = createCategoryTable(categoriesArr[4].en!)

// electronics

export const phones = createCategoryTable(electronicsArr[0].en!)
export const computers = createCategoryTable(electronicsArr[1].en!)
export const gamingConsoles = createCategoryTable(electronicsArr[2].en!)
export const videoEquipment = createCategoryTable(electronicsArr[3].en!)
export const headphones = createCategoryTable(electronicsArr[4].en!)
export const accessories = createCategoryTable(electronicsArr[5].en!)

//////////
// clothes

export const clothesForMen = createCategoryTable(`clothes_${clothesArr[0].en!}`)
export const clothesForWomen = createCategoryTable(
  `clothes_${clothesArr[1].en!}`
)
export const clothesForChildren = createCategoryTable(
  `clothes_${clothesArr[2].en!}`
)
export const clothesUnisex = createCategoryTable(`clothes_${clothesArr[3].en!}`)

//////////
// shoes

export const shoesForMen = createCategoryTable(`shoes_${shoesArr[0].en!}`)
export const shoesForWomen = createCategoryTable(`shoes_${shoesArr[1].en!}`)
export const shoesForChildren = createCategoryTable(`shoes_${shoesArr[2].en!}`)
export const shoesUnisex = createCategoryTable(`shoes_${shoesArr[3].en!}`)

//////////
// stationery

export const writingSupplies = createCategoryTable(stationeryArr[0].en!)
export const paperProducts = createCategoryTable(stationeryArr[1].en!)
export const paper = createCategoryTable(stationeryArr[2].en!)
export const foldersAndFiles = createCategoryTable(stationeryArr[3].en!)
export const officeSupplies = createCategoryTable(stationeryArr[4].en!)

//////////
// books

export const fiction = createCategoryTable(booksArr[0].en!)
export const comics = createCategoryTable(booksArr[1].en!)
export const manga = createCategoryTable(booksArr[2].en!)
export const educationalLiterature = createCategoryTable(booksArr[3].en!)

//////////
// NextAuth

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
})

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)
