import { relations, sql } from "drizzle-orm"
import {
  bigint,
  boolean,
  char,
  customType,
  doublePrecision,
  real,
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core"

import type { AdapterAccount } from "@auth/core/adapters"

const currentDate = new Date()

// Categories

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  // Starts from 1. Each subcategory also starts from 1. 0 is delimiter (example 10302)
  code: bigint("code", { mode: "number" }).notNull().unique(),
  //
  en: varchar("en", { length: 64 }).notNull(),
  ro: varchar("ro", { length: 64 }).notNull(),
  ru: varchar("ru", { length: 64 }).notNull(),
  layer: smallint("layer").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: varchar("updated_at", { length: 30 }).$onUpdate(() =>
    currentDate.toISOString().replace("T", " ").replace("Z", "")
  ),
})

export type Category = typeof categories.$inferInsert

//////////
// Items

// export const generatedConcatColumns = customType<{
//   data: string
//   driverData: string
//   config: {
//     columns: string[]
//     charLength: number
//     delimiter: string
//   }
// }>({
//   dataType(config) {
//     return `varchar(${config?.charLength}) GENERATED ALWAYS AS (concat_ws("${
//       config?.delimiter
//     }", ${config?.columns.join(", ")}))`
//   },
// })

export const generatedVendorCode = customType<{
  data: string
  driverData: string
  config: {
    category_code: string
    serial_number: string
    variation: string
  }
}>({
  dataType(config) {
    return `varchar(64) GENERATED ALWAYS AS ((cast(${config?.category_code} as varchar) || '-' || cast(${config?.serial_number} as varchar) || '-' || ${config?.variation})) STORED`
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
    return `double precision GENERATED ALWAYS AS ((\"${config?.price}\"*((100 - \"${config?.discount}\") / 100))) STORED`
  },
})

export const items = pgTable(
  "items",
  {
    id: serial("id").primaryKey(),
    category_code: bigint("category_code", {
      mode: "number",
    }).notNull(),
    // Starts from 1 in each category.
    serial_number: bigint("serial_number", {
      mode: "number",
    }).notNull(),
    //
    // This is variation of base item. Reference to item characteristics table.
    // Default configuration for furniture is marked as "c0m0w0h0d0", where: c - color, m - material, w - width, h - height, d - depth
    // Example: "c1m0w2h0d1" - this exact order must be preserved!
    variation: varchar("variation", { length: 32 }).notNull(),
    //
    vendor_code: generatedVendorCode("vendor_code", {
      category_code: "category_code",
      serial_number: "serial_number",
      variation: "variation",
    }),
    amount: integer("amount").notNull(),
    price: doublePrecision("price($)").notNull(),
    discount: doublePrecision("discount(%)").notNull().default(0),
    final_price: generatedFinalPrice("final_price($)", {
      price: "price($)",
      discount: "discount(%)",
    }),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: varchar("updated_at", { length: 30 }).$onUpdate(() =>
      currentDate.toISOString().replace("T", " ").replace("Z", "")
    ),
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

export const itemsName = pgTable("items_name", {
  id: serial("id").primaryKey(),
  vendor_code: varchar("vendor_code", { length: 64 }).notNull().unique(),
  en: varchar("en", { length: 128 }).notNull(),
  ro: varchar("ro", { length: 128 }).notNull(),
  ru: varchar("ru", { length: 128 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: varchar("updated_at", { length: 30 }).$onUpdate(() =>
    currentDate.toISOString().replace("T", " ").replace("Z", "")
  ),
})

export type ItemsName = typeof itemsName.$inferInsert

export const itemsNameRelations = relations(itemsName, ({ one }) => ({
  items: one(items, {
    fields: [itemsName.vendor_code],
    references: [items.vendor_code],
  }),
}))

//////////

export const itemsDescription = pgTable("items_description", {
  id: serial("id").primaryKey(),
  vendor_code: varchar("vendor_code", { length: 64 }).notNull().unique(),
  en: text("en").notNull(),
  ro: text("ro").notNull(),
  ru: text("ru").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: varchar("updated_at", { length: 30 }).$onUpdate(() =>
    currentDate.toISOString().replace("T", " ").replace("Z", "")
  ),
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
    return `varchar(${config?.charLength}) GENERATED ALWAYS AS (('/' || ${config?.root_catalog} || "/" || cast(${config?.category} as varchar) || "/" || cast(${config?.serialNumber} as varchar) || "/" || ${config?.variation} || "/" || cast(${config?.imageNumber} as varchar) || "." || ${config?.imageType})) STORED`
  },
})

export const itemsImageURL = pgTable(
  "item_image_URLs",
  {
    id: serial("id").primaryKey(),
    root_catalog: varchar("root_catalog", { length: 64 })
      .default("images")
      .notNull(),
    category_code: bigint("category_code", {
      mode: "number",
    }).notNull(),
    item_serial_number: bigint("item_serial_number", {
      mode: "number",
    }).notNull(),
    item_variation: varchar("item_variation", { length: 32 })
      .notNull()
      .default("base"),
    vendor_code: generatedVendorCode("vendor_code", {
      category_code: "category_code",
      serial_number: "serial_number",
      variation: "variation",
    }),
    image_number: smallint("image_number").notNull(),
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
    updated_at: varchar("updated_at", { length: 30 }).$onUpdate(() =>
      currentDate.toISOString().replace("T", " ").replace("Z", "")
    ),
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

export const colors = pgTable("colors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 32 }).notNull().unique(),
  en: varchar("en", { length: 64 }).notNull(),
  ro: varchar("ro", { length: 64 }).notNull(),
  ru: varchar("ru", { length: 64 }).notNull(),
  // format as #000000 or #111111,#222222,... Max hex-codes is 6
  hex: varchar("hex", { length: 47 }).notNull(),
  //
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: varchar("updated_at", { length: 30 }).$onUpdate(() =>
    currentDate.toISOString().replace("T", " ").replace("Z", "")
  ),
})

export type Colors = typeof colors.$inferInsert

//////////

export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 32 }).notNull().unique(),
  en: varchar("en", { length: 64 }).notNull(),
  ro: varchar("ro", { length: 64 }).notNull(),
  ru: varchar("ru", { length: 64 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: varchar("updated_at", { length: 30 }).$onUpdate(() =>
    currentDate.toISOString().replace("T", " ").replace("Z", "")
  ),
})

export type Materials = typeof materials.$inferInsert

//////////

export const characteristicsFurniture = pgTable(
  "characteristics_furniture",
  {
    id: serial("id").primaryKey(),
    vendor_code: varchar("vendor_code", { length: 64 }).notNull().unique(),
    color: varchar("color_1", { length: 32 }).notNull(),
    material: varchar("material_2", { length: 32 }).notNull(),
    width: real("width_3(sm)").notNull(),
    height: real("height_4(sm)").notNull(),
    depth: real("depth_5(sm)").notNull(),
    weight: real("weight(kg)").notNull(),
    folding: boolean("folding").notNull(),
    warranty: smallint("warranty(month)").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: varchar("updated_at", { length: 30 }).$onUpdate(() =>
      currentDate.toISOString().replace("T", " ").replace("Z", "")
    ),
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
/// NextAuth

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
)

//////////
// Profile

export const user_profile = pgTable("user_profile", {
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

export const favorites = pgTable("favorites", {
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

export const cart = pgTable("cart", {
  id: serial("id").primaryKey(),
  user_email: varchar("user_email", { length: 255 }).notNull(),
  item_vendor_code: varchar("item_vendor_code", { length: 64 })
    .notNull()
    .unique(),
  amount: smallint("amount").notNull(),
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
// Orders

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    user_email: varchar("user_email", { length: 255 }).notNull(),
    item_vendor_code: varchar("item_vendor_code", { length: 64 }).notNull(),
    amount: smallint("amount").notNull(),
    purchase_time: timestamp("purchase_time", { mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    user_email: index("user_email").on(table.user_email),
  })
)

export const ordersUsersRelations = relations(orders, ({ one }) => ({
  items: one(users, {
    fields: [orders.user_email],
    references: [users.id],
  }),
}))

export const ordersToUsersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}))

export const ordersItemsRelations = relations(orders, ({ one }) => ({
  items: one(items, {
    fields: [orders.item_vendor_code],
    references: [items.vendor_code],
  }),
}))

export const ordersToItemsRelations = relations(items, ({ many }) => ({
  orders: many(orders),
}))

//////////
// Currency Exchange Rates

export const exchange_rates_USD = pgTable("exchange_rates_USD", {
  id: serial("id").primaryKey(),
  EUR: real("EUR").notNull(),
  MDL: real("MDL").notNull(),
  date: char("date", { length: 10 }).notNull(),
})
