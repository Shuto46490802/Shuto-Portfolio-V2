import React, { useEffect, useRef, useState } from "react"
import { useGlobalStates } from "../context/global-states";
import { onMouseLeaveTranslateRotate, onMouseMoveTranslateRotate } from "../PageLayout/animations";
import Link from "../PageLayout/Link";

const ProfileContact = () => {

    //Animate Loop
    const request = useRef()
    const autoScrollerInnerRefs = useRef([]);
    const addToAutoScrollerInnerRefs = (_el) => {
        if (_el && !autoScrollerInnerRefs.current.includes(_el)) {
            autoScrollerInnerRefs.current.push(_el)
        } else {
            autoScrollerInnerRefs.current = [];
        }
    };

    const autoScrollerTextRefs = useRef([]);
    const addToAutoScrollerTextRefs = (_el) => {
        if (_el && !autoScrollerTextRefs.current.includes(_el)) {
            autoScrollerTextRefs.current.push(_el)
        } else {
            autoScrollerTextRefs.current = [];
        }
    };
    const offsetX0 = useRef();
    const offsetX1 = useRef(null);
    const offsetX2 = useRef();
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        request.current = requestAnimationFrame(animateLoop);
        offsetX0.current = 0;
        offsetX1.current = -autoScrollerTextRefs.current[1].clientWidth;
        offsetX2.current = 0;
    }, [])

    const animate = () => {
        if (autoScrollerTextRefs.current) {
            autoScrollerTextRefs.current.map((el, index) => {
                if (index === 0) {
                    if (offsetX0.current <= el.clientWidth) {
                        offsetX0.current = offsetX0.current + 1.5;
                        autoScrollerInnerRefs.current[index].style.transform = `translate3d(-${offsetX0.current}px, 0px, 0px)`
                    }
                } else if (index === 1) {
                    if (offsetX1.current <= 0) {
                        offsetX1.current = offsetX1.current + 1.5;
                        autoScrollerInnerRefs.current[index].style.transform = `translate3d(${offsetX1.current}px, 0px, 0px)`
                    }
                } else {
                    if (offsetX2.current <= el.clientWidth) {
                        offsetX2.current = offsetX2.current + 1.5;
                        autoScrollerInnerRefs.current[index].style.transform = `translate3d(-${offsetX2.current}px, 0px, 0px)`
                    }
                }
            })
        }
    }

    const animateLoop = () => {
        if (autoScrollerTextRefs.current) {
            autoScrollerTextRefs.current.map((el, index) => {
                if (index === 0) {
                    if (offsetX0.current >= el.clientWidth) {
                        offsetX0.current = 0
                    }
                } else if (index === 1) {
                    if (offsetX1.current >= 0) {
                        offsetX1.current = -el.clientWidth
                    }
                } else {
                    if (offsetX2.current >= el.clientWidth) {
                        offsetX2.current = 0
                    }
                }
            })
        }

        animate()
        request.current = requestAnimationFrame(animateLoop)
    }

    const texts = [
        <>
            <span className="profile-contact-autoScroller-text__inner">
                get in touch get in touch
            </span>
        </>,
        <>
            <span className="profile-contact-autoScroller-text__inner">
                Let's work together.
            </span>
        </>,
        <>
            <span className="profile-contact-autoScroller-text__inner">
                @shuto
                <span className="profile-contact-underscore">_</span>
                suganuma
            </span>
        </>
    ]

    //Text hover animation
    const autoScrollerRefs = useRef([]);
    const addToAutoScrollerRefs = (_el) => {
        if (_el && !autoScrollerRefs.current.includes(_el)) {
            autoScrollerRefs.current.push(_el)
        } else {
            autoScrollerRefs.current = [];
        }
    };
    const [paramsList, setParamsList] = useState()
    const { isTouch, wrapperOffsetContent, getParams } = useGlobalStates()

    useEffect(() => {
        setParamsList(getParams({ els: autoScrollerRefs.current, offset: wrapperOffsetContent }))
        window.addEventListener("resize", () => {
            setParamsList(getParams({ els: autoScrollerRefs.current, offset: wrapperOffsetContent }))
        })
        window.addEventListener("scroll", () => {
            setParamsList(getParams({ els: autoScrollerRefs.current, offset: wrapperOffsetContent }))
        })
        return () => {
            window.removeEventListener("resize", () => {
                setParamsList(getParams({ els: autoScrollerRefs.current, offset: wrapperOffsetContent }))
            })
            window.removeEventListener("scroll", () => {
                setParamsList(getParams({ els: autoScrollerRefs.current, offset: wrapperOffsetContent }))
            })
        }
    }, [wrapperOffsetContent])

    return (
        <div
            className={`profile-contact ${isHovered ? "is-active" : ""}`}
            onMouseOver={(e) => {
                if (!isTouch) {
                    setIsHovered(true)
                }
            }}
            onMouseLeave={() => {
                if (!isTouch) {
                    setIsHovered(false)
                    autoScrollerRefs.current.map((el) => {
                        onMouseLeaveTranslateRotate(el)
                    })
                }
            }}
            onMouseMove={(e) => {
                if (!isTouch) {
                    autoScrollerRefs.current.map((el, index) => {
                        onMouseMoveTranslateRotate(e, el, paramsList[index], 20, 10, wrapperOffsetContent.x, wrapperOffsetContent.y)
                    })
                }
            }}
        >
            <span className="frame-top grow frame-line" />
            <Link href="mailto:hello@shutosuganuma.dev" scroll={false} ariaLabel='mail'>
                <a className="profile-contact-link text-mode2">
                    <div className="profile-contact-link__inner">
                        {
                            texts.map((text, index) => (
                                <div ref={addToAutoScrollerRefs} key={index} className="profile-contact-autoScroller should-animate">
                                    <div ref={addToAutoScrollerInnerRefs} className="profile-contact-autoScroller__inner should-animate stroke-theme text-serif">
                                        <span ref={addToAutoScrollerTextRefs} className="profile-contact-autoScroller-text">
                                            {text}
                                        </span>
                                        <span className="profile-contact-autoScroller-text">
                                            {text}
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </a>
            </Link>
        </div>
    );
}

export default ProfileContact;