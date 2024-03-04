"use client"
import { useEffect, useState, useTransition } from "react"

import updatePreferredCurrency from "@/utils/actions/updatePreferredCurrency"
import { getValues } from "@/utils/functions/LocalStorageActions"

type CurrencySwitcherParams = {
  user_email?: string | null
  currentCurrency: Currency | null
}

export default function CurrencySwitcher({
  user_email,
  currentCurrency,
}: CurrencySwitcherParams) {
  const [currency, setCurrency] = useState<Currency | null>(currentCurrency)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const storage = getValues("currency") as Currency | null
    setCurrency(storage ? storage : "USD")
  }, [])

  return (
    <select
      title={"Currency"}
      className="w-full cursor-pointer bg-primary"
      name="currency select"
      value={currency || "USD"}
      onChange={(e) => {
        if (user_email) {
          startTransition(() => {
            updatePreferredCurrency(user_email, e.target.value as Currency)
          })
          setCurrency(e.target.value as Currency)
        } else {
          setCurrency(e.target.value as Currency)
          localStorage.setItem("currency", e.target.value)
        }
      }}
    >
      <option value="USD">{"USD"}</option>
      <option value="MDL">{"MDL"}</option>
      <option value="EUR">{"EUR"}</option>
    </select>
  )
}
