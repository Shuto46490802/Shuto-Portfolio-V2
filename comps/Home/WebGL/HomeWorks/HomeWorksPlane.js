import React, { useEffect, useRef } from "react";

//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three"

//Components
import '../../../PageLayout/WebGL/PageTransitionCover/Material';

const WorkImagePlane = ({ GLColor, video, material }) => {
    
    const noiseTexture = useLoader(TextureLoader, '/noiseTexture.webp');
    const bgTexture = useLoader(TextureLoader, '/bg.webp');
    const sandNoiseTexture = useLoader(TextureLoader, '/noise.png');
    // const tex = new THREE.VideoTexture(video)
    const { size } = useThree();

    return (
        <mesh>
            <planeBufferGeometry
                attach="geometry"
                args={[size.width, size.height]}
            />
            <pageTransitionCoverMaterial
                ref={material}
                bgTexture={bgTexture}
                noiseTexture={noiseTexture}
                sandNoiseTexture={sandNoiseTexture}
                bgUVSize={[1, 1]}
                noiseUVSize={[1, 1]}
                noiseUVOffset={[0, 0]}
                maxLength={size.width * 2}
                resolution={[size.width, size.height]}
                color={GLColor}
            />
        </mesh>
    );
}

export default WorkImagePlane;