import React, { useEffect, useRef } from "react"
//Components
import ImagePlane from "../../../Home/WebGL/HomeProfile/Plane"
//Libraries
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { gsap } from 'gsap';

const IntroImage = ({ color, setIsHoverReady, isPageLoaded, isEntering, ...props }) => {

    const imageTexture = useLoader(TextureLoader, "/static/images/Profile/profileIntro.jpg");
    const args = [
        1056,
        699.42,
        528,
        350
    ];
    const imgShowOffsetX = -args[0] / 10
    const imgShowOffsetY = -args[0] / 8
    const mesh = useRef()
    const material = useRef()

    useEffect(() => {
        if (isPageLoaded) {
            if (!isEntering) {
                if (material.current) {

                    mesh.current.imgShowOffsetX = imgShowOffsetX
                    mesh.current.imgShowOffsetY = imgShowOffsetY,

                        gsap.timeline({
                            delay: 2,
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
                            onComplete: () => {
                                // if (!isGLFirstLoaded) {
                                //     setIsGLFirstLoaded(true)
                                // }

                                setIsHoverReady(true)
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
        }
    }, [isEntering, isPageLoaded])

    return (
        <ImagePlane
            tex={imageTexture}
            args={args}
            color={color}
            mesh={mesh}
            material={material}
            {...props}
        />
    );
}

export default IntroImage;