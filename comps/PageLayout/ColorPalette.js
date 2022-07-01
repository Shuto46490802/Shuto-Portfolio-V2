import React, { useEffect, useRef, useState } from "react"
//Context
import { useGlobalStates } from "../context/global-states"
import { onMouseLeaveTranslateScale, onMouseMoveTranslateScale } from "./animations"

const ColorPalette = () => {

    const { theme, setTheme, wrapperOffsetPalette, isTouch , getParams, setColor} = useGlobalStates()
    const [paramsList, setParamsList] = useState([])
    const buttonRefs = useRef([]);
    const addToButtonRefs = (_el) => {
        if (_el && !buttonRefs.current.includes(_el)) {
            buttonRefs.current.push(_el)
        } else {
            buttonRefs.current = [];
        }
    };

    useEffect(() => {
        setParamsList(getParams({els: buttonRefs.current, offset: wrapperOffsetPalette}))
        window.addEventListener("resize", () => {
            setParamsList(getParams({els: buttonRefs.current, offset: wrapperOffsetPalette}))
        })
        return () => {
            window.removeEventListener('resize', () => {
                setParamsList(getParams({els: buttonRefs.current, offset: wrapperOffsetPalette}))
            });
        }
    }, [wrapperOffsetPalette])

    return (
        <div className="color-palette h-100 position-relative d-flex flex-column flex-center">

            <span className="frame-top grow frame-line" />
            <span className="frame-bottom grow frame-line" />
            <span className="frame-left grow frame-line" />
            <span className="frame-right grow frame-line" />

            <span className="color-palette-text d-md-block d-none">Color Palette:</span>

            <div className="color-palette-button__wrapper d-flex flex-wrap w-100">
                <button
                    className={`color-palette-button color-palette-button__1 ${theme == "blue" ? "pointer-none" : ""}`}
                    onClick={() => {
                        setTheme("blue")
                    }}
                    onMouseMove={(e) => {
                        if (!isTouch) {
                            onMouseMoveTranslateScale(e, buttonRefs.current[0], paramsList[0], 5, 5, wrapperOffsetPalette.x, wrapperOffsetPalette.y, 1);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!isTouch) {
                            onMouseLeaveTranslateScale(buttonRefs.current[0], 0.5)
                        }
                    }}
                >
                    <span ref={addToButtonRefs} className={`color-palette-button__inner should-animate ${theme == "blue" ? "is-active" : ""}`}>
                        Blue
                    </span>
                </button>

                <button
                    className={`color-palette-button color-palette-button__2 ${theme == "orange" ? "pointer-none" : ""}`}
                    onClick={() => {
                        setTheme("orange")
                    }}
                    onMouseMove={(e) => {
                        if (!isTouch) {
                            onMouseMoveTranslateScale(e, buttonRefs.current[1], paramsList[1], 5, 5, wrapperOffsetPalette.x, wrapperOffsetPalette.y, 1);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!isTouch) {
                            onMouseLeaveTranslateScale(buttonRefs.current[1], 0.5)
                        }
                    }}
                >
                    <span ref={addToButtonRefs} className={`color-palette-button__inner should-animate ${theme == "orange" ? "is-active" : ""}`}>
                        Orange
                    </span>
                </button>

                <button
                    className={`color-palette-button color-palette-button__3 ${theme == "green" ? "pointer-none" : ""}`}
                    onClick={() => setTheme("green")}
                    onMouseMove={(e) => {
                        if (!isTouch) {
                            onMouseMoveTranslateScale(e, buttonRefs.current[2], paramsList[2], 5, 5, wrapperOffsetPalette.x, wrapperOffsetPalette.y, 1);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!isTouch) {
                            onMouseLeaveTranslateScale(buttonRefs.current[2], 0.5)
                        }
                    }}
                >
                    <span ref={addToButtonRefs} className={`color-palette-button__inner should-animate ${theme == "green" ? "is-active" : ""}`}>
                        Green
                    </span>
                </button>

                <button
                    className={`color-palette-button color-palette-button__4 ${theme == "light-green" ? "pointer-none" : ""}`}
                    onClick={() => setTheme("light-green")}
                    onMouseMove={(e) => {
                        if (!isTouch) {
                            onMouseMoveTranslateScale(e, buttonRefs.current[3], paramsList[3], 5, 5, wrapperOffsetPalette.x, wrapperOffsetPalette.y, 1);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!isTouch) {
                            onMouseLeaveTranslateScale(buttonRefs.current[3], 0.5)
                        }
                    }}
                >
                    <span ref={addToButtonRefs} className={`color-palette-button__inner should-animate ${theme == "light-green" ? "is-active" : ""}`}>
                        Light-Green
                    </span>
                </button>

                <button
                    className={`color-palette-button color-palette-button__5 ${theme == "grey" ? "pointer-none" : ""}`}
                    onClick={() => setTheme("grey")}
                    onMouseMove={(e) => {
                        if (!isTouch) {
                            onMouseMoveTranslateScale(e, buttonRefs.current[4], paramsList[4], 5, 5, wrapperOffsetPalette.x, wrapperOffsetPalette.y, 1);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!isTouch) {
                            onMouseLeaveTranslateScale(buttonRefs.current[4], 0.5)
                        }
                    }}
                >
                    <span ref={addToButtonRefs} className={`color-palette-button__inner should-animate ${theme == "grey" ? "is-active" : ""}`}>
                        Grey
                    </span>
                </button>

                <button
                    className={`color-palette-button color-palette-button__6 ${theme == "black" ? "pointer-none" : ""}`}
                    onClick={() => setTheme("black")}
                    onMouseMove={(e) => {
                        if (!isTouch) {
                            onMouseMoveTranslateScale(e, buttonRefs.current[5], paramsList[5], 5, 5, wrapperOffsetPalette.x, wrapperOffsetPalette.y, 1);
                        }
                    }}
                    onMouseLeave={() => {
                        if (!isTouch) {
                            onMouseLeaveTranslateScale(buttonRefs.current[5], 0.5)
                        }
                    }}
                >
                    <span ref={addToButtonRefs} className={`color-palette-button__inner should-animate ${theme == "black" ? "is-active" : ""}`}>
                        Black
                    </span>
                </button>
            </div>
        </div>
    )
}

export default ColorPalette;