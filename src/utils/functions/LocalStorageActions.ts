export function hasItem(storageKey: "kart" | "favorites", vendor_code: string) {
  const storageValues = localStorage.getItem(storageKey)
  if (!storageValues) return false
  const storage: string[] = JSON.parse(storageValues)
  return storage.some((entry) => entry === vendor_code)
}

export function getValues(
  storageKey: "theme" | "currency" | "kart" | "favorites"
) {
  if (!localStorage.getItem(storageKey)) return null
  else if (storageKey === "favorites" || storageKey === "kart")
    return JSON.parse(localStorage.getItem(storageKey)!) as string[]
  else return localStorage.getItem(storageKey) as Locale | Currency
}

export function addItem(
  key: "theme" | "currency" | "kart" | "favorites",
  code: string | string[]
) {
  const storageValues = localStorage.getItem(key)
  if (Array.isArray(code)) {
    localStorage.setItem(
      key,
      JSON.stringify([...JSON.parse(storageValues || ""), code])
    )
  } else {
    localStorage.setItem(key, JSON.stringify(code))
  }
}

export function removeItem(
  storageKey: "kart" | "favorites",
  vendor_code: string
) {
  const storageValues: string[] = JSON.parse(localStorage.getItem(storageKey)!)
  const filtered = storageValues.filter((code) => code !== vendor_code)
  if (!filtered.length) localStorage.removeItem(storageKey)
  else localStorage.setItem(storageKey, JSON.stringify(filtered))
}
