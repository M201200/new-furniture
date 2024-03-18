export function hasItem(storageKey: "cart" | "favorites", vendor_code: string) {
  const storageValues = localStorage.getItem(storageKey)
  if (!storageValues) return false
  const storage: string[] = JSON.parse(storageValues)
  return storage.some((entry) => entry === vendor_code)
}

export function getValues(
  storageKey: "theme" | "currency" | "cart" | "favorites"
) {
  if (!localStorage.getItem(storageKey)) return null
  switch (storageKey) {
    case "theme":
      return localStorage.getItem(storageKey) as Theme
      break
    case "currency":
      return localStorage.getItem(storageKey) as Currency
      break
    case "cart":
      return JSON.parse(localStorage.getItem(storageKey)!) as CartItem[]
      break
    case "favorites":
      return JSON.parse(localStorage.getItem(storageKey)!) as string[]
      break
    default:
      return localStorage.getItem(storageKey) as string | null
  }
}

export function addItem(
  key: "theme" | "currency" | "cart" | "favorites",
  code: string | CartItem
) {
  const storageValues = localStorage.getItem(key)
  if (key === "cart" || key === "favorites") {
    if (storageValues) {
      localStorage.setItem(
        key,
        JSON.stringify([...JSON.parse(storageValues || ""), code])
      )
    } else {
      localStorage.setItem(key, JSON.stringify([code]))
    }
  } else {
    localStorage.setItem(key, JSON.stringify(code))
  }
}

type GuestOrder = {
  vendor_code: string
  amount: number
}

export function removeItem(
  storageKey: "cart" | "favorites",
  vendor_code: string
) {
  if (storageKey === "cart") {
    const storageValues = JSON.parse(
      localStorage.getItem(storageKey)!
    ) as CartItem[]
    const filtered = storageValues.filter(
      (item) => item.vendor_code !== vendor_code
    )
    if (!filtered.length) {
      localStorage.removeItem(storageKey)
    } else {
      localStorage.setItem(storageKey, JSON.stringify(filtered))
    }
  } else {
    const storageValues = JSON.parse(
      localStorage.getItem(storageKey)!
    ) as string[]
    const filtered = storageValues.filter((code) => code !== vendor_code)
    !filtered.length
      ? localStorage.removeItem(storageKey)
      : localStorage.setItem(storageKey, JSON.stringify(filtered))
  }
}

export function removeCartItems(vendorCodes: string[]) {
  const storageValues = JSON.parse(localStorage.getItem("cart")!) as CartItem[]
  const filtered = storageValues.filter(
    (item) => !vendorCodes.includes(item.vendor_code)
  )
  if (!filtered.length) {
    localStorage.removeItem("cart")
  } else {
    localStorage.setItem("cart", JSON.stringify(filtered))
  }
}
