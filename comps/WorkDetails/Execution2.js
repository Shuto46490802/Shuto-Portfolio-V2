import React, { useEffect, useRef } from "react"
//Libraries
import { useInView } from 'react-intersection-observer';

const Execution2 = ({ num, content, side }) => {

    const { ref, inView } = useInView({});
    const videoRef = useRef()

    useEffect(() => {
        if(inView){
            videoRef.current.play()
        }
    }, [inView])

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
                <div ref={ref} className="work-details-execution-video__wrapper">
                    <div className="work-details-execution-video__inner">
                        {
                            content["videos"].map((video, index) => (
                                <div className={`work-details-execution-video work-details-execution-video__${index + 1} bg-theme`}>
                                    <span className="frame-top grow frame-line" />
                                    <span className="frame-bottom grow frame-line" />
                                    <figure className="fig__wrapper">
                                        <video ref={videoRef} src={video} muted loop playsInline />
                                    </figure>
                                </div>
                            ))
                        }
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