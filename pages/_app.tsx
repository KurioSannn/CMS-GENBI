// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from "react";

const BackgroundMusic = dynamic(
  () => import('@/components/BackgroundMusic'),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        {/* --- GLOBAL SEO --- */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="GenBI UPNVJT" />
        
        {/* Favicon & Icons */}
        <link rel="icon" href="/favicongenbiupnvj.png" type="image/png" />
        <link rel="shortcut icon" href="/favicongenbiupnvj.png" />
        <link rel="apple-touch-icon" href="/favicongenbiupnvj.png" />
        
        {/* Theme Color untuk Browser Mobile */}
        <meta name="theme-color" content="#0B1F40" />
      </Head>
      
      {isClient && <BackgroundMusic />}
      <Component {...pageProps} />
    </>
  );
}