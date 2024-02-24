import { db } from "@/app/db"
import {
  characteristicsFurniture,
  items,
  itemsDescription,
  itemsImageURL,
  itemsName,
} from "@/app/db/schema"
import { and, asc, desc, eq, like, not, or } from "drizzle-orm"
import Image from "next/image"
import Link from "next/link"

export default async function Item({
  params,
}: {
  params: { code: string; locale: string }
}) {
  const itemCodeBase = params.code.replace(
    /c\d+m\d+w\d+h\d+d\d+/gi,
    "c0m0w0h0d0"
  )

  const itemArrQuery = db
    .select({
      vendorCode: items.vendor_code,
      amount: items.amount,
      price: items.price,
      discount: items.discount,
      color: characteristicsFurniture.color,
      material: characteristicsFurniture.material,
      width: characteristicsFurniture.width,
      height: characteristicsFurniture.height,
      depth: characteristicsFurniture.depth,
      weight: characteristicsFurniture.weight,
      folding: characteristicsFurniture.folding,
      warranty: characteristicsFurniture.warranty,
    })
    .from(items)
    .where(eq(items.vendor_code, params.code))
    .innerJoin(
      characteristicsFurniture,
      eq(characteristicsFurniture.vendor_code, items.vendor_code)
    )
    .orderBy(asc(items.vendor_code))

  const itemNameDescriptionArrQuery = db
    .select({
      name:
        params.locale === "en"
          ? itemsName.en
          : params.locale === "ro"
          ? itemsName.ro
          : params.locale === "ru"
          ? itemsName.ru
          : itemsName.en,
      desc:
        params.locale === "en"
          ? itemsDescription.en
          : params.locale === "ro"
          ? itemsDescription.ro
          : params.locale === "ru"
          ? itemsDescription.ru
          : itemsDescription.en,
    })
    .from(itemsName)
    .where(
      or(
        eq(itemsName.vendor_code, params.code),
        eq(itemsName.vendor_code, itemCodeBase)
      )
    )
    .innerJoin(
      itemsDescription,
      eq(itemsDescription.vendor_code, itemsName.vendor_code)
    )
    .orderBy(desc(itemsName.vendor_code))

  const imageCodeBase = params.code.replace(/m\d+w\d+h\d+d\d+/gi, "m0w0h0d0")

  const imagesQuery = db
    .select({ url: itemsImageURL.url })
    .from(itemsImageURL)
    .where(eq(itemsImageURL.vendor_code, imageCodeBase))
    .orderBy(desc(itemsImageURL.is_thumbnail), asc(itemsImageURL.image_number))

  const [itemArr, itemNameDescriptionArr, images] = await Promise.all([
    itemArrQuery,
    itemNameDescriptionArrQuery,
    imagesQuery,
  ])

  const item = itemArr[0]
  const itemNameDescription = itemNameDescriptionArr[0]

  const itemCodePartition = params.code.replace(/c\d+m\d+w\d+h\d+d\d+/gi, "%")

  const variationSearch = params.code.match(/[cmwhd]][1-9]\d*/gi)

  const currentVariation = variationSearch?.length ? variationSearch[0] : ""

  const itemVariants = await db
    .select({
      vendorCode: characteristicsFurniture.vendor_code,
      color: characteristicsFurniture.color,
      material: characteristicsFurniture.material,
      width: characteristicsFurniture.width,
      height: characteristicsFurniture.height,
      depth: characteristicsFurniture.depth,
    })
    .from(characteristicsFurniture)
    .where(
      and(
        like(characteristicsFurniture.vendor_code, itemCodePartition),
        like(characteristicsFurniture.vendor_code, `%${currentVariation}%`)
      )
    )
    .orderBy(asc(characteristicsFurniture.vendor_code))

  const colors: Set<string> = new Set()
  const materials: Set<string> = new Set()
  const width: Set<number> = new Set()
  const height: Set<number> = new Set()
  const depth: Set<number> = new Set()

  itemVariants.forEach((item) => {
    colors.add(item.color)
    materials.add(item.material)
    width.add(item.width)
    height.add(item.height)
    depth.add(item.depth)
  })

  function addCharacteristics(
    set: Set<string | number>,
    code: string,
    name: string
  ) {
    const regExp = new RegExp(`${code}\\d+`, "gi")

    return set.size > 1 ? (
      <li>
        <span>{name}: </span>
        {[...set].map((variant, idx) => (
          <Link
            key={`${variant}-${code}-${idx}`}
            href={`/${params.locale}/furniture/${params.code.replace(
              regExp,
              `${code}${idx}`
            )}`}
          >
            {variant}{" "}
          </Link>
        ))}
      </li>
    ) : null
  }

  return (
    <section>
      <h1>{itemNameDescription.name}</h1>
      <p>Price: {item.price * ((100 - item.discount) / 100)}$</p>
      {itemVariants.length > 1 ? (
        <div>
          <ul>
            {addCharacteristics(colors, "c", "Color")}
            {addCharacteristics(materials, "m", "Material")}
            {addCharacteristics(width, "w", "Width")}
            {addCharacteristics(height, "h", "Height")}
            {addCharacteristics(depth, "d", "Depth")}
          </ul>
        </div>
      ) : null}
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
          <li>Color: {item.color}</li>
          <li>
            Sizes: {item.height} x {item.width} x {item.depth}
          </li>
          <li>Weight: {item.weight} kg</li>
          <li>Material: {item.material}</li>
          <li>Folding: {item.folding === true ? "yes" : "no"}</li>
          <li>Warranty: {item.warranty} months</li>
        </ul>
        <p>Description: {itemNameDescription.desc}</p>
      </div>
    </section>
  )
}