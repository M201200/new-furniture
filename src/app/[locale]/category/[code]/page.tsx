import { db } from "@/app/db"
import { items, itemsName } from "@/app/db/schema"
import { itemsImageURLArr } from "@/app/db/values/itemsImageURL"
import { eq, like, or } from "drizzle-orm"

export default async function Items({
  params,
}: {
  params: { code: string; locale: string }
}) {
  const allItems = await db
    .select({
      vendorCode: items.vendor_code,
      name:
        params.locale === "en"
          ? itemsName.en
          : params.locale === "ro"
          ? itemsName.ro
          : params.locale === "ru"
          ? itemsName.ru
          : itemsName.en,
      amount: items.amount,
      price: items.price,
      discount: items.discount,
    })
    .from(items)
    .innerJoin(itemsName, eq(itemsName.vendor_code, items.vendor_code))
    .where(
      or(
        eq(items.category_code, +params.code),
        like(items.category_code, `${params.code}%`)
      )
    )

  return (
    <section>
      {allItems.map((item) => (
        <div key={item.vendorCode}>
          {item.name} | {item.price * ((100 - item.discount) / 100)}$
        </div>
      ))}
    </section>
  )
}
