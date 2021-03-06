import React, { useEffect } from "react";
//Libraries
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
//Components
import './Material';

const PageTransitionPlane = ({ color, material, center }) => {
    
    const bgTexture = useLoader(TextureLoader, '/bg.webp');
    const noiseTexture = useLoader(TextureLoader, '/noiseTexture.webp');
    const sandNoiseTexture = useLoader(TextureLoader, '/noise.png');
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
                color={color}
                center={center}
            />
        </mesh>
    );
}

export default PageTransitionPlane;