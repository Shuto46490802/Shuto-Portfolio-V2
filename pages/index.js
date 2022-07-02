import React from "react"
import Head from "next/head"
//components
import HomeIntro from "../comps/Home/HomeIntro"
import Homeworks from "../comps/Home/HomeWorks"
import HomeProfile from "../comps/Home/HomeProfile"
import HomeContact from "../comps/Home/HomeContact"
import Footer from "../comps/PageLayout/Footer"
//Libraries
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Head>
        <title>Shuto Suganuma | Home</title>
      </Head>

      <motion.section
        className="home"
        initial={{ visibility: 'hidden' }}
        animate={{ visibility: 'visible' }}
        exit={{ visibility: 'hidden' }}
        transition={{ ease: "none", duration: 0, delay: 1.3 }}
      >
        <div className="home__inner">
          <HomeIntro/>
          <Homeworks />
          <HomeProfile />
          <HomeContact />
          <Footer />
        </div>
      </motion.section>
    </>
  )
}

export default Home