import { create } from "zustand"

type PreferencesState = {
  locale: Locale
  currency: Currency
  theme: Theme
  setLocale: (locale: Locale) => void
  setCurrency: (currency: Currency) => void
  setTheme: (theme: Theme) => void
}

export const usePreferences = create<PreferencesState>()((set) => ({
  locale: "en",
  currency: "USD",
  theme: "light",
  setLocale: (locale) => set(() => ({ locale: locale })),
  setCurrency: (currency) => set(() => ({ currency: currency })),
  setTheme: (theme) => set(() => ({ theme: theme })),
}))
