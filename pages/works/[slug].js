import React, { useEffect, useState } from "react"
import Head from "next/head"
//Components
import workList from "../../comps/PageLayout/WorkList";
import WorkIntro from "../../comps/WorkDetails/WorkIntro";
import Execution from "../../comps/WorkDetails/Execution";
import Execution2 from "../../comps/WorkDetails/Execution2";
import Footer from "../../comps/PageLayout/Footer";
import OtherWorks from "../../comps/WorkDetails/OtherWorks";
//Libraries
import { motion } from "framer-motion";

const Work = ({ workDetails }) => {

    const [work] = useState(workDetails[0])
    const [otherWorks] = useState(workList.works.filter((w) => w["title"] !== work["title"]))

    return (
        <>
            <Head>
                <title>Shuto Suganuma | {work.title}</title>
            </Head>

            <motion.section
                className="work-details"
                initial={{ visibility: 'hidden' }}
                animate={{ visibility: 'visible' }}
                exit={{ visibility: 'hidden' }}
                transition={{ ease: "none", duration: 0, delay: 1.3 }}
            >
                <div className="work-details__inner">
                    <WorkIntro work={work} />
                    <section className="work-details-executions">
                        <span className="frame-top grow frame-line" />
                        <span className="frame-bottom grow frame-line" />
                        <Execution num={"1"} content={work["page content"]["execution1"]} side={"left"} />
                        <Execution2 num={"2"} content={work["page content"]["execution2"]} side={"right"} />
                        <Execution num={"3"} content={work["page content"]["execution3"]} side={"left"} />
                        <OtherWorks works={otherWorks} />
                    </section>
                    <Footer />
                </div>
            </motion.section>
        </>
    );
}

export const getStaticPaths = async () => {
    const works = workList.works
    const paths = works.map((work) => {
        return {
            params: {
                slug: work.slug
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const works = workList.works
    const work = works.filter((work) => work.slug === params.slug)
    return {
        props: {
            workDetails: work
        }
    }
}

export default Work;