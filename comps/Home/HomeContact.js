import React, { useEffect, useRef, useState } from "react"
//Components
import Link from "../PageLayout/Link"
import { onMouseMoveTranslate, onMouseLeaveTranslateScale, animateContact, animateContactLoop } from "../PageLayout/animations"
//Context
import { useGlobalStates } from "../context/global-states";

const HomeContact = () => {

    const request = useRef();
    const autoScrollerInner = useRef();
    const autoScrollerText = useRef();
    const offsetX = useRef(0);
    const autoScroller = useRef();
    const { getParams, isTouch, wrapperOffsetContent } = useGlobalStates()
    const [params, setParams] = useState()
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        request.current = requestAnimationFrame(animateContactLoop)
        return () => {
            cancelAnimationFrame(request.current);
        }
    }, [])

    useEffect(() => {
        setParams(getParams({ els: autoScroller.current, offset: wrapperOffsetContent }))
        window.addEventListener("resize", () => {
            setParams(getParams({ els: autoScroller.current, offset: wrapperOffsetContent }))
        })
        window.addEventListener("scroll", () => {
            setParams(getParams({ els: autoScroller.current, offset: wrapperOffsetContent }))
        })

        return () => {
            window.removeEventListener("resize", () => {
                setParams(getParams({ els: autoScroller.current, offset: wrapperOffsetContent }))
            })
            window.removeEventListener("scroll", () => {
                setParams(getParams({ els: autoScroller.current, offset: wrapperOffsetContent }))
            })
        }
    }, [wrapperOffsetContent])

    const animateContact = () => {

        if (autoScrollerText.current) {
            if (offsetX.current <= autoScrollerText.current.clientWidth) {
                offsetX.current = offsetX.current + 1.5
                autoScrollerInner.current.style.transform = `translate3d(-${offsetX.current}px, 0px, 0px)`
            }
        }
    }


    const animateContactLoop = () => {
        if (autoScrollerText.current) {
            if (offsetX.current >= autoScrollerText.current.clientWidth) {
                offsetX.current = 0
            }
        }

        animateContact()
        request.current = requestAnimationFrame(animateContactLoop)
    }

    return (
        <section className="home-contact">
            <div
                className={`home-contact-address__wrapper ${isHovered ? "is-active" : ""}`}
                onMouseMove={(e) => {
                    if (!isTouch) {
                        onMouseMoveTranslate(e, autoScroller.current, params[0], 20, 10, wrapperOffsetContent.x, wrapperOffsetContent.y);
                        setIsHovered(true)
                    }
                }}
                onMouseLeave={() => {
                    if (!isTouch) {
                        onMouseLeaveTranslateScale(autoScroller.current);
                        setIsHovered(false)
                    }
                }}
            >
                <span className="frame-top grow frame-line" />
                <div className="home-contact-address__inner" >
                    <Link href="mailto:hello@shutosuganuma.com" scroll={false} ariaLabel='mail'>
                        <a className="home-contact-address-link text-mode2" aria-label='mail'>
                            <div ref={autoScroller} className="home-contact-address-autoScroller should-animate">
                                <div ref={autoScrollerInner} className="home-contact-address-autoScroller__inner should-animate">
                                    <span ref={autoScrollerText} className="home-contact-address">
                                        <span className="home-contact-address-text stroke-theme">
                                            hello@shutosuganuma.com
                                        </span>
                                    </span>
                                    <span className="home-contact-address">
                                        <span className="home-contact-address-text stroke-theme">
                                            hello@shutosuganuma.com
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HomeContact;