import React, { Suspense, useEffect, useRef } from 'react';
//Libraries
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
//Compoenents
import PageTransitionPlane from './WebGL/PageTransitionCover/Plane';
import { useGlobalStates } from "../context/global-states";
import Frame from './Frame';

const PageTransition = ({ material, pageTransition, center }) => {

    const { GLColor, isPageLoaded } = useGlobalStates()
    const canvas = useRef()

    useEffect(() => {
        if (isPageLoaded) {
            canvas.current.width = window.innerWidth
            canvas.current.height = window.innerHeight
            window.addEventListener("resize", () => {
                canvas.current.width = window.innerWidth
                canvas.current.height = window.innerHeight
            })
            return () => {
                window.removeEventListener("resize", () => {
                    canvas.current.width = window.innerWidth
                    canvas.current.height = window.innerHeight
                })
            }
        }
    }, [isPageLoaded])

    return (
        <div ref={pageTransition} className="page-transition">
            <Frame />
            <Canvas
                camera={{ position: [0, 0, 760] }}
                linear={true}
                ref={canvas}
            >
                <Suspense
                    fallback={<Html center className="loading" children="" />}
                >
                    <PageTransitionPlane color={GLColor} material={material} center={center} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default PageTransition;