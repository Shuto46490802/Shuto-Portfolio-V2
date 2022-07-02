import React, { Suspense, useEffect, useRef, useState } from "react"
//Components
import Link from "../PageLayout/Link"
import { onMouseMoveTranslate, onMouseLeaveTranslateScale } from "../PageLayout/animations"
//Context
import { useGlobalStates } from "../context/global-states";
//Libraries
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import HomeProfileImage from "./WebGL/HomeProfile/Image";
import { useSpring } from '@react-spring/three';

const HomeProfile = () => {

    const imageWrapperRef = useRef()
    const GLContainerRef = useRef()
    const { getGLSize, isTouch, getParams, wrapperOffsetContent, GLColor, isPageReady } = useGlobalStates()
    const [isHovered, setIsHovered] = useState(false)
    const titleRef = useRef()
    const [titleParam, setTitleParam] = useState()
    const [props, set] = useSpring(() => ({
        position: [0, 0, -1],
        rotation: [0, 0, 0.05],
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    }));
    const [isHoverReady, setIsHoverReady] = useState(false)

    useEffect(() => {
        getGLSize(imageWrapperRef.current, GLContainerRef.current)
        setTitleParam(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
        window.addEventListener("resize", () => {
            getGLSize(imageWrapperRef.current, GLContainerRef.current)
            setTitleParam(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
        })
        window.addEventListener("scroll", () => {
            setTitleParam(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
        })
        return () => {
            window.removeEventListener("resize", () => {
                getGLSize(imageWrapperRef.current, GLContainerRef.current)
                setTitleParam(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
            })
            window.removeEventListener("scroll", () => {
                setTitleParam(getParams({ els: titleRef.current, offset: wrapperOffsetContent }))
            })
        }
    }, [wrapperOffsetContent])

    return (
        <section className="home-profile">
            <div className="section-title__wrapper">
                <span className="frame-top grow frame-line" />
                <span className="frame-bottom grow frame-line" />

                <svg height="100%" width="100%" className="section-titile-spacer">
                    <rect style={{ fill: "url(#star-pattern-1)" }} x="0" y="0" height="100%" width="100%"></rect>
                </svg>
                <h2 className="section-title text-serif">
                    profile
                    <span className="frame-left grow frame-line" />
                </h2>
            </div>
            <div
                className={`home-profile-content__wrapper d-flex ${isHovered ? "is-active" : ""}`}
            >
                <div ref={imageWrapperRef} className="home-profile-image__wrapper">
                    <div ref={GLContainerRef} className="home-profile-image">
                        <div className="web-gl__wrapper">
                            <Canvas
                                camera={{ position: [0, 0, 825] }}
                                linear={true}
                            >
                                <Suspense
                                    fallback={<Html center className="loading" children="" />}
                                >
                                    <HomeProfileImage color={GLColor} imageWrapperRef={imageWrapperRef} setIsHoverReady={setIsHoverReady} isPageReady={isPageReady} {...props} />
                                </Suspense>
                            </Canvas>
                        </div>
                    </div>
                </div>
                <Link href="/profile" ariaLabel={"Profile"} scroll={false}>
                    <a
                        className="home-profile-link text-mode"
                        onMouseOver={() => {
                            if (!isTouch && isHoverReady) {
                                setIsHovered(true)
                            }
                        }}
                        onMouseMove={(e) => {
                            if (!isTouch && isHoverReady) {
                                onMouseMoveTranslate(e, titleRef.current, titleParam[0], 15, 20, wrapperOffsetContent.x, wrapperOffsetContent.y);
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
                                setIsHovered(false)
                                onMouseLeaveTranslateScale(titleRef.current)
                                set({
                                    position: [0, 0, -1],
                                    rotation: [0, 0, 0.05],
                                })
                            }
                        }}
                    >
                        <h2 ref={titleRef} className="home-profile-link-text should-animate stroke-theme text-serif">
                            profile
                        </h2>
                    </a>
                </Link>
                <div className="home-profile-subtitle__wrapper d-none d-md-flex flex-column position-relative">
                    <span className="frame-left grow frame-line" />
                    <p className="home-profile-subtitle">
                        Thank you so much for visiting my portfolio website. I hope you enjoyed it and got to know me.
                    </p>
                    <p className="home-profile-subtitle">
                        Now that you already know me, it is time to start building something amazing and achieving your goals together with me.
                        <br />
                        Click the address below and say hi.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default HomeProfile;