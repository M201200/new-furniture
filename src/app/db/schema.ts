import { relations } from "drizzle-orm"
import {
  bigint,
  boolean,
  char,
  customType,
  double,
  float,
  index,
  int,
  mysqlTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  tinyint,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core"

import type { AdapterAccount } from "@auth/core/adapters"

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
    }", ${config?.columns.join(", ")})) STORED`
  },
})

export const generatedFinalPrice = customType<{
  data: number
  driverData: number
  config: {
    price: string
    discount: string
  }
}>({
  dataType(config) {
    return `DOUBLE(10,2) AS (\`${config?.price}\`*((100 - \`${config?.discount}\`) / 100)) STORED`
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
    price: double("price($)", { precision: 10, scale: 2 }).notNull(),
    discount: tinyint("discount(%)", { unsigned: true }).notNull().default(0),
    final_price: generatedFinalPrice("final_price($)", {
      price: "price($)",
      discount: "discount(%)",
    }),
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
      final_price_idx: index("final_price_idx").on(table.final_price),
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
    notes: varchar("notes", { length: 128 }),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").onUpdateNow(),
  },
  (table) => {
    return {
      compound_idx: uniqueIndex("compound_idx").on(
        table.category_code,
        table.item_serial_number,
        table.item_variation,
        table.image_number
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

export const colors = mysqlTable("colors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 32 }).notNull().unique(),
  en: varchar("en", { length: 64 }).notNull(),
  ro: varchar("ro", { length: 64 }).notNull(),
  ru: varchar("ru", { length: 64 }).notNull(),
  // format as #000000 or #111111,#222222,... Max hex-codes is 6
  hex: varchar("hex", { length: 47 }).notNull(),
  //
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").onUpdateNow(),
})

export type Colors = typeof colors.$inferInsert

//////////

export const materials = mysqlTable("materials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 32 }).notNull().unique(),
  en: varchar("en", { length: 64 }).notNull(),
  ro: varchar("ro", { length: 64 }).notNull(),
  ru: varchar("ru", { length: 64 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").onUpdateNow(),
})

export type Materials = typeof materials.$inferInsert

//////////

export const characteristicsFurniture = mysqlTable(
  "characteristics_furniture",
  {
    id: serial("id").primaryKey(),
    vendor_code: varchar("vendor_code", { length: 64 }).notNull().unique(),
    color: varchar("color_1", { length: 32 }).notNull(),
    material: varchar("material_2", { length: 32 }).notNull(),
    width: float("width_3(sm)").notNull(),
    height: float("height_4(sm)").notNull(),
    depth: float("depth_5(sm)").notNull(),
    weight: float("weight(kg)").notNull(),
    folding: boolean("folding").notNull(),
    warranty: tinyint("warranty(month)", { unsigned: true }).notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").onUpdateNow(),
  },
  (table) => {
    return {
      width_idx: index("width_idx").on(table.width),
      height_idx: index("height_idx").on(table.height),
      depth_idx: index("depth_idx").on(table.depth),
    }
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

export const colorsToCharacteristicsFurnitureRelations = relations(
  colors,
  ({ many }) => ({
    characteristicsFurniture: many(characteristicsFurniture),
  })
)

export const colorsCharacteristicsFurnitureRelations = relations(
  characteristicsFurniture,
  ({ one }) => ({
    items: one(colors, {
      fields: [characteristicsFurniture.color],
      references: [colors.name],
    }),
  })
)

export const materialsToCharacteristicsFurnitureRelations = relations(
  materials,
  ({ many }) => ({
    characteristicsFurniture: many(characteristicsFurniture),
  })
)

export const materialsCharacteristicsFurnitureRelations = relations(
  characteristicsFurniture,
  ({ one }) => ({
    items: one(materials, {
      fields: [characteristicsFurniture.material],
      references: [materials.name],
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

//////////
// Profile

export const user_profile = mysqlTable("user_profile", {
  id: serial("id").primaryKey(),
  user_email: varchar("user_email", { length: 255 }).notNull().unique(),
  language: varchar("language", { length: 10 }),
  theme: varchar("theme", { length: 10 }),
  currency: varchar("currency", { length: 10 }),
})

export const profileUsersRelations = relations(user_profile, ({ one }) => ({
  items: one(users, {
    fields: [user_profile.user_email],
    references: [users.id],
  }),
}))

//////////
// Favorites

export const favorites = mysqlTable("favorites", {
  id: serial("id").primaryKey(),
  user_email: varchar("user_email", { length: 255 }).notNull(),
  item_vendor_code: varchar("item_vendor_code", { length: 64 })
    .notNull()
    .unique(),
})

export const profileFavoritesUsersRelations = relations(
  favorites,
  ({ one }) => ({
    items: one(users, {
      fields: [favorites.user_email],
      references: [users.id],
    }),
  })
)

export const profileFavoritesItemsRelations = relations(
  favorites,
  ({ one }) => ({
    items: one(items, {
      fields: [favorites.item_vendor_code],
      references: [items.vendor_code],
    }),
  })
)

export const profileFavoritesToItemsRelations = relations(
  items,
  ({ many }) => ({
    favorites: many(favorites),
  })
)

//////////
// Cart

export const cart = mysqlTable("cart", {
  id: serial("id").primaryKey(),
  user_email: varchar("user_email", { length: 255 }).notNull(),
  item_vendor_code: varchar("item_vendor_code", { length: 64 })
    .notNull()
    .unique(),
  amount: smallint("amount", { unsigned: true }).notNull(),
})

export const cartUsersRelations = relations(cart, ({ one }) => ({
  items: one(users, {
    fields: [cart.user_email],
    references: [users.id],
  }),
}))

export const cartToUsersRelations = relations(users, ({ many }) => ({
  cart: many(cart),
}))

export const cartItemsRelations = relations(cart, ({ one }) => ({
  items: one(items, {
    fields: [cart.item_vendor_code],
    references: [items.vendor_code],
  }),
}))

//////////
// Currency Exchange Rates

export const exchange_rates_USD = mysqlTable("exchange_rates_USD", {
  id: serial("id").primaryKey(),
  EUR: float("EUR").notNull(),
  MDL: float("MDL").notNull(),
  date: char("date", { length: 10 }).notNull(),
})
