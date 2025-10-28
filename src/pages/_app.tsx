// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ClerkProvider {...pageProps}>
            <Head>
                <title>ApplyJet ✈️</title>
                <meta name="description" content="Your career. On autopilot." />
            </Head>

            {/* ✅ Correct Plausible Integration */}
            <Script
                strategy="afterInteractive"
                src="https://plausible.io/js/pa-exjLu42AswNM_XKS_SfXa.js"
            />

            <Script id="plausible-init" strategy="afterInteractive">
                {`
          window.plausible = window.plausible || function() {
            (window.plausible.q = window.plausible.q || []).push(arguments);
          };
        `}
            </Script>

            <Component {...pageProps} />
        </ClerkProvider>
    );
}

export default MyApp;
