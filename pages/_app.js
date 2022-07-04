import React, { useRef, useState } from "react";
import Head from "next/head"
import { useRouter } from "next/router";
//Styles
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/index.scss';
import '../styles/app.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//Context
import { GlobalStatesProvider, useGlobalStates } from "../comps/context/global-states"
//Components
import Layout from '../comps/PageLayout/Layout'
//Libraries
import { AnimatePresence } from "framer-motion";

const MyApp = ({ Component, pageProps }) => {

  const router = useRouter()

  const scrollTop = () => {
    // if (!scrollToWorks) {
    setTimeout(() => {
      window.scroll({
        top: 1,
        left: 0
      });
    }, 500)
    // } else {
    //   if (homeIntroRef.current) {
    //     window.scroll({
    //       top: homeIntroRef.current.getBoundingClientRect().height,
    //       left: 0,
    //     });

    //     setTimeout(() => {
    //       setScrollToWorks(false)
    //     }, 100)
    //   }
    // }
  }

  return (
    <>
      <Head>
        <title>Shuto Suganuma</title>
        <meta name="description" content="This is the portfolio website of Shuto Suganuma, Front-End Web Developer. I'm very passionate about building an innovative and creative website that help you with your goals, and I will always do my best to live up to your expectations and think outside the box and face challenges with my passion and determination." />
        <meta name="copyright" content="(c) Shuto Suganuma." />
        <meta property="og:site_name" content="Shuto Suganuma Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shutosuganuma.com" />
        <meta property="og:title" content="Shuto Suganuma Portfolio" />
        <meta property="og:description" content="This is the portfolio website of Shuto Suganuma, Front-End Web Developer. I'm very passionate about building an innovative and creative website that help you with your goals, and I will always do my best to live up to your expectations and think outside the box and face challenges with my passion and determination." />
        <meta property="og:image" content="https://shutosuganuma.com/ogp.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shuto Suganuma Portfolio" />
        <meta name="twitter:description" content="This is the portfolio website of Shuto Suganuma, Front-End Web Developer. I'm very passionate about building an innovative and creative website that help you with your goals, and I will always do my best to live up to your expectations and think outside the box and face challenges with my passion and determination." />
        <meta name="twitter:image" content="https://shutosuganuma.com/ogp.jpg" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <GlobalStatesProvider>
        <Layout>
          <AnimatePresence
            exitBeforeEnter
            onExitComplete={() => {
              scrollTop();
            }}
          >
            <Component key={router.asPath} {...pageProps} />
          </ AnimatePresence>
        </Layout>
      </GlobalStatesProvider>
    </>
  )
}

export default MyApp
