import { db } from "@/app/db"
import { items, itemsImageURL, itemsName } from "@/app/db/schema"
import { and, eq, like, or } from "drizzle-orm"
import Image from "next/image"
import Link from "next/link"

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
      thumbnailURL: itemsImageURL.url,
    })
    .from(items)
    .innerJoin(itemsName, eq(itemsName.vendor_code, items.vendor_code))
    .innerJoin(itemsImageURL, eq(itemsImageURL.vendor_code, items.vendor_code))
    .where(
      and(
        or(
          eq(items.category_code, +params.code),
          like(items.category_code, `${params.code}%`)
        ),
        eq(itemsImageURL.is_thumbnail, true)
      )
    )
    .orderBy(items.id)

  return (
    <section>
      {allItems.map((item) => (
        <div key={item.vendorCode}>
          <Link href={`/${params.locale}/item/${item.vendorCode}`}>
            <Image
              src={item.thumbnailURL!}
              width={300}
              height={300}
              alt="thumbnail"
            />
          </Link>
          <Link href={`/${params.locale}/item/${item.vendorCode}`}>
            {item.name}
          </Link>
          <span> |{item.price * ((100 - item.discount) / 100)}$</span>
        </div>
      ))}
    </section>
  )
}
