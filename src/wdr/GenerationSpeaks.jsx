import React, { useRef, useEffect, useState } from "react";
import { Html, Text, PerspectiveCamera, Environment, OrbitControls , RoundedBox} from '@react-three/drei';
import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import IdleVideo from './IdleVideo';
export default function Experience() {
    const videoRef = useRef();
    const [idle, setIdle] = useState(true);

    const handleStart = () => {
        setIdle(false);
    }

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 0]}/>
            <OrbitControls enablePan={false} target={[1, 0, 0]} />
            <Environment preset='apartment' background blur={0.4}>
            </Environment>

            {/* Orientierung */}
            {/* <mesh position={[5,2,0]}>
                <boxGeometry />
                <meshBasicMaterial opacity={0.5} transparent/>  
            </mesh> */}

            {idle && (
                /* Idle Videos */
                <group> 
                    
                    <IdleVideo position={[4, -1.4, 1.8]} name="Leonie" beschreibung="und Klimawandel weltweit" videoSrc="/videos/test2.webm" />
                    <IdleVideo position={[4, -1.4, 0.6]} name="Aaron" beschreibung="und der Wald" videoSrc="/videos/test2.webm" />
                    <IdleVideo position={[4, -1.4, -0.6]} name="Anna" beschreibung="und die Landwirtschaft" videoSrc="/videos/test2.webm" />
                    <IdleVideo position={[4, -1.4, -1.8]} name="Tina" beschreibung="und die Braunkohle" videoSrc="/videos/test2.webm" />
             
                    {/* <Text position={[5, 0, 0]} rotation={[0, -1.5, 0]} fontSize={0.4} color="black">Leonie und Klimawandel weltweit</Text> */}
                </group>
            )}
        </>
    );
}
