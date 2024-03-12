"use server"
import { and, eq, inArray, isNull, or } from "drizzle-orm"

import { db } from "@/app/db"
import { items, itemsImageURL, itemsName } from "@/app/db/schema"

export default async function getAllItems(
  vendor_codes: string[] | null | undefined,
  locale: Locale
) {
  if (!vendor_codes?.length) return
  return await db
    .select({
      vendor_code: items.vendor_code,
      name:
        locale === "en"
          ? itemsName.en
          : locale === "ro"
          ? itemsName.ro
          : locale === "ru"
          ? itemsName.ru
          : itemsName.en,
      amount: items.amount,
      price: items.price,
      discount: items.discount,
      final_price: items.final_price,
      thumbnailURL: itemsImageURL.url,
    })
    .from(items)
    .where(
      and(
        inArray(items.vendor_code, vendor_codes),
        or(eq(itemsImageURL.image_number, 1), isNull(itemsImageURL.vendor_code))
      )
    )
    .innerJoin(itemsName, eq(items.vendor_code, itemsName.vendor_code))
    .leftJoin(itemsImageURL, eq(items.vendor_code, itemsImageURL.vendor_code))
    .orderBy(items.id)
    .execute()
}
