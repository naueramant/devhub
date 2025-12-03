import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // Array of link hrefs
  _hasHydrated: boolean;
  isFavorite: (href: string) => boolean;
  toggleFavorite: (href: string) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      _hasHydrated: false,
      isFavorite: (href: string) => get().favorites.includes(href),
      toggleFavorite: (href: string) =>
        set((state) => ({
          favorites: state.favorites.includes(href)
            ? state.favorites.filter((f) => f !== href)
            : [...state.favorites, href],
        })),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "developer-hub-favorites",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
