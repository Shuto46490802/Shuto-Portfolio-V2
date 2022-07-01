import React from "react"
import Head from "next/head"
//Components
import Footer2 from "../comps/PageLayout/Footer2"
import ProfileIntro from "../comps/Profile/ProfileIntro"
import ProfileSkill from "../comps/Profile/ProfileSkill"
import ProfileContact from "../comps/Profile/ProfileContact"
//Libraries
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <>
      <Head>
        <title>Shuto Suganuma | Profile</title>
      </Head>

      <motion.section
        className="profile"
        initial={{ visibility: 'hidden' }}
        animate={{ visibility: 'visible' }}
        exit={{ visibility: 'hidden' }}
        transition={{ ease: "none", duration: 0, delay: 1.3 }}
      >
        <div className="profile__inner">
          <ProfileIntro />
          <ProfileSkill />
          <ProfileContact />
          <Footer2 />
        </div>
      </motion.section>
    </>
  )
}

export default Profile