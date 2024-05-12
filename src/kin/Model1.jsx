import {OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from "three";
import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

export default function Kin()
{
    
    const { scene, animations } = useGLTF('./AvatarAnim003.glb');
    const { actions } = useAnimations(animations, scene);

    useEffect(() => {
        actions.animDreiFinal.play();
      });

    return <>
        <primitive castShadow position={[0,-1.5,-3]} object={scene} />
        
    </>
}

