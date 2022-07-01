import React, { Suspense, useEffect, useRef } from 'react';
//Libraries
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
//Compoenents
import PageTransitionPlane from './WebGL/PageTransitionCover/Plane';
import { useGlobalStates } from "../context/global-states";
import Frame from './Frame';

const PageTransition = ({ material, pageTransition, center }) => {

    const { GLColor } = useGlobalStates()
 
    return (
        <div ref={pageTransition} className="page-transition">
            <Frame />
            <Canvas
                linear={true}
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