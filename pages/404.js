import React from "react"
import Head from "next/head"
//Components
import ErrorContent from "../comps/Error/Content"
//Libraries
import { motion } from "framer-motion";

const Error = () => {
    return (
        <>
            <Head>
                <title>Shuto Portfolio | 404</title>
            </Head>
            <motion.section
                className="error"
                initial={{ visibility: 'hidden' }}
                animate={{ visibility: 'visible' }}
                exit={{ visibility: 'hidden' }}
                transition={{ ease: "none", duration: 0, delay: 1.3 }}
            >
                <div className="error__inner">
                    <ErrorContent />
                </div>
            </motion.section>
        </>
    )
}

export default Error