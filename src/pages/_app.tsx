// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import "../styles/globals.css";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey={publishableKey} {...pageProps}>
      <Head>
        <title>ApplyJet</title>
        <meta name="description" content="Your career. On autopilot." />
      </Head>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
