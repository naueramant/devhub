import { useEffect, useState } from "react";
import { useFavoritesStore } from "../stores/favorites";
import { useSettingsStore } from "../stores/settings";

function HydrationGate({ children }: { children: React.ReactNode }) {
  const settingsHydrated = useSettingsStore((state) => state._hasHydrated);
  const favoritesHydrated = useFavoritesStore((state) => state._hasHydrated);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (settingsHydrated && favoritesHydrated) {
      // eslint-disable-next-line
      setIsReady(true);
    }
  }, [settingsHydrated, favoritesHydrated, setIsReady]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}

export default HydrationGate;
