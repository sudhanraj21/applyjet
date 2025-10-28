// src/lib/analytics.ts
declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Record<string, string> }) => void;
  }
}

export const trackEvent = (event: string, props?: Record<string, string>) => {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(event, { props });
  }
};
