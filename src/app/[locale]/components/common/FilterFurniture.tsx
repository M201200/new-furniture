"use client"

import { useEffect, useRef, useState } from "react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BsSliders } from "react-icons/bs"

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

  tl: {
    excludeVariants: string
    materials: string
    colors: string
    characteristics: string
    height: string
    width: string
    depth: string
    price: string
    from: string
    to: string
  }
}

export default function FilterFurniture({
  tl,
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

  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref])

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

  function backgroundStyle(color: {
    name: string
    hex: string
    locale: string
  }) {
    return color.hex.length > 7
      ? {
          backgroundImage: `linear-gradient(to right, ${color.hex})`,
        }
      : { backgroundColor: color.hex }
  }
  return (
    <div
      ref={ref}
      className={`relative ${
        isOpen ? "max-w-[40rem]" : ""
      } rounded justify-self-end lg:w-full`}
    >
      <button
        className="text-center p-2 fluid-base rounded-full flex gap-2 w-full lg:hidden border-2 border-borderThin text-textPrimary items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BsSliders className="fluid-xl" />
      </button>
      <section
        className={`grid gap-3 gap-x-6 absolute lg:relative w-fit lg:w-full lg:opacity-100 lg:visible transition-[visibility,opacity,transform] ease-in-out lg:translate-x-0 rounded lg:bg-transparent bg-bgPrimary border border-borderThin lg:border-none text-textPrimary z-10 p-3 ${
          isOpen
            ? "opacity-100 visible -translate-x-32"
            : "invisible overflow-hidden opacity-0 translate-x-8"
        }`}
      >
        <ul className="flex flex-col gap-5">
          <li className="grid gap-2 items-center">
            <h2 className="fluid-lg text-wrap font-semibold">
              {tl.excludeVariants}:
            </h2>
            <input
              className="w-8 h-8"
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
          <FilterRange
            tl={{ to: tl.to, from: tl.from }}
            setter={setPrice}
            param={price}
            paramName={tl.price as Sizes}
            sign={"P"}
            range={{ lowest: prices.lowest, highest: prices.highest }}
            searchParams={newSearchParams}
            pathname={pathname}
          />
          <FilterRange
            tl={{ to: tl.to, from: tl.from }}
            setter={setHeight}
            param={height}
            paramName={tl.height as Sizes}
            sign={"H"}
            range={{ lowest: heights.lowest, highest: heights.highest }}
            searchParams={newSearchParams}
            pathname={pathname}
          />
          <FilterRange
            tl={{ to: tl.to, from: tl.from }}
            setter={setWidth}
            param={width}
            paramName={tl.width as Sizes}
            sign={"W"}
            range={{ lowest: widths.lowest, highest: widths.highest }}
            searchParams={newSearchParams}
            pathname={pathname}
          />
          <FilterRange
            tl={{ to: tl.to, from: tl.from }}
            setter={setDepth}
            param={depth}
            paramName={tl.depth as Sizes}
            sign={"D"}
            range={{ lowest: depths.lowest, highest: depths.highest }}
            searchParams={newSearchParams}
            pathname={pathname}
          />
          {materialsArr.length ? (
            <li className="grid gap-2">
              <h2 className="fluid-lg font-semibold">{tl.materials}:</h2>
              <ul className="flex flex-col gap-2 max-h-72 overflow-auto p-2 border rounded-lg border-borderThin">
                {materialsArr.map((material) => (
                  <li
                    className="flex gap-2 items-center"
                    key={material.name}
                    title={material.locale}
                  >
                    <input
                      className="text-textPrimary size-4 shrink-0 cursor-pointer"
                      type="checkbox"
                      id="materials"
                      checked={materials.includes(material.name)}
                      onChange={() => handleMaterialChange(material.name)}
                    />
                    <label
                      className="text-textSecondary fluid-base truncate"
                      htmlFor="materials"
                    >
                      {material.locale}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ) : null}
          {colorsArr.length ? (
            <li className="grid gap-2">
              <h2 className="fluid-lg font-semibold">{tl.colors}:</h2>
              <ul className="flex flex-col gap-2 max-h-72 overflow-auto p-2 border rounded-lg border-borderThin">
                {colorsArr.map((color) => (
                  <li
                    className="flex gap-2 items-center"
                    key={color.name}
                    title={color.locale}
                  >
                    <input
                      className="shrink-0 text-textPrimary cursor-pointer size-4"
                      type="checkbox"
                      id="colors"
                      checked={colors.includes(color.name)}
                      onChange={() => handleColorChange(color.name)}
                    />
                    <span
                      style={backgroundStyle(color)}
                      className="w-4 h-4 border shrink-0 border-borderThin rounded-full"
                    ></span>
                    <label
                      className="text-textSecondary fluid-base truncate"
                      title={color.locale}
                      htmlFor="colors"
                    >
                      {color.locale}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  )
}
