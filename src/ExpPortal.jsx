import { Environment, Stage, Float, Text, ContactShadows, TransformControls, MeshDistortMaterial, MeshReflectorMaterial, Sparkles, useCursor, CameraControls, OrbitControls, MeshPortalMaterial, useTexture, RoundedBox} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import Player from './Player'
import Frame from './fFrame'
import * as THREE from "three";

  
function ExpPortal({ cameraRoad })
{
    
    const [active, setActive] = useState(null);
    const [hovered, setHovered] = useState(null);
    useCursor(hovered);
    const controlsRef = useRef();
    const scene = useThree((state) => state.scene);
    
    // load texture

    return (
        <>
        <ambientLight intensity={0.5} />
        <Environment preset="night" background blur={0.4}></Environment>
        <OrbitControls />
        {/* First */}
        
        
        <Frame name="Fraktale" color="#38adcf" texture={
          "textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"
        }> 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>

        <Frame name="First" color="#38adcf" texture={"textures/anime_art_style_a_water_based_pokemon_like_environ.jpg"} position-x={3}> 
            <mesh>
                <planeGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </Frame>

        <Player cameraRoad={cameraRoad}/>
        </>
        )
    
}

export default ExpPortal;