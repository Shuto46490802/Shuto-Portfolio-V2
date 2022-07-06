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

const Layout = ({ children }) => {

    const pageTransitionMaterial = useRef();
    const pageTransition = useRef();
    const { setIsPageLoading, isPageLoading, setIsPageLoaded, setIsEntering, isEntering, setIsPageReady, isPageLoaded } = useGlobalStates()
    const router = useRouter()
    const [isRouteChangeComplete, setIsRouteChangeComplete] = useState(false)
    const [center, setCenter] = useState()
    const [isExiting, setIsExiting] = useState(false) 

    useEffect(() => {
        handlePageLoad()
    }, [])


    useEffect(() => {

        const onRouteChangeStart = () => {
            pageHide()
            setIsPageReady(false)
            setIsExiting(true)
        }
        const onRouteChangeComplete = () => {
            setIsRouteChangeComplete(true)
        }
        router.events.on("routeChangeStart", () => {
            onRouteChangeStart()
        })
        router.events.on("routeChangeComplete", () => {
            onRouteChangeComplete()
        })

        return () => {
            router.events.off("routeChangeStart", () => {
                onRouteChangeStart()
            })
            router.events.off("routeChangeComplete", () => {
                onRouteChangeComplete()
            })
        }
    }, [])

    useEffect(() => {
        if (!isExiting && isRouteChangeComplete) {
            setTimeout(() => {
                pageShow();
            }, 1800)
        }
    }, [isExiting, isRouteChangeComplete])

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

    const pageShow = () => {

        if (pageTransitionMaterial.current && pageTransition.current) {
            gsap.timeline({
                paused: false,
                onComplete: () => {
                    setIsRouteChangeComplete(false);
                    setIsEntering(false)
                    pageTransition.current.style.zIndex = '-1';
                    if (!isPageLoaded) {
                        setIsPageLoaded(true)
                    }
                    document.body.classList.add('page-loaded');
                    setTimeout(() => {
                        setIsPageReady(true)
                    }, 500)
                },
                onStart: () => {
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
                },
                onComplete: () => {
                    setIsEntering(true)
                    setIsExiting(false)
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
                <MenuBar />
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