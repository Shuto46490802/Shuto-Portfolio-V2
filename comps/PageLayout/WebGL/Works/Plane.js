import React, { useEffect, useRef, useState } from "react";

//Libraries
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animated } from '@react-spring/three';
import { useThree } from "@react-three/fiber";
//Components
import './Material';

const WorkListImagePlane = ({ color, tex, tex2, noiseTexture, args, imgShowOffsetX, imgShowOffsetY, images, imgIndex, isUp, mesh, material, ...props }) => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
    }, [])

    const { size } = useThree()

    useEffect(() => {

        // if (isReady) {

            const rotation = 0.05 + 7 * (Math.random() - 0.5) / 180 * Math.PI;

            gsap.timeline({
                defaults: { overwrite: true },
                onStart: () => {
                    material.current.uniforms.tex2.value = images[imgIndex];
                    if (isUp) {
                        material.current.uniforms.animationDir.value = -1;
                    } else {
                        material.current.uniforms.animationDir.value = 1;
                    }
                },
                onComplete: () => {
                    material.current.uniforms.tex.value = images[imgIndex];
                    material.current.uniforms.imgAnimationValue.value = 0;
                    material.current.uniforms.imgAnimationValue2.value = 0;
                }
            })
                .to(mesh.current.rotation,
                    {
                        z: rotation,
                        duration: 1,
                        ease: 'Power2.easeOut',
                        overwrite: true
                    }, 0)
                .to(mesh.current.scale,
                    {
                        x: .94,
                        y: .94,
                        duration: .06,
                        ease: 'Power2.easeOut',
                        overwrite: true
                    }, 0)
                .to(mesh.current.scale,
                    {
                        x: 1,
                        y: 1,
                        duration: .7,
                        ease: 'Power2.easeOut',
                        overwrite: false
                    }, 0.06)
                .fromTo(material.current.uniforms.imgAnimationValue,
                    {
                        value: 0
                    },
                    {
                        value: 1,
                        duration: .6,
                        ease: 'none'
                    }, 0)
                .fromTo(material.current.uniforms.imgAnimationValue2,
                    {
                        value: 0
                    },
                    {
                        value: 1,
                        duration: .76,
                        ease: 'Power2.easeOut'
                    }, 0)

        // }

    }, [imgIndex])


    return (
        <animated.mesh
            ref={mesh}
            {...props}
        >

            <planeBufferGeometry attach="geometry" args={args} />

            <workListImageMaterial
                ref={material}
                uvSize={[1, 1]}
                uvOffset={[0, 0]}
                uvSize2={[1, 1]}
                uvOffset2={[0, 0]}
                tex={tex}
                tex2={tex2}
                noiseTexture={noiseTexture}
                color={color}
                resolution={[size.width, size.height]}
            />

        </animated.mesh>
    );
}

export default WorkListImagePlane;