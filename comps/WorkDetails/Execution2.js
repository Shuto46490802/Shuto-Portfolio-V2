import React, { useEffect, useRef } from "react"
//Libraries
import { useInView } from 'react-intersection-observer';
import { gsap } from "gsap";

const Execution2 = ({ num, content, side }) => {

    const [ref1, inView1] = useInView();
    const [ref2, inView2] = useInView();
    const videoRefs = useRef([]);
    const addToVideoRefs = (_el) => {
        if (_el && !videoRefs.current.includes(_el)) {
            videoRefs.current.push(_el)
        } else {
            videoRefs.current = [];
        }
    };

    useEffect(() => {
        if (inView1) {
            videoRefs.current[0].play()
            gsap.to(videoRefs.current[0],
                {
                    opacity: 1,
                    duration: 0.4
                })
        }

        if (inView2) {
            videoRefs.current[1].play()
            gsap.to(videoRefs.current[1],
                {
                    opacity: 1,
                    duration: 0.4
                })
        }
    }, [inView1, inView2])

    return (
        <>
            <section className={`work-details-execution ${side}`}>
                <span className="frame-top grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <div className="work-details-execution-text__wrapper">
                    <span className="frame-right grow frame-line" />
                    <h2 className="work-details-execution-index">Execution{num}</h2>
                    <p className="work-details-execution-title">
                        {content["title"]}
                    </p>
                </div>
                <div className="work-details-execution-video__wrapper">
                    <div className="work-details-execution-video__inner">
                        <div ref={ref1} className={`work-details-execution-video work-details-execution-video__1 bg-theme`}>
                            <span className="frame-top grow frame-line" />
                            <span className="frame-bottom grow frame-line" />
                            <figure className="fig__wrapper">
                                <video ref={addToVideoRefs} src={content["videos"][0]} muted loop playsInline />
                            </figure>
                        </div>
                        <div ref={ref2} className={`work-details-execution-video work-details-execution-video__2 bg-theme`}>
                            <span className="frame-top grow frame-line" />
                            <span className="frame-bottom grow frame-line" />
                            <figure className="fig__wrapper">
                                <video ref={addToVideoRefs} src={content["videos"][1]} muted loop playsInline />
                            </figure>
                        </div>
                    </div>
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

export default Execution2;