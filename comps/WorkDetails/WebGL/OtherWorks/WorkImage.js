import React, { useEffect, useRef } from "react"
//Components
import WorkListImagePlane from "../../../PageLayout/WebGL/Works/Plane";
//Libraries
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WorkImage = ({ works, color, imgIndex, isUp, setIsFirstDone, imageWrapperRef, setIsHoverReady, isPageReady, ...props }) => {

    const imageTextures = useLoader(TextureLoader, works.map((work) => work["main-image"]));
    const noiseTexture = useLoader(TextureLoader, '/static/noiseTexture.webp');
    const args = [
        1120,
        700,
        560,
        350
    ]
    const imgShowOffsetX = - args[0] / 10
    const imgShowOffsetY = - args[0] / 8
    const mesh = useRef();
    const material = useRef()

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (isPageReady) {
            if (material.current) {

                const trigger = {
                    trigger: imageWrapperRef.current,
                    start: "top bottom"
                }

                mesh.current.imgShowOffsetX = imgShowOffsetX;
                mesh.current.imgShowOffsetY = imgShowOffsetY;

                gsap.timeline({
                    scrollTrigger: trigger,
                    delay: 1,
                    onUpdate: () => {
                        if (material.current) {
                            var e = 1 - material.current.uniforms.animationValue1.value;
                        }

                        if (mesh.current) {
                            mesh.current.position.x = mesh.current.imgShowOffsetX * e
                            mesh.current.position.y = mesh.current.imgShowOffsetY * e
                            mesh.current.updateMatrix();
                        }
                    },
                    onComplete: () => {
                        setTimeout(() => {
                            setIsFirstDone(true)
                        }, 1000)
                        setIsHoverReady(true)
                    }
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

            };
        }
    }, [isPageReady])

    return (
        <WorkListImagePlane
            images={imageTextures}
            tex={imageTextures[0]}
            tex2={imageTextures[0]}
            noiseTexture={noiseTexture}
            color={color}
            args={args}
            imgIndex={imgIndex}
            isUp={isUp}
            mesh={mesh}
            material={material}
            {...props}
        />
    );
}

export default WorkImage;