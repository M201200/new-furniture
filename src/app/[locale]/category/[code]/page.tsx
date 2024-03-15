import { and, between, count, desc, eq, isNull, like, or } from "drizzle-orm"

import getCurrencyConversion from "@/app/api/currencyConversion/currencyConversion"
import { db } from "@/app/db"
import {
  characteristicsFurniture,
  colors,
  items,
  itemsImageURL,
  itemsName,
  materials,
} from "@/app/db/schema"
import { auth } from "@/app/lib/auth"
import { getUserPreferences } from "@/utils/functions/getUserPreferences"
import sanitizeArray from "@/utils/functions/sanitizeArray"
import sanitizeStringToNumber from "@/utils/functions/sanitizeStringToNumber"

import FilterFurniture from "../../components/FilterFurniture"
import ItemComponent from "../../components/ItemComponent"
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
    locale: Locale
  }
}

export default async function Items({ searchParams, params }: Params) {
  const highestValue = 450
  const highestPrice = 3500
  const maxItemsOnPage = 12
  const searchParamsSanitized = searchParams
    ? {
        page: sanitizeStringToNumber(searchParams?.page) || 1,
        minW: sanitizeStringToNumber(searchParams?.minW),
        maxW: sanitizeStringToNumber(searchParams?.maxW),
        minH: sanitizeStringToNumber(searchParams?.minH),
        maxH: sanitizeStringToNumber(searchParams?.maxH),
        minD: sanitizeStringToNumber(searchParams?.minD),
        maxD: sanitizeStringToNumber(searchParams?.maxD),
        minP: sanitizeStringToNumber(searchParams?.minP),
        maxP: sanitizeStringToNumber(searchParams?.maxP),
        var: searchParams?.var === "true" ? true : false,
        clr: sanitizeArray(searchParams.clr),
        mat: sanitizeArray(searchParams.mat),
      }
    : null

  function setConditions() {
    const conditions = [
      or(
        eq(items.category_code, +params.code),
        like(items.category_code, `${params.code}%`)
      ),
    ]
    if (!searchParamsSanitized) return conditions

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
    } = searchParamsSanitized

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
  const itemsCountQuery = db
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
    .execute()

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
    .execute()

  const [itemsCountArr, colorsArr, materialsArr] = await Promise.all([
    itemsCountQuery,
    allColorsQuery,
    allMaterialsQuery,
  ])

  const itemsCount = itemsCountArr[0]

  const minWidth = searchParamsSanitized?.minW || 0
  const maxWidth = searchParamsSanitized?.maxW || highestValue
  const minHeight = searchParamsSanitized?.minH || 0
  const maxHeight = searchParamsSanitized?.maxH || highestValue
  const minDepth = searchParamsSanitized?.minD || 0
  const maxDepth = searchParamsSanitized?.maxD || highestValue
  const minPrice = searchParamsSanitized?.minP || 0
  const maxPrice = searchParamsSanitized?.maxP || highestPrice

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
        and(eq(itemsImageURL.image_number, 1), ...setConditions()),
        and(isNull(itemsImageURL.vendor_code), ...setConditions())
      )
    )
    .orderBy(items.id)
    .offset(
      searchParamsSanitized?.page
        ? (searchParamsSanitized?.page - 1) * maxItemsOnPage
        : 0
    )
    .limit(maxItemsOnPage)
    .execute()

  const session = await auth()
  const user_email = session?.user?.email || null

  const userPreferences = await getUserPreferences()
  const currentCurrency = userPreferences.currency

  const rates: Rates = await getCurrencyConversion()

  const totalPages =
    itemsCount.totalItems > maxItemsOnPage
      ? Math.ceil(itemsCount.totalItems / maxItemsOnPage)
      : 1

  return (
    <main className="grid md:grid-cols-[10rem,1fr] gap-8 justify-center p-4">
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
        selectedColors={searchParamsSanitized?.clr || []}
        selectedMaterials={searchParamsSanitized?.mat || []}
        includeVariants={searchParamsSanitized?.var}
      />
      <div className="flex flex-col gap-4">
        <ul className="flex flex-wrap justify-center gap-6">
          {allItems.map((item) => (
            <ItemComponent
              key={item.vendorCode}
              vendorCode={item.vendorCode!}
              locale={params.locale}
              imageURL={
                item.thumbnailURL
                  ? item.thumbnailURL
                  : "/images/" +
                    item.vendorCode
                      ?.replace(/\-/gi, "/")
                      .replace(/m\d+w\d+h\d+d\d+/gi, "m0w0h0d0") +
                    "/1.webp"
              }
              name={item.name!}
              price={item.price}
              discount={item.discount}
              finalPrice={item.final_price!}
              currentCurrency={currentCurrency}
              user_email={user_email}
              rates={rates}
            />
          ))}
        </ul>
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  )
}
