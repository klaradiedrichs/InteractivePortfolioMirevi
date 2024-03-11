import {OrbitControls, useAnimations } from '@react-three/drei'
import * as THREE from "three";
import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

export default function Kin()
{
    
    const group = useRef();
    const gltf = useLoader(GLTFLoader, '/TPosemitSitzendAnimTest.glb');

    const { scene, animations } = gltf;
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        actions.animSitzend.play();
      });

    return <>
       
        
        <group ref={group} position={[-1,-5,-10]}>
            <primitive object={scene} />
        </group>

    </>
}

