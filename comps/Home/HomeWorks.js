import React, { Suspense, useEffect, useMemo, useRef, useState } from "react"
import Link from "../PageLayout/Link";
//Context
import { useGlobalStates } from "../context/global-states"
//Components
import workList from "../PageLayout/WorkList"
import { onMouseLeaveTranslateScale, onMouseMoveTranslate } from "../PageLayout/animations"
import WorkImagePlane from "./WebGL/HomeWorks/HomeWorksPlane";
//Libraries
import { gsap } from "gsap"
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";


const Homeworks = () => {

    const { isTouch, wrapperOffsetContent, getParams, GLColor } = useGlobalStates()
    const itemWrapperRefs = useRef([])
    const addToItemWrapperRefs = (_el) => {
        if (_el && !itemWrapperRefs.current.includes(_el)) {
            itemWrapperRefs.current.push(_el)
        } else {
            itemWrapperRefs.current = [];
        }
    };
    const [hoverIndex, setHoverIndex] = useState()
    const titleRefs = useRef([]);
    const addToTitleRefs = (_el) => {
        if (_el && !titleRefs.current.includes(_el)) {
            titleRefs.current.push(_el)
        } else {
            titleRefs.current = [];
        }
    };
    const [titleParams, setTitleParams] = useState()
    const videoRefs = useRef([]);
    const addToVideoRefs = (_el) => {
        if (_el && !videoRefs.current.includes(_el)) {
            videoRefs.current.push(_el)
        } else {
            videoRefs.current = [];
        }
    };

    const [wrapperParams, setWrapperParams] = useState([])

    useEffect(() => {
        setTitleParams(getParams({ els: titleRefs.current, offset: wrapperOffsetContent }))
        setWrapperParams(getParams({ els: itemWrapperRefs.current, offset: wrapperOffsetContent }))
        window.addEventListener("resize", () => {
            setTitleParams(getParams({ els: titleRefs.current, offset: wrapperOffsetContent }))
            setWrapperParams(getParams({ els: itemWrapperRefs.current, offset: wrapperOffsetContent }))
        })
        window.addEventListener("scroll", () => {
            setTitleParams(getParams({ els: titleRefs.current, offset: wrapperOffsetContent }))
            setWrapperParams(getParams({ els: itemWrapperRefs.current, offset: wrapperOffsetContent }))
        })
        return () => {
            window.removeEventListener("resize", () => {
                setTitleParams(getParams({ els: titleRefs.current, offset: wrapperOffsetContent }))
                setWrapperParams(getParams({ els: itemWrapperRefs.current, offset: wrapperOffsetContent }))
            })
            window.removeEventListener("scroll", () => {
                setTitleParams(getParams({ els: titleRefs.current, offset: wrapperOffsetContent }))
                setWrapperParams(getParams({ els: itemWrapperRefs.current, offset: wrapperOffsetContent }))
            })
        }
    }, [wrapperOffsetContent])

    const videoShow = (e, el, params) => {
        if (el) {
            gsap.timeline({
                defaults: {
                    overwrite: true,
                }
            })
                .set(el.uniforms.center,
                    {
                        value: [e.clientX - params.x, params.bottom - e.clientY]
                    })
                .to(el.uniforms.animationValue,
                    {
                        duration: 1.3,
                        value: 0,
                        ease: 'none'
                    })
                .to(el.uniforms.ease,
                    {
                        duration: 1.3,
                        value: 0,
                        ease: 'none'
                    }, 0)
        }
    }

    const videoHide = (e, el, params) => {

        if (el) {
            gsap.timeline({
                onComplete: () => {
                    el.uniforms.ease.value = 0;
                },
                defaults: {
                    overwrite: true
                }
            })
                .set(el.uniforms.center,
                    {
                        value: [e.clientX - params.x, params.bottom - e.clientY]
                    })
                .to(el.uniforms.animationValue,
                    {
                        value: 1,
                        duration: 1.3,
                        ease: "none"
                    }, 0)
                .to(el.uniforms.ease,
                    {
                        value: 1,
                        duration: 1.3,
                        ease: "none"
                    }, 0)
        }
    }

    const refsById = useMemo(() => {
        const refs = []
        workList.works.forEach((work, index) => {
            refs[index] = React.createRef(null)
        })
        return refs
    }, [workList])

    return (
        <section id="works" className="home-works position-relative w-100">
            <div className="section-title__wrapper">
                <span className="frame-top grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <h2 className="section-title">
                    projects
                    <span className="frame-right grow frame-line" />
                </h2>
                <svg height="100%" width="100%" className="section-titile-spacer">
                    <rect style={{ fill: "url(#star-pattern-2)" }} x="0" y="0" height="100%" width="100%"></rect>
                </svg>
            </div>
            <div className="home-works-list d-md-flex flex-wrap justify-content-end position-relative">
                {
                    workList.works.map((item, index) => {
                        if (index < 3) {
                            return (
                                <>
                                    <div
                                        ref={addToItemWrapperRefs}
                                        key={index}
                                        className={`home-works-list-item large ${index % 2 !== 0 ? "info-left" : "info-right"} ${hoverIndex === index ? "is-active" : ""}`}
                                    >
                                        <span className="frame-top grow frame-line" />
                                        <span className="frame-bottom grow frame-line" />
                                        <div
                                            className="home-works-list-item-video__wrapper"
                                        >
                                            <video ref={addToVideoRefs} src={item["page content"]["main-video"]} muted loop playsInline></video>
                                            <div className="web-gl__wrapper">
                                                <Canvas
                                                    linear={true}
                                                >
                                                    <Suspense
                                                        fallback={<Html center className="loading" children="" />}
                                                    >
                                                        <WorkImagePlane video={videoRefs.current[index]} GLColor={GLColor} material={refsById[index]} />
                                                    </Suspense>
                                                </Canvas>
                                            </div>
                                        </div>
                                        <Link href={`/works/[slug]`} as={`/works/${item.slug}`}>
                                            <a
                                                className="home-works-list-item-link text-mode"
                                                onMouseOver={(e) => {
                                                    if (!isTouch) {
                                                        setHoverIndex(index)
                                                        videoRefs.current[index].play()
                                                        videoShow(e, refsById[index].current, wrapperParams[index])
                                                    }
                                                }}
                                                onMouseMove={(e) => {
                                                    if (!isTouch) {
                                                        onMouseMoveTranslate(e, titleRefs.current[index], titleParams[index], 15, 20, wrapperOffsetContent.x, wrapperOffsetContent.y);
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isTouch) {
                                                        onMouseLeaveTranslateScale(titleRefs.current[index], 1)
                                                        setHoverIndex("")
                                                        videoRefs.current[index].pause()
                                                        videoHide(e, refsById[index].current, wrapperParams[index])
                                                    }
                                                }}
                                            >
                                                <span className="frame-bottom grow frame-line" />
                                                <p className="home-works-list-item-title">
                                                    <span ref={addToTitleRefs} className="home-works-list-item-title__inner should-animate stroke-theme">
                                                        {item.title}
                                                    </span>
                                                </p>
                                                <div className="home-works-list-item-info">
                                                    <span className={`${index % 2 !== 0 ? "frame-right" : "frame-left"} grow frame-line`} />
                                                    <span className="frame-top grow frame-line d-md-none d-block" />
                                                    <div className="home-works-list-item-info-date">
                                                        {item.date}
                                                    </div>
                                                    <ul className="home-works-list-item-info-roles">
                                                        {
                                                            item.roles.map((role, index) => (
                                                                <li key={index}>{role}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div key={`${index}-spacer`} className="home-works-list-item-spacer">
                                        <span className="frame-bottom grow frame-line" />
                                        <svg height="100%" width="100%" className="section-titile-spacer">
                                            <rect style={{ fill: "url(#diagonal-stripe-1)" }} x="0" y="0" height="100%" width="100%"></rect>
                                        </svg>
                                    </div>
                                </>
                            )
                        } else if (index < 5) {
                            return (
                                <>
                                    {
                                        index === 3
                                            ? (
                                                <div key={`${index}-subtitle`} className="home-works-subtitle__wrapper d-flex flex-column">
                                                    <span className="frame-top grow frame-line" />
                                                    <span className="frame-right grow frame-line" />
                                                    <p className="home-works-subtitle">
                                                        Every website is meaningful and require a lot of effort to reach the goals, regardless of which goal you are looking to meet.
                                                    </p>
                                                    <p className="home-works-subtitle">
                                                        I can work with you to reach them. You can see someof the projects that I've worked in and see my skil set.
                                                        <br />
                                                        Hope you enjoy them.
                                                    </p>
                                                </div>
                                            )
                                            : null
                                    }
                                    <div
                                        ref={addToItemWrapperRefs}
                                        key={index}
                                        className={`home-works-list-item ${hoverIndex === index ? "is-active" : ""}`}
                                    >
                                        <span className="frame-top grow frame-line" />
                                        <span className="frame-bottom grow frame-line" />
                                        <span className="frame-right grow frame-line" />
                                        <div
                                            className="home-works-list-item-video__wrapper"
                                        >
                                            <video ref={addToVideoRefs} src={item["page content"]["main-video"]} muted loop playsInline></video>
                                            <div className="web-gl__wrapper">
                                                <Canvas
                                                    linear={true}
                                                >
                                                    <Suspense
                                                        fallback={<Html center className="loading" children="" />}
                                                    >
                                                        <WorkImagePlane video={videoRefs.current[index]} GLColor={GLColor} material={refsById[index]} />
                                                    </Suspense>
                                                </Canvas>
                                            </div>
                                        </div>
                                        <Link href={`/works/[slug]`} as={`/works/${item.slug}`}>
                                            <a
                                                className="home-works-list-item-link text-mode"
                                                onMouseOver={(e) => {
                                                    if (!isTouch) {
                                                        setHoverIndex(index)
                                                        videoRefs.current[index].play()
                                                        videoShow(e, refsById[index].current, wrapperParams[index])
                                                    }
                                                }}
                                                onMouseMove={(e) => {
                                                    if (!isTouch) {
                                                        onMouseMoveTranslate(e, titleRefs.current[index], titleParams[index], 15, 20, wrapperOffsetContent.x, wrapperOffsetContent.y);
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!isTouch) {
                                                        onMouseLeaveTranslateScale(titleRefs.current[index], 1)
                                                        setHoverIndex("")
                                                        videoRefs.current[index].pause()
                                                        videoHide(e, refsById[index].current, wrapperParams[index])
                                                    }
                                                }}
                                            >
                                                <p className="home-works-list-item-title">
                                                    <span ref={addToTitleRefs} className="home-works-list-item-title__inner should-animate stroke-theme">
                                                        {item.title}
                                                    </span>
                                                </p>
                                                <div className="home-works-list-item-info">
                                                    <span className="frame-top grow frame-line" />
                                                    <div className="home-works-list-item-info-date">
                                                        {item.date}
                                                    </div>
                                                    <ul className="home-works-list-item-info-roles">
                                                        {
                                                            item.roles.map((role, index) => (
                                                                <li key={index}>{role}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    {
                                        index === 3
                                            ? (
                                                <div key={`${index}-spacer`} className="home-works-list-item-spacer d-md-none d-block">
                                                    <span className="frame-bottom grow frame-line" />
                                                    <svg height="100%" width="100%" className="section-titile-spacer">
                                                        <rect style={{ fill: "url(#diagonal-stripe-1)" }} x="0" y="0" height="100%" width="100%"></rect>
                                                    </svg>
                                                </div>
                                            )
                                            : null
                                    }
                                </>
                            )
                        }
                    })
                }
            </div>
        </section>
    );
}

export default Homeworks;