// src/lib/usePlausibleEvent.ts
import { useCallback } from "react";

export function usePlausibleEvent() {
  const track = useCallback((event: string, props: Record<string, any> = {}) => {
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible(event, { props });
    } else {
      console.log("Plausible event (dev mode):", event, props);
    }
  }, []);

  return { track };
}
