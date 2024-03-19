type Locale = "en" | "ro" | "ru"
type Currency = "USD" | "MDL" | "EUR"
type Theme = "dark" | "light"
type Rates = {
  EUR: number
  MDL: number
}
type CartItem = {
  vendor_code: string
  amount: number
}

type sortedCategory = {
  code: number
  name: string
  layer: number
  subcategory: sortedCategory[]
}

type Sizes = "Price" | "Height" | "Width" | "Depth"
type SizeSigns = "P" | "H" | "W" | "D"
