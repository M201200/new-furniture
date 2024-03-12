import { create } from "zustand"

import { getValues } from "@/utils/functions/LocalStorageActions"

type FavoritesState = {
  entries: string[] | null
  set: (items: string[] | null) => void
  add: (item: string) => void
  remove: (item: string) => void
}

export const useGuestFavorites = create<FavoritesState>()((set) => ({
  entries: window?.localStorage
    ? (getValues("favorites") as string[] | null)
    : null,
  set: (items) => set(() => ({ entries: items })),
  add: (item) =>
    set((state) => ({
      entries: state.entries ? [...state.entries, item] : [item],
    })),
  remove: (item) =>
    set((state) => ({
      entries: state.entries ? state.entries.filter((i) => i !== item) : null,
    })),
}))
