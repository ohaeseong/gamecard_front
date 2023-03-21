import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>GAMECARD.GG</title>
        
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9902915188733725"
          crossOrigin="anonymous"
        />
      </Head>

      
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-YBDDHMVVG2%22%3E"
      />
      <Script id="help-scout-script">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YBDDHMVVG2');`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}