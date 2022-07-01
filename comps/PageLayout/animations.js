import { gsap } from "gsap"

export const onMouseMoveTranslate = (e, _el, params, factorX, factorY, wrapperOffsetX, wrapperOffsetY) => {

    if (_el) {
        const { clientX, clientY } = e;
        const offsetX = (clientX - wrapperOffsetX) - params.centerX;
        const offsetY = (clientY - wrapperOffsetY) - params.centerY;

        _el.style.transform = `translate3d(${offsetX / factorX}px, ${offsetY / factorY}px, 0px)`
    }
}

export const onMouseLeaveTranslateScale = (_el, scale = 1) => {
    if (_el) {
        _el.style.transform = `translate3d(0px, 0px, 0px) scale(${scale})`
    }
}

export const onMouseMoveTranslateScale = (e, _el, params, factorX, factorY, wrapperOffsetX, wrapperOffsetY, scale) => {

    if (_el) {
        const { clientX, clientY } = e;
        const offsetX = (clientX - wrapperOffsetX) - params.centerX;
        const offsetY = (clientY - wrapperOffsetY) - params.centerY;

        _el.style.transform = `translate3d(${offsetX / factorX}px, ${offsetY / factorY}px, 0px) scale(${scale})`
    }
}

export const onMouseMoveTranslateRotate = (e, _el, params, factorX, factorY, wrapperOffsetX, wrapperOffsetY) => {

    if (_el) {
        const { clientX, clientY } = e;

        const offsetX = (clientX - wrapperOffsetX) - params.centerX;
        const offsetY = (clientY - wrapperOffsetY) - params.centerY;

        _el.style.transform = `translate3d(${offsetX / factorX}px, ${offsetY / factorY}px, 0px) rotate(-5deg)`
    }
}

export const onMouseLeaveTranslateRotate = (_el) => {

    if (_el) {
        _el.style.transform = `translate3d(0px, 0px, 0px) rotate(-5deg)`
    }
}

export const getCharOffset = (_arr, color, _trigger) => {

    if (_arr) {

        const trigger = {
            trigger: _trigger,
            start: 'top bottom'
        };

        return _arr
            .map((el) => {
                const randomX = Math.random() * 100 - 50;
                const randomY = Math.random() * 100 - 50;

                const randomTime = Math.random() * 0.6 + 2;

                gsap.timeline({
                    paused: false,
                    delay: randomTime,
                    scrollTrigger: trigger,
                })
                    .fromTo(el,
                        {
                            opacity: 0,
                            color: color
                        },
                        {
                            opacity: 1,
                            color: "transparent",
                            duration: 0.4,
                            ease: 'linear'
                        }, 0)
                    .fromTo(el,
                        {
                            xPercent: randomX,
                            yPercent: randomY,

                        },
                        {
                            xPercent: 0,
                            yPercent: 0,
                            duration: 1.4,
                            ease: 'Expo.easeOut'
                        }, 0);
            })

    }

};

export const charsEnter = (_arr, color) => {
    if (_arr) {
        return _arr
            .map((el) => {
                const randomX = Math.random() * 100 - 50;
                const randomY = Math.random() * 100 - 50;

                const randomTime = Math.random() * 0.6;

                gsap.timeline({
                    paused: false,
                    delay: randomTime,
                })
                    .fromTo(el,
                        {
                            opacity: 0,
                            color: color
                        },
                        {
                            opacity: 1,
                            color: "transparent",
                            duration: 0.4,
                            ease: 'linear'
                        }, 0)
                    .fromTo(el,
                        {
                            xPercent: randomX,
                            yPercent: randomY
                        },
                        {
                            xPercent: 0,
                            yPercent: 0,
                            duration: 1.4,
                            ease: 'Expo.easeOut'
                        }, 0)

            })

    }
}

export const charsExit = (_arr, color) => {
    if (_arr.length) {
        return _arr
            .map((el) => {
                const randomX = Math.random() * 100 - 50;
                const randomY = Math.random() * 100 - 50;

                gsap.timeline({
                    paused: false,
                })
                    .fromTo(el,
                        {
                            opacity: 1,
                            color: "transparent"
                        },
                        {
                            opacity: 0,
                            color: color,
                            duration: 0.4,
                            ease: 'linear'
                        }, 0)
                    .fromTo(el,
                        {
                            xPercent: 0,
                            yPercent: 0
                        },
                        {
                            xPercent: randomX,
                            yPercent: randomY,
                            duration: 1.4,
                            ease: 'Expo.easeOut'
                        }, 0)

            })

    }
}