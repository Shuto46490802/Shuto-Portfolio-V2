import React, { useEffect, useRef, useState } from "react"
//Components
import Frame from "./Frame"
import MenuBar from "./MenuBar"
import ColorPalette from "./ColorPalette"
import LocalTime from "./LocalTime"
import SVGDefs from "./SVGDefs"
import Cursor from "./Cursor"
import PageTransition from "./PageTransition"
//Libraries
import { gsap } from 'gsap';
import PreLoader from "./PreLoader"
import { useRouter } from "next/router"
//context
import { useGlobalStates } from "../context/global-states"

const Layout = ({ children, setScrollToWorks }) => {

    const pageTransitionMaterial = useRef();
    const pageTransition = useRef();
    const { setIsPageLoading, isPageLoading, setIsPageLoaded, setIsExiting, isExiting, setIsEntering, isEntering, setIsPageReady } = useGlobalStates()
    const router = useRouter()
    const [isRouteChangeComplete, setIsRouteChangeComplete] = useState(false)
    const [center, setCenter] = useState()

    const pageShow = () => {
        if (pageTransitionMaterial.current && pageTransition.current) {

            gsap.timeline({
                paused: false,
                onComplete: () => {
                    // localTime.current.style.zIndex = '5001';
                    // document.body.classList.add('isTransitionEnded');
                    if (isRouteChangeComplete) {
                        setIsRouteChangeComplete(false);
                    }
                    pageTransition.current.style.zIndex = '-1';
                    setIsPageLoaded(true)
                    document.body.classList.add('page-loaded');
                    setIsEntering(false)
                    setTimeout(() => {
                        setIsPageReady(true)
                    }, 500)
                },
                onStart: () => {
                    // setTimeout(() => {
                    //     setIsFirstAnimationReady(true);
                    // }, 800)
                    // if (!isGLFirstLoaded) {
                    //     pageTransitionCover.current.style.zIndex = '100';
                    // } else {
                    //     pageTransitionCover.current.style.zIndex = '85';
                    // }

                    // if (!setIsFirstAnimationReady) {
                    //     setTimeout(() => {
                    //         setIsFirstAnimationReady(true);
                    //     }, 800)
                    // }
                    pageTransition.current.style.zIndex = '100';
                }
            })
                .fromTo(pageTransitionMaterial.current.uniforms.animationValue,
                    {
                        value: 1,
                    },
                    {
                        duration: 1.3,
                        value: 0,
                        ease: 'none'
                    })
                .fromTo(pageTransitionMaterial.current.uniforms.ease,
                    {
                        value: 1,
                    },
                    {
                        duration: 1.3,
                        value: 0,
                        ease: 'none'
                    }, 0)

        }
    }

    const pageHide = () => {
        if (pageTransitionMaterial.current) {

            gsap.timeline({
                paused: false,
                onStart: () => {
                    pageTransition.current.style.zIndex = '100';
                    // document.body.classList.remove('isTransitionEnded');
                    setIsExiting(true)
                },
                onComplete: () => {
                    setIsExiting(false);
                    setIsEntering(true)
                }
            })
                .fromTo(pageTransitionMaterial.current.uniforms.animationValue,
                    {
                        value: 0,
                    },
                    {
                        duration: 1.3,
                        value: 1,
                        ease: 'none'
                    })
                .fromTo(pageTransitionMaterial.current.uniforms.ease,
                    {
                        value: 0,
                    },
                    {
                        duration: 1.3,
                        value: 1,
                        ease: 'none'
                    }, 0)

        }
    }

    const handlePageLoad = () => {
        setIsPageLoading(true)
        setTimeout(() => {
            setIsPageLoading(false)
            document.body.classList.add('is-ready');
            setTimeout(() => {
                pageShow()
            }, 2400)
        }, 3000)
    }

    useEffect(() => {
        handlePageLoad()
        router.events.on("routeChangeStart", () => {
            pageHide()
            setIsPageReady(false)
        })
        router.events.on("routeChangeComplete", () => {
            setIsRouteChangeComplete(true)
        })
    }, [])

    useEffect(() => {
        if (isEntering && isRouteChangeComplete) {
            setTimeout(() => {
                pageShow();
            }, 1800)
        }
    }, [isEntering, isRouteChangeComplete])

    return (
        <div
            className="layout"
            onClick={(e) => {
                const windowHeight = window.innerHeight;
                const centerX = e.clientX;
                const centerY = windowHeight - e.clientY;

                setCenter([centerX, centerY])
            }}
        >
            <div className="app__wrapper">
                <Frame />
                <MenuBar setScrollToWorks={setScrollToWorks} />
                <LocalTime />
                <SVGDefs />
                <Cursor />
                <PreLoader />
                <PageTransition material={pageTransitionMaterial} pageTransition={pageTransition} center={center} />
                <div className="menu-bar-pallete__wrapper mobile d-md-none d-block position-fixed">
                    <ColorPalette />
                </div>
                {
                    !isPageLoading
                        ? (
                            <div className="wrapper">
                                <main className="contents">
                                    {children}
                                </main>
                            </div>
                        )
                        : null
                }
            </div>
        </div>
    )
}

export default Layout