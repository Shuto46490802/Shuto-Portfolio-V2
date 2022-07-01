import React, { useRef } from "react"
//Libraries
import { gsap } from "gsap"
//Components
import Link from "../PageLayout/Link"
//Context
import { useGlobalStates } from "../context/global-states"

const FooterProfile = () => {

    const { isTouch } = useGlobalStates()
    const arrowWrapperRef = useRef()
    const arrowRef = useRef()
    const circleHoverRef = useRef()

    const arrowAnimOver = () => {
        gsap.to(arrowWrapperRef.current,
            {
                scale: 0.9,
                duration: 0.75,
                ease: "Power3.easeOut"
            })

        gsap.timeline()
            .fromTo(arrowRef.current,
                {
                    opacity: 1,
                    yPercent: 0
                },
                {
                    opacity: 0,
                    yPercent: -120,
                    duration: 0.375,
                    ease: "Power3.easeIn"
                })
            .fromTo(arrowRef.current,
                {
                    opacity: 0,
                    yPercent: 120
                },
                {
                    opacity: 1,
                    yPercent: -0,
                    ease: "Power3.easeOut"
                })

        gsap.timeline()
            .fromTo(circleHoverRef.current,
                {
                    strokeDashoffset: 569.628,
                    strokeDasharray: '569.628px, 579.628px'
                },
                {
                    strokeDashoffset: 1e-05,
                    strokeDasharray: '569.628px, 579.628px',
                    duration: 0.75,
                    ease: 'Power3.easeInOut'
                })
            .to(circleHoverRef.current,
                {
                    rotation: "+=90",
                    transformOrigin: "center center",
                    duration: 0.75,
                    ease: 'Power3.easeInOut'
                }, 0)
            .set(circleHoverRef.current, {
                strokeDasharray: 'none',
            })
    }

    const arrowAnimLeave = () => {
        gsap.to(arrowWrapperRef.current,
            {
                scale: 1,
                duration: 0.75,
                ease: "Power3.easeOut"
            })

        gsap.timeline()
            .fromTo(circleHoverRef.current,
                {

                    strokeDashoffset: 1e-05,
                    strokeDasharray: '569.628px, 579.628px',
                },
                {
                    strokeDashoffset: -569.628,
                    strokeDasharray: '1e-05px, 579.628px',
                    duration: 0.75,
                    ease: 'Power3.easeInOut'
                })
    }

    return (
        <div className="footer-column">
            <span className="frame-right grow frame-line" />
            <span className="frame-bottom grow frame-line" />
            <Link href="/profile" scroll={false} ariaLabel={"profile"}>
                <a
                    className="footer-nav-link"
                    onMouseOver={(e) => {
                        if (!isTouch) {
                            arrowAnimOver()
                        }
                    }}
                    onMouseLeave={() => {
                        if (!isTouch) {
                            arrowAnimLeave()
                        }
                    }}
                >
                    <div className="footer-nav-link-text">
                        <p className="footer-nav-link-header">
                            Profile
                        </p>
                        <div className="footer-nav-link-subtitle">
                            <p className="footer-nav-link-subtitle__inner">
                                This is the portfolio website of Shuto Suganuma, Front-end Developer.
                            </p>
                            <p className="footer-nav-link-subtitle__inner">
                                For the achievement of goals, I'm very passionate about building an innovative and creative website.
                            </p>
                        </div>
                    </div>
                    <button
                        className="footer-nav-button"
                        ref={arrowWrapperRef}
                    >
                        <svg className="up-button fill-theme" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
                            <g transform="translate(-102.5 -14780.5)">
                                <path ref={arrowRef} className="circ-arrow fill-theme" d="M-57.625-7.9l38.054-38.054H-27.2l-4.723-4.723,20.889.363.227.182.363,20.934-4.768-4.768v-7.811l-38.1,38.145Z" transform="matrix(0.719,-0.695,0.695,0.719,246.656,14877.2)" data-svg-origin="-57.625 -50.677001953125" />
                                <circle className="circ-static stroke-theme" opacity=".2" cx="90.5" cy="90.5" r="90.5" transform="translate(112.5 14790.5)" fill="none" strokeWidth="3" />
                                <circle ref={circleHoverRef} className="circ-hover stroke-theme" cx="90.5" cy="90.5" r="90.5" transform="matrix(0,1,-1,0,293.5,14790.5)" fill="none" strokeWidth="3" data-svg-origin="90.5 90.5" />
                            </g>
                        </svg>
                    </button>
                </a>
            </Link>
        </div>
    );
}

export default FooterProfile;