import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
//Libraries
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { gsap } from "gsap"
import { useGlobalStates } from "../context/global-states";
import { onMouseMoveTranslate, onMouseLeaveTranslateScale } from "../PageLayout/animations";
SwiperCore.use([Navigation]);

const Execution = ({ num, content, side }) => {

    const firstDigitRef = useRef()
    const totalFirstDigitRef = useRef()
    const [imgIndex, setImgIndex] = useState(1)
    const { getParams, wrapperOffsetContent, isTouch } = useGlobalStates()

    const getNavIndicator = (num) => {
        if (num < 10) {
            const itemGroup = []
            for (var i = 0; i < num + 1; i++) {
                const item = <><span>{i}</span></>
                itemGroup.push(item)
            }

            return (
                <div className="work-details-execution-nav-indicator">
                    <p className="work-details-execution-nav-indicator-current">
                        <span className="digits">
                            <span className="digit-item">
                                <span ref={firstDigitRef} className="digit-item__inner">
                                    <span className="digit-item-group">
                                        {
                                            itemGroup.map((item) => (
                                                item
                                            ))
                                        }
                                    </span>
                                    <span className="digit-item-group">
                                        {
                                            itemGroup.map((item) => (
                                                item
                                            ))
                                        }
                                    </span>
                                </span>
                            </span>
                        </span>
                    </p>
                    <p className="work-details-execution-nav-indicator-total">
                        <span className="digits">
                            <span className="digit-item">
                                <span ref={totalFirstDigitRef} className="digit-item__inner">
                                    <span className="digit-item-group">
                                        {
                                            itemGroup.map((item) => (
                                                item
                                            ))
                                        }
                                    </span>
                                    <span className="digit-item-group">
                                        {
                                            itemGroup.map((item) => (
                                                item
                                            ))
                                        }
                                    </span>
                                </span>
                            </span>
                        </span>
                    </p>
                </div>
            )
        }
    }

    const getFirstOffset = (num) => {
        if (num < 10) {
            const numOfDigit = num * 2 + 2
            const totalOffsetY = firstDigitRef.current.clientHeight / numOfDigit * num;
            totalFirstDigitRef.current.style.transform = `translate3d(0px, -${totalOffsetY}px, 0px)`

            const currentOffsetY = firstDigitRef.current.clientHeight / numOfDigit * (num + 2);
            firstDigitRef.current.style.transform = `translate3d(0px, -${currentOffsetY}px, 0px)`
        }
    }

    const toggleIndicator = (num, currentNum) => {
        if (num < 10) {
            const numOfDigit = num * 2 + 2
            if (currentNum === 1) {
                const offsetY = firstDigitRef.current.clientHeight / numOfDigit * (num + 2);
                gsap.to(firstDigitRef.current,
                    {
                        y: -offsetY,
                        duration: 0.4,
                        ease: "linear"
                    })
            } else {
                const offsetY = firstDigitRef.current.clientHeight / numOfDigit * (num + currentNum + 1);
                gsap.to(firstDigitRef.current,
                    {
                        y: -offsetY,
                        duration: 0.4,
                        ease: "linear"
                    })
            }
        }
    }

    //Arrow animation
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
        getFirstOffset(content["images"].length)
    }, [])

    useEffect(() => {
        toggleIndicator(content["images"].length, imgIndex)
    }, [imgIndex])

    useEffect(() => {
        setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
        window.addEventListener("resize", () => {
            setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
        })
        window.addEventListener("scroll", () => {
            setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
        })
        return () => {
            window.removeEventListener("resize", () => {
                setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
            })
            window.removeEventListener("scroll", () => {
                setArrowParamsList(getParams({ els: arrowRefs.current, offset: wrapperOffsetContent }))
            })
        }
    }, [wrapperOffsetContent])

    return (
        <>
            <section className={`work-details-execution ${side}`}>
                <span className="frame-top grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <div className="work-details-execution-text__wrapper">
                    <span className="frame-bottom grow frame-line" />
                    <span className="frame-right grow frame-line" />
                    <h2 className="work-details-execution-index">Execution{num}</h2>
                    <p className="work-details-execution-title">
                        {content["title"]}
                    </p>
                </div>
                <div className="work-details-execution-image__wrapper">
                    <div className="work-details-execution-image__inner">
                        <div className="work-details-execution-image bg-theme">
                            <Swiper
                                className="swiper-container"
                                direction="vertical"
                                loop
                                navigation={{
                                    nextEl: '.work-details-execution-button-next',
                                    prevEl: '.work-details-execution-button-prev'
                                }}
                                onSlideChange={(params) => setImgIndex(params.realIndex + 1)}
                            >
                                {
                                    content["images"].map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <figure className="fig__wrapper">
                                                <Image src={image} layout="fill" objectFit="cover" />
                                            </figure>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            <div className="work-details-execution-nav">
                                {getNavIndicator(content["images"].length)}
                                <div className="work-details-execution-nav-buttons">
                                    <span className="frame-top grow frame-line" />
                                    <span className="frame-bottom grow frame-line" />
                                    <span className="frame-left grow frame-line" />
                                    <span className="frame-right grow frame-line" />
                                    <button
                                        className="square-nav-button square-nav-button-prev work-details-execution-button-prev"
                                        onMouseMove={(e) => {
                                            if (!isTouch) {
                                                onMouseMoveTranslate(e, arrowRefs.current[0], arrowParamsList[0], 5, 5, wrapperOffsetContent.x, wrapperOffsetContent.y, 1);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (!isTouch) {
                                                onMouseLeaveTranslateScale(arrowRefs.current[0])
                                            }
                                        }}
                                    >
                                        <span className="frame-top grow frame-line" />
                                        <span className="frame-left grow frame-line" />
                                        <span ref={addToArrownRefs} className="square-nav-button-arrow should-animate" />
                                    </button>
                                    <button
                                        className="square-nav-button square-nav-button-next work-details-execution-button-next"
                                        onMouseMove={(e) => {
                                            if (!isTouch) {
                                                onMouseMoveTranslate(e, arrowRefs.current[1], arrowParamsList[1], 5, 5, wrapperOffsetContent.x, wrapperOffsetContent.y, 1);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (!isTouch) {
                                                onMouseLeaveTranslateScale(arrowRefs.current[1])
                                            }
                                        }}
                                    >
                                        <span ref={addToArrownRefs} className="square-nav-button-arrow should-animate" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="work-details-execution-overview__wrapper">
                <span className="frame-top grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <div className="work-details-execution-overview__inner">
                    <span className="frame-right grow frame-line" />
                    <h2 className="work-details-execution-overview-titie">
                        Overview
                    </h2>
                    <div className="work-details-execution-overview-body__wrapper">
                        {
                            content["overview"].map((text, index) => (
                                <p key={index}>{text}</p>
                            ))
                        }
                    </div>
                </div>
            </section>
            <div style={{marginBottom: "-2px"}} className={`work-details-spacer left ${num === "3" ? "last" : ""}`}>
                <span className="frame-left grow frame-line" />
                <span className="frame-bottom grow frame-line" />
                <svg height="100%" width="100%" className="section-titile-spacer">
                    <rect style={{ fill: "url(#diagonal-stripe-3)" }} x="0" y="0" height="100%" width="100%"></rect>
                </svg>
            </div>
        </>
    );
}

export default Execution;