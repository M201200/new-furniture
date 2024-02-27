import { KeyboardEvent, SetStateAction } from "react"

import { useRouter } from "next/navigation"
import { URLSearchParams } from "url"

type RangeProps = {
  setter: (
    value: SetStateAction<{
      min: number
      max: number
    }>
  ) => void
  param: { min: number; max: number }
  paramName: "Price" | "Height" | "Width" | "Depth"
  sign: "P" | "H" | "W" | "D"
  searchParams: URLSearchParams
  pathname: string
  range: { lowest: number; highest: number }
}

export default function FilterRange({
  setter,
  param,
  paramName,
  sign,
  searchParams,
  pathname,
  range,
}: RangeProps) {
  const router = useRouter()
  function setParams(
    event: KeyboardEvent<HTMLInputElement>,
    value: "min" | "max"
  ) {
    if (event.key !== "Enter") return
    searchParams.delete("page")
    const currentParam = value === "min" ? param.min : param.max
    const comparisonValue = value === "min" ? range.lowest : range.highest

    if (currentParam <= param.max && currentParam >= comparisonValue) {
      searchParams.set(`${value}${sign}`, currentParam.toString())
    } else if (
      currentParam < comparisonValue ||
      currentParam === null ||
      Number.isNaN(currentParam)
    ) {
      setter({
        ...param,
        [value]: comparisonValue,
      })
      searchParams.set(`${value}${sign}`, comparisonValue.toString())
    } else if (currentParam > param.max) {
      setter({
        ...param,
        [value]: param.max,
      })
      searchParams.set(`${value}${sign}`, param.max.toString())
    }

    router.push(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }

  return (
    <li>
      <h2>{paramName}:</h2>
      <div>
        <label htmlFor={`${paramName}-min`}>Min</label>
        <input
          id={`${paramName}-min`}
          value={param.min}
          onChange={(e) =>
            setter({
              ...param,
              min: Number(e.target.value.replace(/\D/g, "")),
            })
          }
          onKeyDown={(e) => setParams(e, "min")}
          type="text"
          inputMode="numeric"
        />
        <label htmlFor={`${param}-min`}>Max</label>
        <input
          id={`${paramName}-max`}
          value={param.max}
          onChange={(e) =>
            setter({
              ...param,
              max: Number(e.target.value.replace(/\D/g, "")),
            })
          }
          onKeyDown={(e) => setParams(e, "max")}
          type="text"
          inputMode="numeric"
        />
      </div>
    </li>
  )
}
