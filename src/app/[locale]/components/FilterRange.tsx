import { FocusEvent, KeyboardEvent, SetStateAction } from "react"

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
    event: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
    value: "min" | "max"
  ) {
    if ("key" in event && event.key !== "Enter") return

    const val = value === "min" ? param.min : param.max

    searchParams.delete("page")

    if (value === "min") {
      if (val === Number(searchParams.get(`min${sign}`))) return
      if (val <= param.max && val >= range.lowest) {
        searchParams.set(`${value}${sign}`, val.toString())
      } else if (val < range.lowest || val === null || isNaN(+val)) {
        setter({
          ...param,
          min: range.lowest,
        })
        searchParams.set(`min${sign}`, range.lowest.toString())
      } else if (val > param.max) {
        setter({
          ...param,
          min: param.max,
        })
        searchParams.set(`min${sign}`, param.max.toString())
      }
      router.push(`${pathname}?${searchParams.toString()}`, { scroll: false })
    } else {
      if (val === Number(searchParams.get(`max${sign}`))) return
      if (val >= param.min && val <= range.highest) {
        searchParams.set(`max${sign}`, val.toString())
      } else if (val > range.highest || val === null || isNaN(+val)) {
        setter({
          ...param,
          max: range.highest,
        })
        searchParams.set(`max${sign}`, range.lowest.toString())
      } else if (val < param.min) {
        setter({
          ...param,
          max: param.min,
        })
        searchParams.set(`max${sign}`, param.min.toString())
      }
      router.push(`${pathname}?${searchParams.toString()}`, { scroll: false })
    }
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
          onBlur={(e) => setParams(e, "min")}
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
          onBlur={(e) => setParams(e, "max")}
          type="text"
          inputMode="numeric"
        />
      </div>
    </li>
  )
}
