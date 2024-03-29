import '../styles/globals.css'

//add custom css
import '../styles/style.css'

// Head
import Head from 'next/head'

// Script
import Script from 'next/script'

//rsuite css
import 'rsuite/dist/rsuite.min.css';



function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        <title>Bitke</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="title" content="Bitke" />
        <meta name="author" content="Bitke" />
        <meta name="description" content="Bitke" />
        <meta name="keywords" content="Bitke" />


        <link type="text/css" href="/vendor/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet" />
        <link type="text/css" href="/css/swipe.css" rel="stylesheet" />
        <link type="text/css" href="/css/custom.css" rel="stylesheet" />

        
        
        {/* bootstrap cdn css and js */}
         <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" /> */}
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script> */}

  
   
      </Head> 

      <Script src="/vendor/popper.js/dist/umd/popper.min.js" strategy="beforeInteractive" />
      <Script src="/vendor/headroom.js/dist/headroom.min.js" strategy="beforeInteractive" />

      <Script src="/vendor/onscreen/dist/on-screen.umd.min.js" strategy="beforeInteractive" />

      <Script src="/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js" strategy="beforeInteractive" />
      <Script src="https://buttons.github.io/buttons.js" strategy="beforeInteractive" />

      <Script src="public/assets/js/swipe.js" strategy="beforeInteractive" />
      

      



      <Component {...pageProps} />
    </>
  )


}

export default MyApp
