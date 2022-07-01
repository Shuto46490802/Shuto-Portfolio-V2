import React, { Suspense, useEffect, useRef, useState } from "react"
//Libraries
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring } from '@react-spring/three';
//Context
import { useGlobalStates } from "../context/global-states";
import IntroImage from "./WebGL/ProfileIntro.js/IntroImage";
import SlideShowImage from "./WebGL/ProfileIntro.js/SlideShowImage";
//Components
import { onMouseMoveTranslate, onMouseLeaveTranslateScale } from "../PageLayout/animations"

const ProfileIntro = () => {

    const { GLColor, isTouch, getGLSize, getParams, wrapperOffsetContent, isEntering, isPageLoaded, isPageReady } = useGlobalStates()
    const imageWrapperRef = useRef()
    const GLContainerRef = useRef()
    const [props, set] = useSpring(() => ({
        position: [0, 0, -1],
        rotation: [0, 0, 0.05],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));
    const slideShowWrapper = useRef()
    const slideShowGLContainerRef = useRef()
    const [props2, set2] = useSpring(() => ({
        position: [0, 0, -1],
        rotation: [0, 0, -0.05],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));
    const [isHoverReady, setIsHoverReady] = useState(false)
    const [isHoverReady2, setIsHoverReady2] = useState(false)

    //Quote
    const quote = [
        "Passion",
        "and",
        "curiosity",
        "are",
        "the",
        "engine",
        "of",
        "achievement"
    ]
    const [isCharAnimReady, setIsCharAnimReady] = useState(false)
    const charWrapperRefs = useRef([]);
    const addToCharWrapperRefs = (_el) => {
        if (_el && !charWrapperRefs.current.includes(_el)) {
            charWrapperRefs.current.push(_el)
        } else {
            charWrapperRefs.current = [];
        }
    };

    const charRefs = useRef([]);
    const addToCharRefs = (_el) => {
        if (_el && !charRefs.current.includes(_el)) {
            charRefs.current.push(_el)
        } else {
            charRefs.current = [];
        }
    };

    const wrapInSpan = (arr) => {
        return arr.map((text, index) => {
            return (
                <p key={index} ref={addToCharWrapperRefs} className={`profile-slide-show-word profile-slide-show-word-${index} should-animate`}>
                    {text
                        .split("")
                        .map((char, key) => {
                            if (char === " ") {
                                char = String.fromCharCode(160)
                            }
                            return (
                                <span key={key} ref={addToCharRefs} className="profile-slide-show-word-char should-animate stroke-theme">{char}</span>
                            )
                        })}
                </p>
            )
        })
    };

    const getCharOffset = (_arr) => {

        return _arr
            .map((el) => {
                const randomX = Math.random() * 100 - 50;
                const randomY = Math.random() * 100 - 50;

                const randomTime = Math.random() * 0.6 + 2;

                el.style.transform = `translate3d(${randomX}%, ${randomY}%, 0px)`;
                el.style.transitionDelay = `${randomTime}s`;
            })

    };

    const [paramList, setParamList] = useState()

    useEffect(() => {
        getGLSize(imageWrapperRef.current, GLContainerRef.current)
        getGLSize(slideShowWrapper.current, slideShowGLContainerRef.current)
        getCharOffset(charRefs.current)
        window.addEventListener("resize", () => {
            getGLSize(imageWrapperRef.current, GLContainerRef.current)
            getGLSize(slideShowWrapper.current, slideShowGLContainerRef.current)
        })
        return () => {
            window.removeEventListener("resize", () => {
                getGLSize(imageWrapperRef.current, GLContainerRef.current)
                getGLSize(slideShowWrapper.current, slideShowGLContainerRef.current)
            })
        }
    }, [])

    useEffect(() => {
        setParamList(getParams({ els: charWrapperRefs.current, offset: wrapperOffsetContent }))
        window.addEventListener("resize", () => {
            setParamList(getParams({ els: charWrapperRefs.current, offset: wrapperOffsetContent }))
        })
        window.addEventListener("scroll", () => {
            setParamList(getParams({ els: charWrapperRefs.current, offset: wrapperOffsetContent }))
        })
        return () => {
            window.removeEventListener("resize", () => {
                setParamList(getParams({ els: charWrapperRefs.current, offset: wrapperOffsetContent }))
            })
            window.removeEventListener("scroll", () => {
                setParamList(getParams({ els: charWrapperRefs.current, offset: wrapperOffsetContent }))
            })
        }
    }, [wrapperOffsetContent])


    return (
        <div className="profile-intro">
            <div className="profile-intro-image__wrapper">
                <div
                    ref={imageWrapperRef} className="profile-intro-image__container"
                    onMouseMove={(e) => {
                        if (!isTouch && isHoverReady) {
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
                            set({
                                position: [0, 0, -1],
                                rotation: [0, 0, 0.05],
                            })
                        }
                    }}
                >
                    <div ref={GLContainerRef} className="profile-intro-image-gl__wrapper">
                        <div className="web-gl__wrapper">
                            <Canvas
                                camera={{ position: [0, 0, 825] }}
                                linear={true}
                            >
                                <Suspense
                                    fallback={<Html center className="loading" children="" />}
                                >
                                    <IntroImage color={GLColor} setIsHoverReady={setIsHoverReady} isPageLoaded={isPageLoaded} isEntering={isEntering} {...props} />
                                </Suspense>
                            </Canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-intro-text__wrapper">
                <span className="frame-right grow frame-line" />
                <h1 className="profile-intro-header">
                    Shuto Suganuma
                </h1>
                <div className="profile-intro-subtitle__wrapper">
                    <p>
                        Hello,
                        <br />
                        I'm Shuto Suganuma, Sydney-based Japanese guy, specializing in Front-end web development.
                        <br />
                        I have been learning Front-end development since February 2019 and my goal is to become a develper who can help people achieve their goals.
                        <br />
                        When creating a website, I come up with ideas based on data, combine enthusiasm with curiosity to build an innovative and creative website that help you with your goals.
                        <br />
                        I will always do my best to live up to your expectations and think outside the box and face challenges with my passion and determination.
                        <br />
                        Thanks for your time.
                    </p>
                </div>
            </div>
            <div className="profile-intro-slideshow__wrapper">
                <div className="profile-intro-slideshow__container">
                    <div
                        ref={slideShowWrapper}
                        className="profile-intro-slideshow-gl__wrapper"
                    >
                        <div ref={slideShowGLContainerRef} className="profile-intro-slideshow">
                            <div className="web-gl__wrapper">
                                <Canvas
                                    camera={{ position: [0, 0, 825] }}
                                    linear={true}
                                >
                                    <Suspense
                                        fallback={<Html center className="loading" children="" />}
                                    >
                                        <SlideShowImage color={GLColor} slideShowWrapper={slideShowWrapper} setIsCharAnimReady={setIsCharAnimReady} setIsHoverReady2={setIsHoverReady2} isPageReady={isPageReady} {...props2} />
                                    </Suspense>
                                </Canvas>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`profile-intro-slideshow-gl__wrapper-copy ${isCharAnimReady ? "is-playing" : ""}`}
                        onMouseMove={(e) => {
                            if (!isTouch && isHoverReady2) {
                                const x = (e.clientX / window.innerWidth) * 2 - 1
                                const y = -(e.clientY / window.innerHeight) * 2 + 1
                                set2({
                                    position: [x, 0, -1],
                                    rotation: [-y * (Math.PI / 3) * 0.2, x * (Math.PI / 3) * 0.2, -0.05]
                                })
                                charWrapperRefs.current.map((wrapper, index) => {
                                    onMouseMoveTranslate(e, wrapper, paramList[index], 20, 15, wrapperOffsetContent.x, wrapperOffsetContent.y);
                                })
                            }
                        }}
                        onMouseLeave={() => {
                            if (!isTouch && isHoverReady2) {
                                set2({
                                    position: [0, 0, -1],
                                    rotation: [0, 0, -0.05],
                                })
                                charWrapperRefs.current.map((wrapper, index) => {
                                    onMouseLeaveTranslateScale(wrapper);
                                })
                            }
                        }}
                    >
                        {wrapInSpan(quote)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileIntro;