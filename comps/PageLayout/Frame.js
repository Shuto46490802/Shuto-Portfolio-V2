import React, { useEffect, useRef } from "react"
//Libraries
import { gsap } from "gsap"

const Frame = () => {

    const lineRefs = useRef([]);
    const addToLineRefs = (_el) => {
        if (_el && !lineRefs.current.includes(_el)) {
            lineRefs.current.push(_el)
        } else {
            lineRefs.current = [];
        }
    };

    useEffect(() => {
        if (lineRefs.current) {
            gsap.timeline({ paused: false })
                .to([lineRefs.current[0], lineRefs.current[1]],
                    {
                        scaleX: 1,
                        duration: 1.2,
                        ease: "Power4.easeInOut"
                    })
                .to([lineRefs.current[2], lineRefs.current[3]],
                    {
                        scaleY: 1,
                        duration: 1.2,
                        ease: "Power4.easeInOut"
                    }, 0)
        }
    }, [])

    return (
        <div className="frame">
            <div className="frame__inner position-relative d-block w-100 h-100">
                <span ref={addToLineRefs} className={`frame-top frame-line`} />
                <span ref={addToLineRefs} className={`frame-bottom frame-line`} />
                <span ref={addToLineRefs} className={`frame-right frame-line`} />
                <span ref={addToLineRefs} className={`frame-left frame-line`} />
            </div>
        </div>
    )
}

export default Frame