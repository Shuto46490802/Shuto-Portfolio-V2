import React, { Suspense, useEffect, useRef, useState } from "react"
//Components
import Link from "../PageLayout/Link"
//Libraries
import { Canvas } from "@react-three/fiber";
import WorkImage from "./WebGL/OtherWorks/WorkImage";
import { useSpring } from '@react-spring/three';
import { Html } from "@react-three/drei";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
//Context
import { useGlobalStates } from "../context/global-states";
import { onMouseMoveTranslate, onMouseLeaveTranslateScale, getCharOffset, charsEnter, charsExit, onMouseMoveTranslateScale } from "../PageLayout/animations";

const OtherWorks = ({ works }) => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, [])

    const { GLColor, getGLSize, getParams, isTouch, wrapperOffsetContent, color, isEntering } = useGlobalStates()
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

    //Title animation
    const titleRef = useRef()
    const [titleParams, setTitleParams] = useState()
    const [isHovered, setIsHovered] = useState(false)

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
            <span key={index} ref={addToCharRefs} className="other-works-title-char should-animate">{char}</span>
        ))
    }

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

    useEffect(() => {
        getGLSize(imageWrapperRef.current, GLContainerRef.current)
        setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
        setTitleParams(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
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

    useEffect(() => {
        if (!isEntering) {
            getCharOffset(charRefs.current, color, imageWrapperRef.current)
        }
    }, [isEntering])

    useEffect(() => {
        if (isFirstDone) {
            if (isCharsExiting) {
                charsExit(charRefs.current, color);
            } else {
                charsEnter(charRefs.current, color);
            }
        }
    }, [isCharsExiting])

    return (
        <div className={`other-works ${isHovered ? "is-active" : ""}`}>
            <Link href={"/works/[slug]"} as={`/works/${works[imgIndex]["slug"]}`} ariaLabel={`${works[imgIndex]["title"]}`} scroll={false}>
                <a
                    className="other-works-link text-mode"
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
                    <h2 className="other-works-header">Other Works</h2>
                    <div className="other-works-link__inner">
                        <div className="other-works-title__wrapper">
                            <p ref={titleRef} className="other-works-title">
                                {
                                    wrapInspan(works[titleIndex]["title"])
                                }
                            </p>
                        </div>
                        <div ref={imageWrapperRef} className="other-works-image__wrapper">
                            <div ref={GLContainerRef} className="other-works-image__inner">
                                <div className="web-gl__wrapper">
                                    <Canvas
                                        camera={{ position: [0, 0, 825] }}
                                        linear={true}
                                    >
                                        <Suspense
                                            fallback={<Html center className="loading" children="" />}
                                        >
                                            <WorkImage works={works} color={GLColor} imgIndex={imgIndex} isUp={isUp} imageWrapperRef={imageWrapperRef} setIsFirstDone={setIsFirstDone} setIsHoverReady={setIsHoverReady} isEntering={isEntering} {...props} />
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
                onClick={() => {
                    toggleImageDown()
                }}
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
            >
                <span className="frame-top grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <span className="frame-right grow frame-line" />
                <span ref={addToArrownRefs} className="square-nav-button-arrow should-animate" />
            </button>
            <button
                className="square-nav-button square-nav-button-next"
                onClick={() => {
                    toggleImageUp()
                }}
                onMouseMove={(e) => {
                    if (!isTouch) {
                        onMouseMoveTranslateScale(e, arrowRefs.current[1], arrowParamsList[1], 5, 5, wrapperOffsetContent.x, wrapperOffsetContent.y, 0.8);
                    }
                }}
                onMouseLeave={() => {
                    onMouseLeaveTranslateScale(arrowRefs.current[1])
                }}
            >
                <span className="frame-top grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <span className="frame-left grow frame-line" />
                <span className="frame-right grow frame-line" />
                <span ref={addToArrownRefs} className="square-nav-button-arrow should-animate" />
            </button>
        </div>
    );
}

export default OtherWorks;