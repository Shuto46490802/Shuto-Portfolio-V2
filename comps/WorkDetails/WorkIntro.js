import React, { useEffect } from "react"
import Image from "next/image"

const WorkIntro = ({ work }) => {

    return (
        <>
            <section className="work-details-intro">
                <span className="frame-bottom grow frame-line" />
                <div className="work-details-intro-image__wrapper">
                    <div className="work-details-intro-image bg-theme">
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
                    <div className="work-details-intro-text-date">
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
            <section className="work-details-intro-video__wrapper">
                <span className="frame-bottom grow frame-line" />
                <div className="work-details-intro-video__inner">
                    <span className="frame-right grow frame-line" />
                    <div className="work-details-intro-video bg-theme">
                        <figure className="fig__wrapper">
                            <video src={work["page content"]["main-video"]} muted loop playsInline autoPlay />
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