import React, { useEffect, useRef, useState } from "react"
//Components
//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import ImagePlane from "../../../Home/WebGL/IntroImage/Plane";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SlideShowImage = ({ color, slideShowWrapper, setIsCharAnimReady, setIsHoverReady2, isPageReady, ...props }) => {

    const imageTextures = [
        useLoader(TextureLoader, "/images/Profile/slideshow/slideShow1.jpg"),
        useLoader(TextureLoader, "/images/Profile/slideshow/slideShow2.jpg"),
        useLoader(TextureLoader, "/images/Profile/slideshow/slideShow3.jpg"),
        useLoader(TextureLoader, "/images/Profile/slideshow/slideShow4.jpg"),
        useLoader(TextureLoader, "/images/Profile/slideshow/slideShow5.jpg"),
        useLoader(TextureLoader, "/images/Profile/slideshow/slideShow6.jpg"),
        useLoader(TextureLoader, "/images/Profile/slideshow/slideShow7.jpg"),
        useLoader(TextureLoader, "/images/Profile/slideshow/slideShow8.jpg"),
    ];
    const args = [
        1062,
        704,
        531,
        357
    ];
    const imgShowOffsetX = args[0] / 10
    const imgShowOffsetY = -args[0] / 8
    const mesh = useRef()
    const material = useRef()

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (isPageReady) {
            if (material.current) {

                const trigger = {
                    trigger: slideShowWrapper.current,
                    start: "top bottom"
                }

                mesh.current.imgShowOffsetX = imgShowOffsetX
                mesh.current.imgShowOffsetY = imgShowOffsetY,

                    gsap.timeline({
                        delay: 1,
                        onUpdate: () => {

                            if (material.current) {
                                var e = 1 - material.current.uniforms.animationValue1.value;

                            }

                            if (mesh.current) {
                                mesh.current.position.x = mesh.current.imgShowOffsetX * e
                                mesh.current.position.y = mesh.current.imgShowOffsetY * e
                                mesh.current.updateMatrix()
                            }

                        },
                        scrollTrigger: trigger,
                        onComplete: () => {
                            setIsCharAnimReady(true)
                            setIsHoverReady2(true)
                        },
                        // onStart: () => {
                        //     if (isReady) {
                        //         setIsReady(false)
                        //     }
                        // }
                    })
                        .fromTo(material.current.uniforms.animationValue1,
                            {
                                value: 0
                            },
                            {
                                duration: 1,
                                value: 1,
                                ease: "Power2.easeOut"
                            }, 0)
                        .fromTo(material.current.uniforms.animationValue2,
                            {
                                value: 0
                            },
                            {
                                duration: 1,
                                value: 1,
                                ease: "Power2.easeOut"
                            }, 0)
                        .fromTo(material.current.uniforms.alpha,
                            {
                                value: 0
                            },
                            {
                                duration: .4,
                                value: 1,
                                ease: "none"
                            }, 0)

            }
        }
    }, [isPageReady])

    //toggle images
    const [image, setImage] = useState(imageTextures[0])
    useEffect(() => {
        setTimeout(() => {
            let counter = 0;

            const interval = setInterval(() => {

                if (counter === 7) {
                    counter = 0;
                } else {
                    counter++;
                }
                setImage(imageTextures[counter])
            }, 300);

            return () => clearInterval(interval);
        }, 1000)
    }, [])


    return (
        <ImagePlane
            tex={image}
            args={args}
            color={color}
            mesh={mesh}
            material={material}
            // isGLFirstLoaded={isGLFirstLoaded}
            // setIsGLFirstLoaded={setIsGLFirstLoaded}
            // isReady={isReady}
            // setIsReady={setIsReady}
            // isFirstAnimationReady={isFirstAnimationReady}
            {...props}
        />
    );
}

export default SlideShowImage;