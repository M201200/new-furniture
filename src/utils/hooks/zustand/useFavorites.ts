import { create } from "zustand"

type FavoritesState = {
  entries: string[] | null
  set: (items: string[] | null) => void
  add: (item: string) => void
  remove: (item: string) => void
}

export const useFavorites = create<FavoritesState>()((set) => ({
  entries: null,
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
