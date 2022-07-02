import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Link from "./Link"
//Components
import Logo from "./Logo"
import ColorPalette from "./ColorPalette"
import workList from "./WorkList"
//Context
import { useGlobalStates } from "../context/global-states"
import { onMouseLeaveTranslateScale, onMouseMoveTranslate, onMouseMoveTranslateScale } from "./animations"

const MenuBar = () => {

    const works = workList.works
    const [paramsList, setParamsList] = useState([])
    const textRefs = useRef([])
    const addToTextRefs = (_el) => {
        if (_el && !textRefs.current.includes(_el)) {
            textRefs.current.push(_el)
        } else {
            textRefs.current = [];
        }
    };
    const { isTouch, wrapperOffsetMenu, getParams, isPageLoaded } = useGlobalStates()
    const router = useRouter()

    useEffect(() => {
        setParamsList(getParams({ els: textRefs.current, offset: wrapperOffsetMenu }))
        window.addEventListener("resize", () => {
            setParamsList(getParams({ els: textRefs.current, offset: wrapperOffsetMenu }))
        })
        return () => {
            window.removeEventListener("resize", () => {
                setParamsList(getParams({ els: textRefs.current, offset: wrapperOffsetMenu }))
            })
        }
    }, [wrapperOffsetMenu])


    return (
        <div className="menubar">

            <div className="menubar__inner w-100 h-100 position-relative d-flex">
                <span className="frame-top grow frame-line" />
                <span className="frame-left grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <span className="frame-right grow frame-line" />

                <div className="menu-bar-logo-pallete__wrapper h-100 d-md-flex d-none">
                    <Logo />
                    <ColorPalette />
                </div>

                <div className="menubar-nav-link__wrapper d-flex">
                    <Link href="/profile" scroll={false} ariaLabel='profile'>
                        <a
                            className={`menubar-nav_link__inner w-50 h-100 ${router.asPath === "/profile" ? "bg-theme" : ""}`}
                            onMouseMove={(e) => {
                                if (!isTouch) {
                                    onMouseMoveTranslateScale(e, textRefs.current[0], paramsList[0], 20, 10, wrapperOffsetMenu.x, wrapperOffsetMenu.y, 1.3);
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isTouch) {
                                    onMouseLeaveTranslateScale(textRefs.current[0], 1)
                                }
                            }}
                        >
                            <div
                                className="menubar-nav-link w-100 h-100 position-relative"

                            >
                                <span className="frame-left grow frame-line" />
                                <span ref={addToTextRefs} className="menubar-nav-link-text position-absolute should-animate d-block">Profile</span>
                            </div>
                        </a>
                    </Link>
                    <Link href="mailto:hello@shutosuganuma.com" scroll={false} ariaLabel='profile'>
                        <a
                            className="menubar-nav_link__inner w-50 h-100 d-md-block d-none"
                            onMouseMove={(e) => {
                                if (!isTouch) {
                                    onMouseMoveTranslateScale(e, textRefs.current[1], paramsList[1], 20, 10, wrapperOffsetMenu.x, wrapperOffsetMenu.y, 1.3);
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isTouch) {
                                    onMouseLeaveTranslateScale(textRefs.current[1], 1)
                                }
                            }}
                        >
                            <div
                                className="menubar-nav-link w-100 h-100 position-relative"
                            >
                                <span className="frame-left grow frame-line" />
                                <span ref={addToTextRefs} className="menubar-nav-link-text position-absolute should-animate">Contact</span>
                            </div>
                        </a>
                    </Link>

                    <Link href="/" scroll={false} ariaLabel=''>
                        <a
                            className={`menubar-nav_link__inner w-50 h-100 d-md-none d-block ${router.asPath === "/" ? "bg-theme" : ""}`}
                            onMouseMove={(e) => {
                                if (!isTouch) {
                                    onMouseMoveTranslateScale(e, textRefs.current[2], paramsList[2], 20, 10, wrapperOffsetMenu.x, wrapperOffsetMenu.y, 1.3);
                                }
                            }}
                            onMouseLeave={() => {
                                if (!isTouch) {
                                    onMouseLeaveTranslateScale(textRefs.current[2], 1)
                                }
                            }}
                        >
                            <div
                                className="menubar-nav-link w-100 h-100 position-relative"
                            >
                                <span className="frame-left grow frame-line" />
                                <span ref={addToTextRefs} className="menubar-nav-link-text position-absolute should-animate">Home</span>
                            </div>
                        </a>
                    </Link>
                </div>

                {/* <div
                    className="menubar-works__wrapper position-relative "
                    onMouseMove={(e) => {
                        if (!isTouch) {
                            onMouseMoveTranslate(e, textRefs.current[2], paramsList[2], 15, 10, wrapperOffsetMenu.x, wrapperOffsetMenu.y);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!isTouch) {
                            onMouseLeaveTranslateScale(textRefs.current[2], 1)
                        }
                    }}
                >
                    <Link href="/" scroll={false} ariaLabel={"home works"}>
                        <a
                            className="menubar-works-link w-100 h-100 d-flex flex-column justify-content-around align-items-center"
                        >
                            <span className="frame-left grow frame-line" />
                            <span>Works</span>
                            <div
                                ref={addToTextRefs}
                                className="works-icon fill-theme position-relative should-animate"
                            >
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    width="276.167px"
                                    height="276.167px"
                                    viewBox="0 0 276.167 276.167"
                                    xmlSpace="preserve">
                                    <g>
                                        <g>
                                            <path d="M33.144,2.471C15.336,2.471,0.85,16.958,0.85,34.765s14.48,32.293,32.294,32.293s32.294-14.486,32.294-32.293
			S50.951,2.471,33.144,2.471z"/>
                                            <path d="M137.663,2.471c-17.807,0-32.294,14.487-32.294,32.294s14.487,32.293,32.294,32.293c17.808,0,32.297-14.486,32.297-32.293
			S155.477,2.471,137.663,2.471z"/>
                                            <path d="M243.873,67.059c17.804,0,32.294-14.486,32.294-32.293S261.689,2.471,243.873,2.471s-32.294,14.487-32.294,32.294
			S226.068,67.059,243.873,67.059z"/>
                                            <path d="M32.3,170.539c17.807,0,32.297-14.483,32.297-32.293c0-17.811-14.49-32.297-32.297-32.297S0,120.436,0,138.246
			C0,156.056,14.493,170.539,32.3,170.539z"/>
                                            <path d="M136.819,170.539c17.804,0,32.294-14.483,32.294-32.293c0-17.811-14.478-32.297-32.294-32.297
			c-17.813,0-32.294,14.486-32.294,32.297C104.525,156.056,119.012,170.539,136.819,170.539z"/>
                                            <path d="M243.038,170.539c17.811,0,32.294-14.483,32.294-32.293c0-17.811-14.483-32.297-32.294-32.297
			s-32.306,14.486-32.306,32.297C210.732,156.056,225.222,170.539,243.038,170.539z"/>
                                            <path d="M33.039,209.108c-17.807,0-32.3,14.483-32.3,32.294c0,17.804,14.493,32.293,32.3,32.293s32.293-14.482,32.293-32.293
			S50.846,209.108,33.039,209.108z"/>
                                            <path d="M137.564,209.108c-17.808,0-32.3,14.483-32.3,32.294c0,17.804,14.487,32.293,32.3,32.293
			c17.804,0,32.293-14.482,32.293-32.293S155.368,209.108,137.564,209.108z"/>
                                            <path d="M243.771,209.108c-17.804,0-32.294,14.483-32.294,32.294c0,17.804,14.49,32.293,32.294,32.293
			c17.811,0,32.294-14.482,32.294-32.293S261.575,209.108,243.771,209.108z"/>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <span>({works.length})</span>
                        </a>
                    </Link>
                </div> */}
            </div>
        </div>
    )
}

export default MenuBar