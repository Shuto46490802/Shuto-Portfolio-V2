import React, { useEffect, useRef } from "react";
//Components
import ImagePlane from "./Plane";
//Libraries
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HomeProfileImage = ({ color, imageWrapperRef, setIsHoverReady, isEntering, ...props }) => {

    const imageTexture = useLoader(TextureLoader, "/static/images/Homepage/homeProfile.jpg");
    const args = [
        450,
        679,
        204,
        308
    ];
    const mesh = useRef()
    const material = useRef()
    const imgShowOffsetX = - args[0] / 10
    const imgShowOffsetY = - args[0] / 8

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (!isEntering) {
            if (material.current) {

                const trigger = {
                    trigger: imageWrapperRef.current,
                    start: "top bottom"
                }

                mesh.current.imgShowOffsetX = imgShowOffsetX
                mesh.current.imgShowOffsetY = imgShowOffsetY,

                    gsap.timeline({
                        delay: 1,
                        scrollTrigger: trigger,
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
    }, [isEntering])

    return (
        <ImagePlane
            tex={imageTexture}
            args={args}
            delay={3}
            color={color}
            mesh={mesh}
            material={material}
            {...props}
        />
    );
}

export default HomeProfileImage;