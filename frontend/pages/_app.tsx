import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { DefaultSeo } from 'next-seo';
// import { useEventListener } from 'usehooks-ts';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { CustomCursor } from '../src/CustomCursor';
import { ThreePage } from '../src/ThreePage';
import { SiteData } from '../src/SiteData';
import { MobileVhAsCssVar } from '../src/MobileVhAsCssVar';
import { useConsoleLogDevSignature } from '../src/useConsoleLogDevSignature';
import { PlayAllVideosOnClickInLowPowerMode } from '../src/usePlayAllVideosOnClickInLowPowerMode';

function MyApp({ Component, pageProps }: AppProps) {
  const siteData:SiteData = {
    startingScene: pageProps.scene ?? 'error',
    projects: pageProps.projects ?? null,
  };

  useConsoleLogDevSignature();

  // useEventListener('focusin', (e) => {
  //   console.log('focused on', e.target);
  // });

  const title = 'Tushar Laad | Data Engineer & Software Architect';
  const description = 'Founding Software Engineer specializing in Data Engineering, ETL Development, API Development, and Cloud Computing. Passionate about building innovative data solutions.';
  const url = 'https://tusharlaad.com';

  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        canonical="https://tusharlaad.com"
        openGraph={{
          url,
          title,
          description,
          type: 'website',
          images: [
            {
              url: 'https://tusharlaad.com/images/social.png',
              width: 2333,
              height: 1313,
              alt: 'Tushar Laad - Data Engineer & Software Architect specializing in innovative data solutions.',
              type: 'image/png',
            },
          ],
          site_name: 'tusharlaad.com',
        }}
        twitter={{
          handle: '@tusharlaad',
          cardType: 'summary_large_image',
        }}
      />
      <GoogleAnalytics trackPageViews />
      <MobileVhAsCssVar />
      <ThreePage
        siteData={siteData}
      />
      <Component {...pageProps} />
      <CustomCursor />
      <PlayAllVideosOnClickInLowPowerMode />
    </>
  );
}

export default MyApp;
