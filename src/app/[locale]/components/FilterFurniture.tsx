"use client"

import { useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import FilterRange from "./FilterRange"

type RangeValues = {
  lowest: number
  highest: number
  min?: number
  max?: number
}

type FilterParams = {
  materialsArr: {
    name: string
    locale: string
  }[]
  colorsArr: {
    name: string
    hex: string
    locale: string
  }[]
  selectedMaterials?: string[]
  selectedColors?: string[]

  prices: RangeValues
  heights: RangeValues
  widths: RangeValues
  depths: RangeValues
  includeVariants?: boolean
}

export default function FilterFurniture({
  prices,
  materialsArr,
  colorsArr,
  heights,
  widths,
  depths,
  includeVariants: excludeVariants = false,
  selectedMaterials = [],
  selectedColors = [],
}: FilterParams) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams.toString())
  const router = useRouter()

  function setRange(params: RangeValues, sign: "P" | "H" | "W" | "D") {
    const min = searchParams.get(`min${sign}`)
    const max = searchParams.get(`max${sign}`)

    return {
      min: min !== null ? +min : params.lowest,
      max: max !== null ? +max : params.highest,
    }
  }

  const newPrices = setRange(prices, "P")
  const newWidth = setRange(widths, "W")
  const newHeights = setRange(heights, "H")
  const newDepths = setRange(depths, "D")

  const [price, setPrice] = useState(newPrices)
  const [width, setWidth] = useState(newWidth)
  const [height, setHeight] = useState(newHeights)
  const [depth, setDepth] = useState(newDepths)

  const [materials, setMaterials] = useState(selectedMaterials)
  const [colors, setColors] = useState(selectedColors)
  const [variants, setVariants] = useState(excludeVariants)

  function handleMaterialChange(materialName: string) {
    const updatedMaterials = materials.includes(materialName)
      ? materials.filter((mat) => mat !== materialName)
      : [...materials, materialName]

    setMaterials(updatedMaterials)
    updateSearchParams("mat", updatedMaterials)
  }

  function handleColorChange(colorName: string) {
    const updatedColors = colors.includes(colorName)
      ? colors.filter((clr) => clr !== colorName)
      : [...colors, colorName]
    setColors(updatedColors)
    updateSearchParams("clr", updatedColors)
  }

  function updateSearchParams(param: string, values: string[]) {
    if (values.length) {
      newSearchParams.delete(param)
      newSearchParams.delete("page")
      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: false,
      })
    }
    newSearchParams.delete(param)
    values.forEach((value: string) => {
      newSearchParams.append(param, value)
    })
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false })
  }
  return (
    <section>
      <ul>
        <FilterRange
          setter={setPrice}
          param={price}
          paramName={"Price"}
          sign={"P"}
          range={{ lowest: prices.lowest, highest: prices.highest }}
          searchParams={newSearchParams}
          pathname={pathname}
        />
        <FilterRange
          setter={setHeight}
          param={height}
          paramName={"Height"}
          sign={"H"}
          range={{ lowest: heights.lowest, highest: heights.highest }}
          searchParams={newSearchParams}
          pathname={pathname}
        />
        <FilterRange
          setter={setWidth}
          param={width}
          paramName={"Width"}
          sign={"W"}
          range={{ lowest: widths.lowest, highest: widths.highest }}
          searchParams={newSearchParams}
          pathname={pathname}
        />
        <FilterRange
          setter={setDepth}
          param={depth}
          paramName={"Depth"}
          sign={"D"}
          range={{ lowest: depths.lowest, highest: depths.highest }}
          searchParams={newSearchParams}
          pathname={pathname}
        />
        <li>
          <h2>Materials:</h2>
          <ul>
            {materialsArr.map((material) => (
              <li key={material.name}>
                <label htmlFor="materials">{material.locale}</label>
                <input
                  type="checkbox"
                  id="materials"
                  checked={materials.includes(material.name)}
                  onChange={() => handleMaterialChange(material.name)}
                />
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h2>Colors:</h2>
          <ul>
            {colorsArr.map((color) => (
              <li key={color.name}>
                <span
                  style={{ backgroundColor: color.hex }}
                  className="w-4 h-4"
                ></span>
                <label htmlFor="colors">{color.locale}</label>
                <input
                  type="checkbox"
                  id="colors"
                  checked={colors.includes(color.name)}
                  onChange={() => handleColorChange(color.name)}
                />
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h2>Exclude Variants:</h2>
          <input
            type="checkbox"
            checked={variants}
            onChange={() => {
              setVariants(!variants)
              if (variants) {
                newSearchParams.delete("page")
                newSearchParams.delete("var")
              } else {
                newSearchParams.delete("page")
                newSearchParams.set("var", "true")
              }
              router.push(`${pathname}?${newSearchParams.toString()}`, {
                scroll: false,
              })
            }}
          />
        </li>
      </ul>
    </section>
  )
}
