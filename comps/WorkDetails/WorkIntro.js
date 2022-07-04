import React, { useEffect, useRef, useState } from "react"
import Link from "../PageLayout/Link"
import Image from "next/image"
//Libraries
import { gsap } from "gsap"
import { useInView } from 'react-intersection-observer';
//Context
import { useGlobalStates } from "../context/global-states"

const WorkIntro = ({ work }) => {

    const imageRef = useRef()
    const { isPageLoaded, isEntering } = useGlobalStates()
    const videoRef = useRef()
    const [ref, inView] = useInView();
    const [isLinkHovered, setIsLinkHovered] = useState(false)

    useEffect(() => {
        if (isPageLoaded) {
            if (!isEntering) {
                if (imageRef.current) {
                    gsap.to(imageRef.current,
                        {
                            opacity: 1,
                            duration: 0.4
                        })
                }
            }
        }
    }, [isPageLoaded, isEntering])

    useEffect(() => {
        if (inView) {
            if (videoRef.current) {
                gsap.to(videoRef.current,
                    {
                        opacity: 1,
                        duration: 0.4
                    })
            }
        }
    }, [inView])

    return (
        <>
            <section className="work-details-intro">
                <span className="frame-bottom grow frame-line" />
                <div className="work-details-intro-image__wrapper">
                    <div ref={imageRef} className="work-details-intro-image bg-theme">
                        <figure className="fig__wrapper">
                            <Image src={work["main-image"]} layout="fill" objectFit="cover" />
                        </figure>
                    </div>
                    <h1 className="work-details-intro-title text-serif">
                        <span className="frame-top grow frame-line d-md-none d-block" />
                        <span className="work-details-intro-title__inner">
                            {work["title"]}
                        </span>
                    </h1>
                </div>
                <div className="work-details-intro-text__wrapper">
                    <span className="frame-right grow frame-line" />
                    <div className="work-details-intro-text-date text-num">
                        {work["date"]}
                    </div>
                    <ul className="work-details-intro-text-roles">
                        {
                            work["page content"]["roles"].map((role, index) => (
                                <li key={index}>{role}</li>
                            ))
                        }
                        {
                            work["page content"]["technologies"].map((tech, index) => (
                                <li key={index}>{tech}</li>
                            ))
                        }
                    </ul>
                    <div
                        className={`work-details-intro-text-link__wrapper ${isLinkHovered ? "is-active" : ""}`}
                        onMouseEnter={() => {
                            setIsLinkHovered(true)
                        }}
                        onMouseLeave={() => {
                            setIsLinkHovered(false)
                        }}
                    >
                        <Link href={`${work["page content"]["link"]}`} scroll={false} ariaLabel={`${work["title"]}`}>
                            <a
                                className={`work-details-intro-text-link`}
                                target="_blank"
                            >
                                <span className="line-link">Launch Website</span>
                                <span className="launch-arrow">
                                    <span className="launch-arrow__inner" />
                                </span>
                            </a>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="work-details-intro-overview__wrapper">
                <span className="frame-bottom grow frame-line" />
                <div className="work-details-intro-overview__inner">
                    <span className="frame-right grow frame-line" />
                    <h2 className="work-details-intro-overview-title">
                        Overview
                    </h2>
                    <div className="work-details-intro-overview-body__wrapper">
                        {
                            work["page content"]["overview"].map((text, index) => (
                                <p key={index}>{text}</p>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section ref={ref} className="work-details-intro-video__wrapper">
                <span className="frame-bottom grow frame-line" />
                <div className="work-details-intro-video__inner">
                    <span className="frame-right grow frame-line" />
                    <div className="work-details-intro-video bg-theme">
                        <figure className="fig__wrapper">
                            <video ref={videoRef} src={work["page content"]["main-video"]} muted loop playsInline autoPlay />
                        </figure>
                    </div>
                </div>
                <div className="work-details-intro-video-spacer right d-md-block d-none">
                    <svg><use xlinkHref="#svgSlash" className="stroke-theme"></use></svg>
                </div>
            </section>
            <div className="work-details-spacer right">
                <span className="frame-left grow frame-line" />
                <svg height="100%" width="100%" className="section-titile-spacer">
                    <rect style={{ fill: "url(#diagonal-stripe-3)" }} x="0" y="0" height="100%" width="100%"></rect>
                </svg>
            </div>
        </>
    );
}

export default WorkIntro;