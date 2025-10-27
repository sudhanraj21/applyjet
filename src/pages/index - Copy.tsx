import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ApplyJet — Your Career. On Autopilot.</title>
        <meta
          name="description"
          content="ApplyJet finds, matches, and applies to jobs for you — while you focus on what matters."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      {/* Plausible Analytics */}
      <Script
        strategy="afterInteractive"
        data-domain="applyjet.co"
        src="https://plausible.io/js/script.js"
      />

      <Component {...pageProps} />
    </>
  )
}
