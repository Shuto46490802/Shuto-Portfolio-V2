import React, { useEffect, useRef } from "react"
import { useRouter } from "next/router"
//Context
import { useGlobalStates } from "../context/global-states"

const Cursor = () => {

    const { isTouch, isPageLoaded, isEntering } = useGlobalStates()
    const cursorRef = useRef()
    const circleRef = useRef()
    const dotRef = useRef()

    const onCursorMove = (e) => {
        const { clientX, clientY } = e;
        circleRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`
    }

    const onCursorLeave = (e) => {
        const { clientX, clientY } = e;
        circleRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0px)`
    }

    const handleHover = () => {

        const links = document.getElementsByTagName("a");
        const buttons = document.getElementsByTagName("button")
        const hoverList = [...links, ...buttons]

        if (!isTouch) {
            if (hoverList) {
                hoverList.map((item) => {
                    if (!item.classList.contains("hover-setup")) {
                        item.classList.add("hover-setup")
                    }
                    item.addEventListener("mouseover", (e) => {
                        if (e.target.classList.contains('hover-setup')) {
                            cursorRef.current.classList.add("is-hovered")

                            if (e.target.classList.contains('text-mode')) {
                                cursorRef.current.classList.add("is-text-mode")
                            }

                            if (e.target.classList.contains('text-mode2')) {
                                cursorRef.current.classList.add("is-text-mode2")
                            }

                            if (e.target.classList.contains('small-mode')) {
                                cursorRef.current.classList.add("is-small-mode")
                            }
                        }
                    })

                    item.addEventListener("mouseout", () => {
                        cursorRef.current.classList.remove("is-hovered")
                        cursorRef.current.classList.remove("is-text-mode")
                        cursorRef.current.classList.remove("is-text-mode2")
                        cursorRef.current.classList.remove("is-small-mode")
                    })
                })
            }
        }
    }

    useEffect(() => {
        if (!isTouch) {
            handleHover()
            document.body.addEventListener('mousemove', onCursorMove);
            document.body.addEventListener('mouseleave', onCursorLeave);
            cursorRef.current.classList.remove("is-hovered")
            cursorRef.current.classList.remove("is-text-mode")
            cursorRef.current.classList.remove("is-text-mode2")
            cursorRef.current.classList.remove("is-small-mode")
        }
        return () => {
            if (!isTouch) {
                document.body.removeEventListener('mousemove', onCursorMove)
                document.body.removeEventListener('mouseleave', onCursorLeave)
            }
        }
    }, [isPageLoaded, isEntering])

    return (
        <div ref={cursorRef} className={`cursor ${isTouch ? "is-touch" : ""}`}>
            <div ref={circleRef} className="cursor-circle__wrapper">
                <div className="cursor-circle border-theme">
                    <div className="cursor-text">View</div>
                    <div className="cursor-text2">Contact</div>
                    <div className="cursor-loaderSpinner">
                        <svg viewBox="0 0 80 80">
                            <circle cx="40" cy="40" r="39" />
                        </svg>
                    </div>
                </div>
            </div>
            <div ref={dotRef} className="cursor-dot__wrapper">
                <div className="cursor-dot bg-theme" />
            </div>
        </div>
    )
}

export default Cursor