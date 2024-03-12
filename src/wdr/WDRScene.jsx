import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html,Environment, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { Physics } from '@react-three/rapier';
import { useKeyboardControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { Button } from "r3dy";

export default function Experience() {
 
    const [virtualGame, setVirtualGame] = useState(false)
    const [generationSpeaks, setGenerationSpeaks] = useState(false)

    const group = useRef();
    const gltf = useLoader(GLTFLoader, '/earth.glb');

    const { scene } = gltf;
    
    const handleGoButton = () => {
        // show options

    }
  return (
    <>
        <OrbitControls target={[-1,1.8,-84]}/>
        <Environment preset="dawn"></Environment>
        <group ref={group} position={[0,1,0]} scale={1.5}>
            <primitive object={scene} />
        </group>
        <Text color="#38adcf" position-z={5} >Die Erde ist in Gefahr</Text>
        <Text position-z={5} position-y={-1}>Erlebe warum</Text>
        <mesh position={[0, -2,5]}>
            <Button text="Los gehts" color="black" onPointerOver="#ffffff" font="fonts/PlayfairDisplay-Regular.ttf" scale={0.3} />
        </mesh>

        {/* Generation Erde */}
        <group position-x={-7} position-z={3}>
            <Text fontSize={0.3}> Erlebe die Generation Erden</Text>
            <mesh position={[0, -2,0]}>
                <Button text="Virtuelle Begegnung starten" color="black" onPointerOver="#ffffff" font="fonts/PlayfairDisplay-Regular.ttf" scale={0.3} />
            </mesh>
        </group>
        {/* if generationSpeaks true*/}
        {/* <GenerationSpeaks /> */}

        {/* virtual Game */}
        <group position-x={7} position-z={3} >
        <Text fontSize={0.3}>Erlebe die Bedrohung der Meere</Text>
        <mesh position={[0, -2,0]}>
            <Button text="Virtuelles Game starten" color="black" onPointerOver="#ffffff" font="fonts/PlayfairDisplay-Regular.ttf" scale={0.3} />
        </mesh>
        </group>
        {/* if virtualGame true */}
        {/* <VirtualGame /> */}
    </>
  );
}