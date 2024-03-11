import {OrbitControls, useAnimations } from '@react-three/drei'
import * as THREE from "three";
import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
export default function Kin()
{
    
    const group = useRef();
    const gltf = useLoader(GLTFLoader, '/nurTPosemitAnimation.glb');

    const { scene, animations } = gltf;
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        actions.anim.play();
      });

    return <>
       
        
        <group ref={group} scale={0.05} position={[2,-4.5,-12]}>
            <primitive object={scene} />
        </group>

    </>
}

