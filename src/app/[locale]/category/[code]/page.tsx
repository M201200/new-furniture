import { and, between, count, desc, eq, isNull, like, or } from "drizzle-orm"
import Image from "next/image"
import Link from "next/link"

import { db } from "@/app/db"
import {
  characteristicsFurniture,
  colors,
  items,
  itemsImageURL,
  itemsName,
  materials,
} from "@/app/db/schema"

import FilterFurniture from "../../components/FilterFurniture"
import Pagination from "../../components/Pagination"

type Params = {
  searchParams?: {
    minP?: string
    maxP?: string
    minH?: string
    maxH?: string
    minW?: string
    maxW?: string
    minD?: string
    maxD?: string
    mat?: string[]
    clr?: string[]
    var?: string
    page?: string
  }
  params: {
    code: string
    locale: string
  }
}

export default async function Items({ searchParams, params }: Params) {
  const highestValue = 450
  const highestPrice = 3500
  const searchParamsProcessed = searchParams
    ? {
        page: processString(searchParams?.page) || 1,
        minW: processString(searchParams?.minW),
        maxW: processString(searchParams?.maxW),
        minH: processString(searchParams?.minH),
        maxH: processString(searchParams?.maxH),
        minD: processString(searchParams?.minD),
        maxD: processString(searchParams?.maxD),
        minP: processString(searchParams?.minP),
        maxP: processString(searchParams?.maxP),
        var: searchParams?.var === "true" ? true : false,
        clr: processArray(searchParams.clr),
        mat: processArray(searchParams.mat),
      }
    : null

  function processString(str: string | null | undefined) {
    if (!str) return null
    return !isNaN(+str.replace(/\D/g, "")) ? +str.replace(/\D/g, "") : null
  }

  function processArray(array: string[] | string | null | undefined) {
    if (!array) return []
    else if (Array.isArray(array))
      return array.map((item) => item.replace(/[^\w-]/g, ""))
    else if (typeof array === "string") return [array.replace(/[^\w-]/g, "")]
    else return []
  }

  function setConditions() {
    const conditions = [
      or(
        eq(items.category_code, +params.code),
        like(items.category_code, `${params.code}%`)
      ),
    ]
    if (!searchParamsProcessed) return conditions

    const {
      minW,
      maxW,
      minH,
      maxH,
      minD,
      maxD,
      minP,
      maxP,
      clr,
      mat,
      var: varFlag,
    } = searchParamsProcessed

    if (minW || maxW) {
      conditions.push(
        between(characteristicsFurniture.width, minW || 0, maxW || highestValue)
      )
    }
    if (minH || maxH) {
      conditions.push(
        between(
          characteristicsFurniture.height,
          minH || 0,
          maxH || highestValue
        )
      )
    }
    if (minD || maxD) {
      conditions.push(
        between(characteristicsFurniture.depth, minD || 0, maxD || highestValue)
      )
    }
    if (minP || maxP) {
      conditions.push(
        between(items.final_price, minP || 0, maxP || highestPrice)
      )
    }
    if (clr.length) {
      const mappedColors = clr.map((color) =>
        eq(characteristicsFurniture.color, color)
      )
      conditions.push(or(...mappedColors))
    }
    if (mat.length) {
      const mappedMaterials = mat.map((material) =>
        eq(characteristicsFurniture.material, material)
      )
      conditions.push(or(...mappedMaterials))
    }
    varFlag === true ? conditions.push(eq(items.variation, "c0m0w0h0d0")) : null

    return conditions
  }
  const valuesQuery = db
    .select({
      totalItems: count(items.id),
    })
    .from(items)
    .innerJoin(
      characteristicsFurniture,
      eq(characteristicsFurniture.vendor_code, items.vendor_code)
    )
    .where(and(...setConditions()))
    .orderBy(items.id)

  const allColorsQuery = db
    .selectDistinct({
      name: colors.name,
      locale:
        params.locale === "en"
          ? colors.en
          : params.locale === "ro"
          ? colors.ro
          : params.locale === "ru"
          ? colors.ru
          : colors.en,
      hex: colors.hex,
    })
    .from(colors)
    .innerJoin(
      characteristicsFurniture,
      eq(colors.name, characteristicsFurniture.color)
    )
    .where(like(characteristicsFurniture.vendor_code, `${params.code}%`))
    .orderBy(desc(colors.name))

  const allMaterialsQuery = db
    .selectDistinct({
      name: materials.name,
      locale:
        params.locale === "en"
          ? materials.en
          : params.locale === "ro"
          ? materials.ro
          : params.locale === "ru"
          ? materials.ru
          : materials.en,
    })
    .from(materials)
    .innerJoin(
      characteristicsFurniture,
      eq(materials.name, characteristicsFurniture.material)
    )
    .where(like(characteristicsFurniture.vendor_code, `${params.code}%`))
    .orderBy(desc(materials.name))

  const [valuesArr, colorsArr, materialsArr] = await Promise.all([
    valuesQuery,
    allColorsQuery,
    allMaterialsQuery,
  ])

  const values = valuesArr[0]

  const minWidth = searchParamsProcessed?.minW || 0
  const maxWidth = searchParamsProcessed?.maxW || highestValue
  const minHeight = searchParamsProcessed?.minH || 0
  const maxHeight = searchParamsProcessed?.maxH || highestValue
  const minDepth = searchParamsProcessed?.minD || 0
  const maxDepth = searchParamsProcessed?.maxD || highestValue
  const minPrice = searchParamsProcessed?.minP || 0
  const maxPrice = searchParamsProcessed?.maxP || highestPrice

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
      final_price: items.final_price,
      color: characteristicsFurniture.color,
      material: characteristicsFurniture.material,
      width: characteristicsFurniture.width,
      height: characteristicsFurniture.height,
      depth: characteristicsFurniture.depth,
      folding: characteristicsFurniture.folding,
      thumbnailURL: itemsImageURL.url,
    })
    .from(items)
    .leftJoin(itemsName, eq(items.vendor_code, itemsName.vendor_code))
    .leftJoin(itemsImageURL, eq(items.vendor_code, itemsImageURL.vendor_code))
    .innerJoin(
      characteristicsFurniture,
      eq(characteristicsFurniture.vendor_code, items.vendor_code)
    )
    .where(
      or(
        and(eq(itemsImageURL.is_thumbnail, true), ...setConditions()),
        and(isNull(itemsImageURL.vendor_code), ...setConditions())
      )
    )
    .orderBy(items.id)
    .offset(
      searchParamsProcessed?.page ? (searchParamsProcessed?.page - 1) * 10 : 0
    )
    .limit(10)

  const totalPages =
    values.totalItems > 10 ? Math.ceil(values.totalItems / 10) : 1

  return (
    <section>
      <FilterFurniture
        prices={{
          lowest: 0,
          highest: highestPrice,
          min: minPrice,
          max: maxPrice,
        }}
        widths={{
          lowest: 0,
          highest: highestValue,
          min: minWidth,
          max: maxWidth,
        }}
        heights={{
          lowest: 0,
          highest: highestValue,
          min: minHeight,
          max: maxHeight,
        }}
        depths={{
          lowest: 0,
          highest: highestValue,
          min: minDepth,
          max: maxDepth,
        }}
        materialsArr={materialsArr}
        colorsArr={colorsArr}
        selectedColors={searchParamsProcessed?.clr || []}
        selectedMaterials={searchParamsProcessed?.mat || []}
        includeVariants={searchParamsProcessed?.var}
      />
      {allItems.map((item, idx, arr) => (
        <div key={item.vendorCode}>
          <Link href={`/${params.locale}/furniture/${item.vendorCode}`}>
            <Image
              src={
                item.thumbnailURL
                  ? item.thumbnailURL
                  : arr.find(
                      (i) =>
                        i.vendorCode ===
                        item.vendorCode?.replace(
                          /m\d+w\d+h\d+d\d+/gi,
                          "m0w0h0d0"
                        )
                    )?.thumbnailURL!
              }
              width={300}
              height={300}
              alt="thumbnail"
            />
          </Link>
          <Link href={`/${params.locale}/furniture/${item.vendorCode}`}>
            {item.name}
          </Link>
          <span> |{item.final_price}$</span>
        </div>
      ))}
      <Pagination totalPages={totalPages} />
    </section>
  )
}
