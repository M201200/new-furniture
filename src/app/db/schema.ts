import type { AdapterAccount } from "@auth/core/adapters"
import { relations } from "drizzle-orm"
import {
  mysqlTable,
  varchar,
  int,
  timestamp,
  primaryKey,
  serial,
  tinyint,
  bigint,
  uniqueIndex,
  text,
  boolean,
  customType,
  smallint,
} from "drizzle-orm/mysql-core"

// Categories

export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  // Starts from 1. Each subcategory also starts from 1. 0 is delimiter (example 10302)
  code: bigint("code", { mode: "number", unsigned: true }).notNull().unique(),
  //
  en: varchar("en", { length: 64 }).notNull(),
  ro: varchar("ro", { length: 64 }).notNull(),
  ru: varchar("ru", { length: 64 }).notNull(),
  layer: tinyint("layer", { unsigned: true }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").onUpdateNow(),
})

export type Category = typeof categories.$inferInsert

//////////
// Items

export const generatedConcatColumns = customType<{
  data: string
  driverData: string
  config: {
    columns: string[]
    charLength: number
    delimiter: string
  }
}>({
  dataType(config) {
    return `varchar(${config?.charLength}) AS (concat_ws("${
      config?.delimiter
    }", ${config?.columns.join(", ")}))`
  },
})

export const items = mysqlTable(
  "items",
  {
    id: serial("id").primaryKey(),
    category_code: bigint("category_code", {
      mode: "number",
      unsigned: true,
    }).notNull(),
    // Starts from 1 in each category.
    serial_number: bigint("serial_number", {
      mode: "number",
      unsigned: true,
    }).notNull(),
    //
    // This is variation of base item. Reference to item characteristics table.
    // Default configuration for furniture is marked as "c0m0w0h0d0", where: c - color, m - material, w - width, h - height, d - depth
    // Example: "c1m0w2h0d1" - this exact order must be preserved!
    variation: varchar("variation", { length: 32 }).notNull(),
    //
    vendor_code: generatedConcatColumns("vendor_code", {
      charLength: 64,
      columns: ["category_code", "serial_number", "variation"],
      delimiter: "-",
    }),
    amount: int("amount", { unsigned: true }).notNull(),
    price: int("price($)", { unsigned: true }).notNull(),
    discount: tinyint("discount(%)", { unsigned: true }).notNull().default(0),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").onUpdateNow(),
  },
  (table) => {
    return {
      vendor_code_compound_idx: uniqueIndex("vendor_code_compound_idx").on(
        table.category_code,
        table.serial_number,
        table.variation
      ),
      vendor_code_idx: uniqueIndex("vendor_code_idx").on(table.vendor_code),
    }
  }
)

export type Items = typeof items.$inferInsert

export const categoriesItemsRelations = relations(categories, ({ many }) => ({
  items: many(items),
}))

export const itemsCategoriesRelations = relations(items, ({ one }) => ({
  categories: one(categories, {
    fields: [items.category_code],
    references: [categories.code],
  }),
}))

//////////

export const itemsName = mysqlTable("items_name", {
  id: serial("id").primaryKey(),
  vendor_code: varchar("vendor_code", { length: 64 }).notNull().unique(),
  en: varchar("en", { length: 128 }).notNull(),
  ro: varchar("ro", { length: 128 }).notNull(),
  ru: varchar("ru", { length: 128 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").onUpdateNow(),
})

export type ItemsName = typeof itemsName.$inferInsert

export const itemsNameRelations = relations(itemsName, ({ one }) => ({
  items: one(items, {
    fields: [itemsName.vendor_code],
    references: [items.vendor_code],
  }),
}))

//////////

export const itemsDescription = mysqlTable("items_description", {
  id: serial("id").primaryKey(),
  vendor_code: varchar("vendor_code", { length: 64 }).notNull().unique(),
  en: text("en").notNull(),
  ro: text("ro").notNull(),
  ru: text("ru").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").onUpdateNow(),
})

export type ItemsDescription = typeof itemsDescription.$inferInsert

export const itemsDescriptionRelations = relations(
  itemsDescription,
  ({ one }) => ({
    items: one(items, {
      fields: [itemsDescription.vendor_code],
      references: [items.vendor_code],
    }),
  })
)

//////////

export const generatedImageURL = customType<{
  data: string
  driverData: string
  config: {
    root_catalog: string
    category: string
    serialNumber: string
    variation: string
    imageNumber: string
    imageType: string
    charLength: number
  }
}>({
  dataType(config) {
    return `varchar(${config?.charLength}) AS (concat("/", ${config?.root_catalog}, "/", ${config?.category}, "/", ${config?.serialNumber}, "/", ${config?.variation}, "/", ${config?.imageNumber}, ".", ${config?.imageType}))`
  },
})

export const itemsImageURL = mysqlTable(
  "item_image_URLs",
  {
    id: serial("id").primaryKey(),
    root_catalog: varchar("root_catalog", { length: 64 })
      .default("images")
      .notNull(),
    category_code: bigint("category_code", {
      mode: "number",
      unsigned: true,
    }).notNull(),
    item_serial_number: bigint("item_serial_number", {
      mode: "number",
      unsigned: true,
    }).notNull(),
    item_variation: varchar("item_variation", { length: 32 })
      .notNull()
      .default("base"),
    vendor_code: generatedConcatColumns("vendor_code", {
      charLength: 64,
      columns: ["category_code", "item_serial_number", "item_variation"],
      delimiter: "-",
    }),
    image_number: tinyint("image_number").notNull(),
    image_type: varchar("image_type", { length: 8 }).default("webp").notNull(),
    url: generatedImageURL("url", {
      charLength: 256,
      root_catalog: "root_catalog",
      category: "category_code",
      serialNumber: "item_serial_number",
      variation: "item_variation",
      imageNumber: "image_number",
      imageType: "image_type",
    }),
    is_thumbnail: boolean("is_thumbnail"),
    notes: varchar("notes", { length: 128 }),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").onUpdateNow(),
  },
  (table) => {
    return {
      compound_idx: uniqueIndex("compound_idx").on(
        table.url,
        table.is_thumbnail
      ),
      thumbnail_idx: uniqueIndex("thumbnail_idx").on(
        table.vendor_code,
        table.is_thumbnail
      ),
    }
  }
)

export type ItemsImageURL = typeof itemsImageURL.$inferInsert

export const itemsToURLRelations = relations(items, ({ many }) => ({
  itemImageURLs: many(itemsImageURL),
}))

export const itemsImageURLsRelations = relations(itemsImageURL, ({ one }) => ({
  items: one(items, {
    fields: [itemsImageURL.vendor_code],
    references: [items.vendor_code],
  }),
}))

//////////

export const characteristicsFurniture = mysqlTable(
  "characteristics_furniture",
  {
    id: serial("id").primaryKey(),
    vendor_code: varchar("vendor_code", { length: 64 }).notNull().unique(),
    color: varchar("color_1", { length: 32 }).notNull(),
    material: varchar("material_2", { length: 32 }).notNull(),
    width: smallint("width_3(sm)", { unsigned: true }).notNull(),
    height: smallint("height_4(sm)", { unsigned: true }).notNull(),
    depth: smallint("depth_5(sm)", { unsigned: true }).notNull(),
    weight: smallint("weight(kg)", { unsigned: true }).notNull(),
    folding: boolean("folding").notNull(),
    warranty: tinyint("warranty(month)", { unsigned: true }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").onUpdateNow(),
  }
)

export type CharacteristicsFurniture =
  typeof characteristicsFurniture.$inferInsert

export const itemsCharacteristicsFurnitureRelations = relations(
  characteristicsFurniture,
  ({ one }) => ({
    items: one(items, {
      fields: [characteristicsFurniture.vendor_code],
      references: [items.vendor_code],
    }),
  })
)

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

//////////

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

//////////

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

//////////

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
