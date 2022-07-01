import { useEffect, useRef } from "react";
//Components
import "./Material";
//Libraries
import gsap from "gsap";
import { animated } from '@react-spring/three';

const ImagePlane = ({
    tex,
    color,
    args,
    material,
    mesh,
    // isGLFirstLoaded,
    // setIsGLFirstLoaded,
    // isReady,
    // setIsReady,
    // isFirstAnimationReady,
    ...props
}) => {

    return (
        <animated.mesh
            ref={mesh}
            {...props}
        >

            <planeBufferGeometry attach="geometry" args={args} />

            <profileImageMaterial
                ref={material}
                tex={tex}
                color={color}
                toneMapped={false}
            />

        </animated.mesh>
    );
}

export default ImagePlane;