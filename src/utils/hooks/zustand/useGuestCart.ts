import { create } from "zustand"

import { getValues } from "@/utils/functions/LocalStorageActions"

type CartState = {
  entries: CartItem[] | null
  set: (items: CartItem[] | null) => void
  add: (item: CartItem) => void
  setAmount: (vendorCode: string, amount: number) => void
  remove: (vendorCode: string) => void
}

export const useGuestCart = create<CartState>()((set) => ({
  entries: window?.localStorage
    ? (getValues("cart") as CartItem[] | null)
    : null,
  set: (items) => set(() => ({ entries: items })),
  add: (item) =>
    set((state) => ({
      entries: state.entries ? [...state.entries, item] : [item],
    })),
  setAmount: (vendorCode, amount) =>
    set((state) => ({
      entries: state.entries?.map((item) =>
        item.vendor_code !== vendorCode ? item : { ...item, amount }
      ),
    })),
  remove: (vendorCode) =>
    set((state) => ({
      entries: state.entries
        ? state.entries.filter((i) => i.vendor_code !== vendorCode)
        : null,
    })),
}))
