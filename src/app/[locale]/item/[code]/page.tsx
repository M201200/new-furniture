import { db } from "@/app/db"
import {
  characteristicsFurniture,
  items,
  itemsDescription,
  itemsImageURL,
  itemsName,
} from "@/app/db/schema"
import { and, asc, desc, eq } from "drizzle-orm"
import Image from "next/image"

export default async function Item({
  params,
}: {
  params: { code: string; locale: string }
}) {
  const itemArr = await db
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
    .where(
      and(
        eq(items.vendor_code, params.code),
        eq(itemsName.vendor_code, params.code)
      )
    )
    .innerJoin(itemsName, eq(itemsName.vendor_code, items.vendor_code))

  const images = await db
    .select({ url: itemsImageURL.url })
    .from(itemsImageURL)
    .where(eq(itemsImageURL.vendor_code, params.code))
    .orderBy(desc(itemsImageURL.is_thumbnail), asc(itemsImageURL.image_number))

  const characteristicsArr = await db
    .select({
      color: characteristicsFurniture.color,
      material: characteristicsFurniture.material,
      width: characteristicsFurniture.width,
      height: characteristicsFurniture.height,
      depth: characteristicsFurniture.depth,
      weight: characteristicsFurniture.weight,
      folding: characteristicsFurniture.folding,
      warranty: characteristicsFurniture.warranty,
    })
    .from(characteristicsFurniture)
    .where(eq(characteristicsFurniture.vendor_code, params.code))

  const descriptionArr = await db
    .select({
      desc:
        params.locale === "en"
          ? itemsDescription.en
          : params.locale === "ro"
          ? itemsDescription.ro
          : params.locale === "ru"
          ? itemsDescription.ru
          : itemsDescription.en,
    })
    .from(itemsDescription)
    .where(eq(itemsDescription.vendor_code, params.code))

  const item = itemArr[0]
  const characteristics = characteristicsArr[0]
  const description = descriptionArr[0]

  return (
    <section>
      <h1>{item.name}</h1>
      <p>Price: {item.price * ((100 - item.discount) / 100)}$</p>
      <div>
        {images.map((image) => (
          <Image
            key={image.url}
            width={300}
            height={300}
            src={image.url!}
            alt="image"
          />
        ))}
      </div>

      <div>
        <ul>
          <li>Color: {characteristics.color}</li>
          <li>
            Sizes: {characteristics.height} x {characteristics.width} x{" "}
            {characteristics.depth}
          </li>
          <li>Weight: {characteristics.weight} kg</li>
          <li>Material: {characteristics.material}</li>
          <li>Folding: {characteristics.folding === true ? "yes" : "no"}</li>
          <li>Warranty: {characteristics.warranty}</li>
        </ul>
        <p>Description: {description.desc}</p>
      </div>
    </section>
  )
}
