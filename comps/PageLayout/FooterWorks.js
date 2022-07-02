import React, { Suspense, useEffect, useRef, useState } from "react"
//Components
import workList from "./WorkList"
import WorkImage from "./WebGL/Works/WorkImage"
import { onMouseMoveTranslateScale, onMouseLeaveTranslateScale, onMouseMoveTranslate, getCharOffset, charsEnter, charsExit } from "../PageLayout/animations"
import Link from "../PageLayout/Link"
import { useGlobalStates } from "../context/global-states"
//Libraries
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring } from '@react-spring/three';

const FooterWorks = () => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, [])

    const { wrapperOffsetContent, getParams, isTouch, getGLSize, GLColor, color, isPageReady } = useGlobalStates()
    const works = workList.works

    //Text transform
    const titleRef = useRef()
    const [titleParams, setTitleParams] = useState()
    const [isHovered, setIsHovered] = useState(false)

    //Arrow transform
    const arrowRefs = useRef([]);
    const addToArrownRefs = (_el) => {
        if (_el && !arrowRefs.current.includes(_el)) {
            arrowRefs.current.push(_el)
        } else {
            arrowRefs.current = [];
        }
    };
    const [arrowParamsList, setArrowParamsList] = useState();

    //Char animation
    const [isCharsExiting, setIsCharsExiting] = useState(false)
    const [isFirstDone, setIsFirstDone] = useState(false)
    const charRefs = useRef([]);
    const addToCharRefs = (_el) => {
        if (_el && !charRefs.current.includes(_el)) {
            charRefs.current.push(_el)
        } else {
            charRefs.current = [];
        }
    };

    const wrapInspan = (text) => {
        return text.split("").map((char, index) => (
            <span key={index} ref={addToCharRefs} className="footer-works-title-char should-animate">{char}</span>
        ))
    }

    //GL
    const imageWrapperRef = useRef()
    const GLContainerRef = useRef()
    const [props, set] = useSpring(() => ({
        position: [0, 0, -1],
        rotation: [0, 0, 0.05],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));
    const [isHoverReady, setIsHoverReady] = useState(false)
    const [imgIndex, setImgIndex] = useState(0)
    const [titleIndex, setTitleIndex] = useState(0)
    const [isUp, setIsUp] = useState(false)

    const toggleImageUp = () => {
        if (works.length - 1 > imgIndex) {
            setImgIndex(imgIndex + 1)
            setIsCharsExiting(true);
            setTimeout(() => {
                setTitleIndex(titleIndex + 1)
                setIsCharsExiting(false);
            }, 800)
        } else {
            setImgIndex(0)
            setIsCharsExiting(true);
            setTimeout(() => {
                setTitleIndex(0)
                setIsCharsExiting(false);
            }, 800)
        }
        setIsUp(true)
    }

    const toggleImageDown = () => {
        if (imgIndex > 0) {
            setImgIndex(imgIndex - 1)
            setIsCharsExiting(true);
            setTimeout(() => {
                setTitleIndex(imgIndex - 1)
                setIsCharsExiting(false);
            }, 800)
        } else {
            setImgIndex(works.length - 1);
            setIsCharsExiting(true);
            setTimeout(() => {
                setTitleIndex(works.length - 1)
                setIsCharsExiting(false);
            }, 800)
        }
        setIsUp(false)
    }

    useEffect(() => {
        if (isPageReady) {
            getCharOffset(charRefs.current, color, imageWrapperRef.current)
        }
    }, [isPageReady])

    useEffect(() => {
        if (isFirstDone) {
            if (isCharsExiting) {
                charsExit(charRefs.current, color);
            } else {
                charsEnter(charRefs.current, color);
            }
        }
    }, [isCharsExiting])

    useEffect(() => {
        setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
        setTitleParams(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
        getGLSize(imageWrapperRef.current, GLContainerRef.current)
        window.addEventListener("resize", () => {
            setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
            setTitleParams(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
            getGLSize(imageWrapperRef.current, GLContainerRef.current)
        })
        window.addEventListener("scroll", () => {
            setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
            setTitleParams(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
        })
        return () => {
            window.removeEventListener("resize", () => {
                setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
                setTitleParams(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
                getGLSize(imageWrapperRef.current, GLContainerRef.current)
            })
            window.removeEventListener("scroll", () => {
                setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
                setTitleParams(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
            })
        }
    }, [wrapperOffsetContent])

    return (
        <div className={`footer-column ${isHovered ? "is-active" : ""}`}>
            <span className="frame-right grow frame-line" />
            <span className="frame-bottom grow frame-line" />
            <Link href={"/works/[slug]"} as={`/works/${works[imgIndex].slug}`}>
                <a
                    className="footer-works-link text-mode"
                    onMouseOver={(e) => {
                        if (!isTouch && isHoverReady) {
                            setIsHovered(true)
                        }
                    }}
                    onMouseMove={(e) => {
                        if (!isTouch && isHoverReady) {
                            onMouseMoveTranslate(e, titleRef.current, titleParams[0], 15, 20, wrapperOffsetContent.x, wrapperOffsetContent.y);
                            const x = (e.clientX / window.innerWidth) * 2 - 1
                            const y = -(e.clientY / window.innerHeight) * 2 + 1
                            set({
                                position: [x, 0, -1],
                                rotation: [-y * (Math.PI / 3) * 0.2, x * (Math.PI / 3) * 0.2, 0.05]
                            })
                        }
                    }}
                    onMouseLeave={() => {
                        if (!isTouch && isHoverReady) {
                            onMouseLeaveTranslateScale(titleRef.current)
                            setIsHovered(false)
                            set({
                                position: [0, 0, -1],
                                rotation: [0, 0, 0.05],
                            })
                        }
                    }}
                >
                    <h3 className="footer-works-header">
                        Works
                    </h3>
                    <div className="footer-works__wrapper">
                        <div className="footer-works__inner text-serif">
                            <p ref={titleRef} className="footer-works-title should-animate stroke-theme">
                                {wrapInspan(works[titleIndex].title)}
                            </p>
                        </div>
                        <div ref={imageWrapperRef} className="footer-works-image__wrapper">
                            <div ref={GLContainerRef} className="footer-works-image__inner">
                                <div className="web-gl__wrapper">
                                    <Canvas
                                        camera={{ position: [0, 0, 825] }}
                                        linear={true}
                                    >
                                        <Suspense
                                            fallback={<Html center className="loading" children="" />}
                                        >
                                            <WorkImage works={works} color={GLColor} imgIndex={imgIndex} isUp={isUp} imageWrapperRef={imageWrapperRef} setIsFirstDone={setIsFirstDone} setIsHoverReady={setIsHoverReady} isPageReady={isPageReady} {...props} />
                                        </Suspense>
                                    </Canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
            <button
                className="square-nav-button square-nav-button-prev"
                onMouseMove={(e) => {
                    if (!isTouch) {
                        onMouseMoveTranslateScale(e, arrowRefs.current[0], arrowParamsList[0], 5, 5, wrapperOffsetContent.x, wrapperOffsetContent.y, 0.8);
                    }
                }}
                onMouseLeave={() => {
                    if (!isTouch) {
                        onMouseLeaveTranslateScale(arrowRefs.current[0])
                    }
                }}
                onClick={() => {
                    toggleImageDown()
                }}
            >
                <span className="frame-top grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <span className="frame-right grow frame-line" />
                <span ref={addToArrownRefs} className="square-nav-button-arrow should-animate" />
            </button>
            <button
                className="square-nav-button square-nav-button-next"
                onMouseMove={(e) => {
                    if (!isTouch) {
                        onMouseMoveTranslateScale(e, arrowRefs.current[1], arrowParamsList[1], 5, 5, wrapperOffsetContent.x, wrapperOffsetContent.y, 0.8);
                    }
                }}
                onMouseLeave={() => {
                    if (!isTouch) {
                        onMouseLeaveTranslateScale(arrowRefs.current[1])
                    }
                }}
                onClick={() => {
                    toggleImageUp()
                }}
            >
                <span className="frame-top grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <span className="frame-left grow frame-line" />
                <span ref={addToArrownRefs} className="square-nav-button-arrow should-animate" />
            </button>
        </div>
    );
}

export default FooterWorks;