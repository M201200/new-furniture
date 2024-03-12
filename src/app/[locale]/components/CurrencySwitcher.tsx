"use client"
import { useEffect, useTransition } from "react"

import { useRouter } from "next/navigation"

import updatePreferredCurrency from "@/utils/actions/ProfileActions/updatePreferredCurrency"
import { getValues } from "@/utils/functions/LocalStorageActions"
import { usePreferences } from "@/utils/hooks/zustand/usePreferences"

type CurrencySwitcherParams = {
  user_email?: string | null
  currentCurrency: Currency | null
}

export default function CurrencySwitcher({
  user_email,
  currentCurrency,
}: CurrencySwitcherParams) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const currency = usePreferences((state) => state.currency)
  const setCurrency = usePreferences((state) => state.setCurrency)

  useEffect(() => {
    if (!user_email) {
      const storage = getValues("currency") as Currency | null
      setCurrency(storage ? storage : "USD")
    } else setCurrency(currentCurrency || "USD")
  }, [user_email, currentCurrency, setCurrency])

  return isPending ? (
    <span>Pending...</span>
  ) : (
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
        router.refresh()
      }}
    >
      <option value="USD">{"USD"}</option>
      <option value="MDL">{"MDL"}</option>
      <option value="EUR">{"EUR"}</option>
    </select>
  )
}
