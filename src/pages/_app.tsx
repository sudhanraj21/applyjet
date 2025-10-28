// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import Plausible from "@plausible-analytics/tracker";
import "../styles/globals.css";

// Initialize Plausible Analytics only on the client side
if (typeof window !== "undefined") {
    Plausible({
        domain: "applyjet.vercel.app", // 🔹 your live domain
        apiHost: "https://plausible.io",
    });
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ClerkProvider {...pageProps}>
            <Head>
                <title>ApplyJet</title>
                <meta name="description" content="Your career. On autopilot." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </ClerkProvider>
    );
}

export default MyApp;
