import { and, asc, desc, eq, like, or } from "drizzle-orm"
import Link from "next/link"

import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { db } from "@/app/db"
import {
  characteristicsFurniture,
  colors,
  items,
  itemsDescription,
  itemsImageURL,
  itemsName,
  materials,
  user_profile,
} from "@/app/db/schema"
import { auth } from "@/app/lib/auth"

import CartButton from "../../components/buttons/CartButton"
import FavoritesButton from "../../components/buttons/FavoritesButton"
import ImageCarousel from "../../components/common/ImageCarousel"
import PriceTag from "../../components/common/PriceTag"

export default async function ItemPage({
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
      finalPrice: items.final_price,
      item_name:
        params.locale === "en"
          ? itemsName.en
          : params.locale === "ro"
          ? itemsName.ro
          : params.locale === "ru"
          ? itemsName.ru
          : itemsName.en,
      color_name:
        params.locale === "en"
          ? colors.en
          : params.locale === "ro"
          ? colors.ro
          : params.locale === "ru"
          ? colors.ru
          : colors.en,
      hex: colors.hex,
      material_name:
        params.locale === "en"
          ? materials.en
          : params.locale === "ro"
          ? materials.ro
          : params.locale === "ru"
          ? materials.ru
          : materials.en,
      width: characteristicsFurniture.width,
      height: characteristicsFurniture.height,
      depth: characteristicsFurniture.depth,
      weight: characteristicsFurniture.weight,
      folding: characteristicsFurniture.folding,
      warranty: characteristicsFurniture.warranty,
    })
    .from(items)
    .where(eq(items.vendor_code, params.code))
    .innerJoin(itemsName, eq(items.vendor_code, itemsName.vendor_code))
    .innerJoin(
      characteristicsFurniture,
      eq(characteristicsFurniture.vendor_code, items.vendor_code)
    )
    .innerJoin(colors, eq(characteristicsFurniture.color, colors.name))
    .innerJoin(materials, eq(characteristicsFurniture.material, materials.name))
    .orderBy(asc(items.vendor_code))
    .execute()

  const itemDescriptionArrQuery = db
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
    .where(
      or(
        eq(itemsDescription.vendor_code, params.code),
        eq(itemsDescription.vendor_code, itemCodeBase)
      )
    )
    .orderBy(desc(itemsDescription.vendor_code))
    .execute()

  const imageCodeBase = params.code.replace(/m\d+w\d+h\d+d\d+/gi, "m0w0h0d0")

  const imagesQuery = db
    .select({ url: itemsImageURL.url })
    .from(itemsImageURL)
    .where(eq(itemsImageURL.vendor_code, imageCodeBase))
    .orderBy(asc(itemsImageURL.image_number))
    .execute()

  const [itemArr, itemDescriptionArr, images] = await Promise.all([
    itemArrQuery,
    itemDescriptionArrQuery,
    imagesQuery,
  ])

  const item = itemArr[0]
  const itemNameDescription = itemDescriptionArr[0]

  const itemCodePartition = params.code.replace(/c\d+m\d+w\d+h\d+d\d+/gi, "%")

  const variationSearch = params.code.match(/[cmwhd]][1-9]\d*/gi)

  const currentVariation = variationSearch?.length ? variationSearch[0] : ""

  const itemVariants = await db
    .select({
      color_name:
        params.locale === "en"
          ? colors.en
          : params.locale === "ro"
          ? colors.ro
          : params.locale === "ru"
          ? colors.ru
          : colors.en,
      hex: colors.hex,
      material_name:
        params.locale === "en"
          ? materials.en
          : params.locale === "ro"
          ? materials.ro
          : params.locale === "ru"
          ? materials.ru
          : materials.en,
      color: characteristicsFurniture.color,
      material: characteristicsFurniture.material,
      width: characteristicsFurniture.width,
      height: characteristicsFurniture.height,
      depth: characteristicsFurniture.depth,
    })
    .from(characteristicsFurniture)
    .innerJoin(colors, eq(characteristicsFurniture.color, colors.name))
    .innerJoin(materials, eq(characteristicsFurniture.material, materials.name))
    .where(
      and(
        like(characteristicsFurniture.vendor_code, itemCodePartition),
        like(characteristicsFurniture.vendor_code, `%${currentVariation}%`)
      )
    )
    .orderBy(asc(characteristicsFurniture.vendor_code))
    .execute()

  const colorsSet: Set<string> = new Set()
  const colorNames: Set<string> = new Set()
  const hexes: Set<string> = new Set()
  const materialsSet: Set<string> = new Set()
  const materialNames: Set<string> = new Set()
  const width: Set<number> = new Set()
  const height: Set<number> = new Set()
  const depth: Set<number> = new Set()

  itemVariants.forEach((item) => {
    colorsSet.add(item.color)
    colorNames.add(item.color_name)
    hexes.add(item.hex)
    materialsSet.add(item.material)
    materialNames.add(item.material_name)
    width.add(item.width)
    height.add(item.height)
    depth.add(item.depth)
  })

  function addCharacteristics(set: Set<number>, code: string, name: string) {
    const regExp = new RegExp(`${code}\\d+`, "gi")

    return set.size > 1 ? (
      <li>
        <span className="font-semibold fluid-base text-textSecondary">
          {name} (sm):{" "}
        </span>
        {[...set].map((variant, idx) => (
          <Link
            className="p-2 flex-nowrap rounded-lg border border-borderThin"
            key={`${variant}-${code}-${idx}`}
            href={`/${params.locale}/furniture/${params.code.replace(
              regExp,
              `${code}${idx}`
            )}`}
          >
            {variant}
          </Link>
        ))}
      </li>
    ) : null
  }

  const rates: Rates = await getCurrencyConversion()
  const session = await auth()

  let currentCurrency

  if (session) {
    const preferredCurrencyArr = await db
      .select()
      .from(user_profile)
      .where(eq(user_profile.user_email, session.user?.email || ""))
      .execute()
    currentCurrency = preferredCurrencyArr[0].currency as Currency
  } else {
    currentCurrency = null
  }

  function backgroundStyle(hex: string) {
    return hex.length > 7
      ? {
          backgroundImage: `linear-gradient(to right, ${hex
            .split("")
            .join(", ")})`,
        }
      : { backgroundColor: hex }
  }

  return (
    <main>
      <section className="grid lg:grid-cols-3 lg:gap-6 gap-10 text-textPrimary p-2">
        <ImageCarousel URLs={images.map((image) => image.url!)} />
        <section className="flex flex-col gap-6 p-2">
          {itemVariants.length > 1 ? (
            <div>
              <h2 className="fluid-lg font-bold mb-2">Variants:</h2>
              <ul>
                {colorsSet.size > 1 ? (
                  <li className="flex flex-nowrap shrink-0 gap-2">
                    <span className="font-semibold fluid-base text-textSecondary">
                      Color:{" "}
                    </span>
                    {[...colorsSet].map((variant, idx) => (
                      <Link
                        style={backgroundStyle([...hexes][idx])}
                        className="h-8 w-8 rounded-lg border border-borderThin"
                        key={`${variant}-c${idx}`}
                        href={`/${
                          params.locale
                        }/furniture/${params.code.replace(
                          /c\d+/gi,
                          `c${idx}`
                        )}`}
                        title={[...colorNames][idx]}
                      ></Link>
                    ))}
                  </li>
                ) : null}
                {materialsSet.size > 1 ? (
                  <li className="flex flex-nowrap shrink-0 gap-2">
                    <span className="font-semibold fluid-base text-textSecondary">
                      Material:{" "}
                    </span>
                    {[...materialsSet].map((variant, idx) => (
                      <Link
                        className="p-2 fluid-base rounded-lg border border-borderThin"
                        key={`${variant}-m${idx}`}
                        href={`/${
                          params.locale
                        }/furniture/${params.code.replace(
                          /m\d+/gi,
                          `m${idx}`
                        )}`}
                        title={[...materialNames][idx]}
                      >
                        {[...materialNames][idx]}
                      </Link>
                    ))}
                  </li>
                ) : null}
                {addCharacteristics(width, "w", "Width")}
                {addCharacteristics(height, "h", "Height")}
                {addCharacteristics(depth, "d", "Depth")}
              </ul>
            </div>
          ) : null}
          <ul>
            <h2 className="fluid-lg font-bold mb-2">Characteristics:</h2>
            <li>
              <span className="font-semibold fluid-base text-textSecondary">
                Color:{" "}
              </span>
              <span className="fluid-base">{item.color_name}</span>
            </li>
            <li>
              <h3 className="font-semibold fluid-base text-textSecondary">
                Sizes (sm):
              </h3>
              <ul className="grid px-2">
                <li>
                  <span className="font-semibold fluid-sm text-textSecondary">
                    Height:{" "}
                  </span>
                  <span className="fluid-base">{item.height}</span>
                </li>
                <li>
                  <span className="font-semibold fluid-sm text-textSecondary">
                    Width:{" "}
                  </span>
                  <span className="fluid-base">{item.width}</span>
                </li>
                <li>
                  <span className="font-semibold fluid-sm text-textSecondary">
                    Depth:{" "}
                  </span>
                  <span className="fluid-base">{item.depth}</span>
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold fluid-base text-textSecondary">
                Weight:{" "}
              </span>
              <span className="fluid-base">{item.weight} kg</span>
            </li>
            <li>
              <span className="font-semibold fluid-base text-textSecondary">
                Material:{" "}
              </span>
              <span className="fluid-base">{item.material_name}</span>
            </li>
            <li>
              <span className="font-semibold fluid-base text-textSecondary">
                Folding:{" "}
              </span>
              <span className="fluid-base">
                {item.folding === true ? "yes" : "no"}
              </span>
            </li>
            <li>
              <span className="font-semibold fluid-base text-textSecondary">
                Warranty:{" "}
              </span>
              <span className="fluid-base">{item.warranty} months</span>
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-2 p-2 row-start-2 row-end-3 lg:row-start-1 lg:row-end-2 lg:col-start-3 lg:col-end-4">
          <h2 className="fluid-xl font-bold text-wrap text-textPrimary">
            {item.item_name}
          </h2>
          <PriceTag
            price={item.price}
            discount={item.discount}
            finalPrice={item.finalPrice!}
            currentCurrency={currentCurrency}
            exchangeRates={rates}
          />
          <div className="grid grid-cols-[1fr,3rem] gap-1">
            <CartButton
              currentVendorCode={params.code}
              user_email={session?.user?.email}
            />
            <FavoritesButton
              currentVendorCode={params.code}
              user_email={session?.user?.email}
            />
          </div>
        </section>
      </section>

      <section className="p-2">
        <h2 className="fluid-lg font-bold text-textPrimary">Description:</h2>
        <p className="fluid-base p-2 text-textSecondary">
          {itemNameDescription.desc}
        </p>
      </section>
    </main>
  )
}
