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
