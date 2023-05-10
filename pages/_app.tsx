import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { DefaultSeo } from 'next-seo';
import SEO from 'seo.config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/** SEO */}
      <DefaultSeo {...SEO} />

      {/** GA https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-12J86731SG');
            `,
        }}
      />

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-12J86731SG`}
      />
      {/** Component */}
      <Component {...pageProps} />
    </>
  );
}
