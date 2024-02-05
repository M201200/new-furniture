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
  index,
  boolean,
} from "drizzle-orm/mysql-core"

// Categories

export const categories = mysqlTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    path: bigint("path", { mode: "number", unsigned: true }).unique().notNull(), // 0 is delimiter
    en: varchar("en", { length: 64 }).notNull(),
    ro: varchar("ro", { length: 64 }).notNull(),
    ru: varchar("ru", { length: 64 }).notNull(),
    layer: tinyint("layer", { unsigned: true }).notNull(),
  },
  (table) => {
    return {
      path_idx: uniqueIndex("path_idx").on(table.path),
    }
  }
)

export type Category = typeof categories.$inferInsert

//////////
// Items

export const items = mysqlTable("items", {
  id: serial("id").primaryKey(),
  categoryPath: bigint("category_path", {
    mode: "number",
    unsigned: true,
  }).notNull(),
  amount: int("amount", { unsigned: true }).notNull(),
  price: int("price($)", { unsigned: true }).notNull(),
  discount: int("discount(%)", { unsigned: true }),
})

export const categoryRelations = relations(categories, ({ many }) => ({
  items: many(items),
}))

export const itemsRelations = relations(items, ({ one }) => ({
  category: one(categories, {
    fields: [items.categoryPath],
    references: [categories.path],
  }),
}))

//////////

export const itemsName = mysqlTable(
  "itemsName",
  {
    id: serial("items_id").primaryKey(),
    itemId: bigint("itemId", {
      mode: "number",
      unsigned: true,
    })
      .notNull()
      .unique(),
    en: varchar("en", { length: 128 }).notNull(),
    ro: varchar("ro", { length: 128 }).notNull(),
    ru: varchar("ru", { length: 128 }).notNull(),
  },
  (table) => {
    return {
      itemId_idx: uniqueIndex("itemId_idx").on(table.itemId),
    }
  }
)

export const itemsNameRelations = relations(itemsName, ({ one }) => ({
  items: one(items, {
    fields: [itemsName.itemId],
    references: [items.id],
  }),
}))

//////////

export const itemsDescription = mysqlTable(
  "itemsDescription",
  {
    id: serial("items_id").primaryKey(),
    itemId: bigint("itemId", {
      mode: "number",
      unsigned: true,
    })
      .notNull()
      .unique(),
    en: text("en").notNull(),
    ro: text("ro").notNull(),
    ru: text("ru").notNull(),
  },
  (table) => {
    return {
      itemId_idx: uniqueIndex("itemId_idx").on(table.itemId),
    }
  }
)

export const itemsDescriptionRelations = relations(
  itemsDescription,
  ({ one }) => ({
    items: one(items, {
      fields: [itemsDescription.itemId],
      references: [items.id],
    }),
  })
)

//////////

export const itemsImageURLs = mysqlTable(
  "itemsImageURLs",
  {
    id: serial("items_id").primaryKey(),
    itemId: bigint("itemId", {
      mode: "number",
      unsigned: true,
    }).notNull(),
    url: varchar("url", { length: 2083 }).notNull(),
    isThumbnail: boolean("is_thumbnail").default(true).notNull(),
    notes: varchar("notes", { length: 128 }),
  },
  (table) => {
    return {
      itemId_idx: index("itemId_idx").on(table.itemId),
    }
  }
)

export const itemsImageURLsRelations = relations(itemsImageURLs, ({ one }) => ({
  items: one(items, {
    fields: [itemsImageURLs.itemId],
    references: [items.id],
  }),
}))

//////////
// Characteristics

export const characteristics = mysqlTable(
  "characteristics",
  {
    id: serial("id").primaryKey(),
    categoryPath: bigint("category_path", {
      mode: "number",
      unsigned: true,
    }).notNull(),
    en: varchar("en", { length: 64 }).notNull(),
    ro: varchar("ro", { length: 64 }).notNull(),
    ru: varchar("ru", { length: 64 }).notNull(),
  },
  (table) => {
    return {
      categoryPath_idx: index("categoryPath_idx").on(table.categoryPath),
    }
  }
)

export const characteristicsRelations = relations(
  characteristics,
  ({ one }) => ({
    category: one(categories, {
      fields: [characteristics.categoryPath],
      references: [categories.path],
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
