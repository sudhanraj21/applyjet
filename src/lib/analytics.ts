// src/lib/analytics.ts

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

// Generic event tracking helper for Plausible
export const trackEvent = (event: string, props?: Record<string, string>) => {
  if (typeof window !== "undefined" && window.plausible) {
    // ✅ Only include props if defined
    window.plausible(event, props ? { props } : undefined);
  }
};
