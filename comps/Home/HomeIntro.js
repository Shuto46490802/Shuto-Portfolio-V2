import React, { Suspense, useEffect, useRef, useState } from "react"
//Libraries
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';
//Components
import IntroImage from "./WebGL/IntroImage/Image";
import { useGlobalStates } from "../context/global-states";
import { onMouseLeaveTranslateScale, onMouseMoveTranslate } from "../PageLayout/animations";

const HomeIntro = ({ homeIntroRef }) => {

    const textWrapperRef = useRef()
    const imgWrapperRef = useRef()
    const quoteWrapperRef = useRef()
    const GLContainer = useRef()
    const GLWrapper = useRef()
    const [GLParams, setGLParams] = useState({})
    const { GLColor, isTouch, getParams, wrapperOffsetContent, isPageLoaded, isEntering } = useGlobalStates()

    useEffect(() => {
        onResize()
        getCharOffset(charRefs.current)
        setTextParams(getParams({ els: textRefs.current, offset: wrapperOffsetContent }))
        window.addEventListener("resize", () => {
            onResize()
            setTextParams(getParams({ els: textRefs.current, offset: wrapperOffsetContent }))
        })
        window.addEventListener("scroll", () => {
            onResize()
            setTextParams(getParams({ els: textRefs.current, offset: wrapperOffsetContent }))
        })
        return () => {
            window.removeEventListener("resize", () => {
                onResize()
                setTextParams(getParams({ els: textRefs.current, offset: wrapperOffsetContent }))
            })
            window.removeEventListener("scroll", () => {
                onResize()
                setTextParams(getParams({ els: textRefs.current, offset: wrapperOffsetContent }))
            })
        }
    }, [wrapperOffsetContent])

    //GL
    const onResize = () => {
        const windowWidth = window.innerWidth
        if (textWrapperRef.current) {
            const wrapperHeight = 0
            if (windowWidth > 768) {
                wrapperHeight = windowWidth * 0.475
                textWrapperRef.current.style.height = wrapperHeight + "px"
            } else {
                wrapperHeight = windowWidth * 0.681
                textWrapperRef.current.style.height = "auto"
            }
            imgWrapperRef.current.style.height = wrapperHeight + "px"
            quoteWrapperRef.current.style.height = wrapperHeight + "px"
        }

        if (GLWrapper.current) {
            const containerParams = GLWrapper.current.getBoundingClientRect();
            setGLParams(containerParams)
        }
    }
    const [isHoverReady, setIsHoverReady] = useState(false)
    const [props, set] = useSpring(() => ({
        position: [0, 0, -1],
        rotation: [0, 0, -0.05],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));

    //Quote
    //Chars animation
    const quotes = [
        `It's all about the journey, not the outcome.`,
        `Success is the sum of small efforts, repeated day in and day out.`,
        `If at first I don’t succeed, try over and over again.`,
        `Never stop investing in my own growth and self-development.`,
        `I don’t wait for an opportunity to come, but create one.`
    ]
    const [elIndex, setElIndex] = useState(0);
    const charRefs = useRef([]);
    const addToCharRefs = (_el) => {
        if (_el && !charRefs.current.includes(_el)) {
            charRefs.current.push(_el)
        } else {
            charRefs.current = [];
        }
    };
    const textRefs = useRef([]);
    const addToTextRefs = (_el) => {
        if (_el && !textRefs.current.includes(_el)) {
            textRefs.current.push(_el)
        } else {
            textRefs.current = [];
        }
    };
    const [textParams, setTextParams] = useState([]);

    const wrapInSpan = (arr) => {
        return arr.map((quote, index) => {
            return (
                <div key={index} className={`quote-text quote_${String(index + 1)} ${elIndex === (index + 1) ? "is-playing" : ""}`}>
                    <p ref={addToTextRefs} className="quote-text__inner should-animate">
                        {quote
                            .split("")
                            .map((char, key) => {
                                if (char === " ") {
                                    char = String.fromCharCode(160)
                                }
                                return (
                                    <span key={key} ref={addToCharRefs} className="quote-char should-animate">{char}</span>
                                )
                            })}
                    </p>
                </div>
            )
        })
    };

    const getCharOffset = (arr) => {
        return arr
            .map((el) => {
                const randomX = Math.random() * 200 - 100;
                const randomY = Math.random() * 200 - 100;

                const randomTime = Math.random() * 0.6

                el.style.transform = `translate3d(${randomX}%, ${randomY}%, 0px)`;
                el.style.transitionDelay = `${randomTime}s`;
            })
    }

    useEffect(() => {
        if (isPageLoaded) {
            let counter = 0;

            const interval = setInterval(() => {

                if (counter === 5) {
                    counter = 1;
                    setElIndex(1);
                } else {
                    counter++;
                    setElIndex(elIndex => elIndex + 1);
                }

            }, 7000);

            return () => clearInterval(interval);
        }
    }, [isPageLoaded])

    return (
        <section ref={homeIntroRef} className="home-intro d-flex flex-wrap">
            <div ref={textWrapperRef} className="home-intro-text__wrapper position-relative">
                <span className="frame-right grow frame-line" />
                <div className="home-intro-text__inner">
                    <h1 className="home-intro-text-titile">
                        <span className="home-intro-text-titile-main">
                            Shuto Suganuma
                        </span>
                        <span className="home-intro-text-titile-sub">
                            Portfolio
                        </span>
                    </h1>
                    <div className="home-intro-img-spacer d-md-none d-block" />
                    <div className="home-intro-text-subtitle__wrapper">
                        <p className="home-intro-text-subtitle">
                            First of all, welcome to my portfolio website.
                            It's amazing to have you here.
                            My name is Shuto, I'm Japanese Front-end developer currently based in Sydney.
                        </p>
                        <p className="home-intro-text-subtitle">
                            I'm really passionate about building a website that helps you chieve you goals
                            and looking to land a job as Front-end developer.
                            I love learing new things and challenging myself to solve problems.
                            <br />
                            Enjoy your time here.
                        </p>
                    </div>
                </div>
            </div>
            <div
                ref={imgWrapperRef}
                className="home-intro-image__wrapper"
            >
                <div ref={GLContainer} className="home-intro-image__container">
                    <div ref={GLWrapper} className="home-logo-image-gl__wrapper">
                        <div className="web-gl__wrapper">
                            <Canvas
                                camera={{ position: [0, 0, 825] }}
                                linear={true}
                            >
                                <Suspense
                                    fallback={<Html center className="loading" children="" />}
                                >
                                    <IntroImage GLParams={GLParams} color={GLColor} setIsHoverReady={setIsHoverReady} isPageLoaded={isPageLoaded} isEntering={isEntering} {...props} />
                                </Suspense>
                            </Canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={quoteWrapperRef}
                className="quotes__wrapper"
                onMouseMove={(e) => {
                    if (!isTouch && isHoverReady) {
                        const x = (e.clientX / window.innerWidth) * 2 - 1
                        const y = -(e.clientY / window.innerHeight) * 2 + 1
                        set({
                            position: [x, 0, -1],
                            rotation: [-y * (Math.PI / 3) * 0.2, x * (Math.PI / 3) * 0.2, -0.05]
                        })
                        textRefs.current.map((el, index) => {
                            onMouseMoveTranslate(e, el, textParams[index], 20, 15, wrapperOffsetContent.x, wrapperOffsetContent.y);
                        })
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isTouch && isHoverReady) {
                        set({
                            position: [0, 0, -1],
                            rotation: [0, 0, -0.05],
                        })
                        textRefs.current.map((el) => {
                            onMouseLeaveTranslateScale(el);
                        })
                    }
                }}
            >
                <div className="quotes__inner">
                    {wrapInSpan(quotes)}
                </div>
            </div>
        </section>
    )
}

export default HomeIntro