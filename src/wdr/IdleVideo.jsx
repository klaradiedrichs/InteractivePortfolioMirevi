import React, { useState } from "react";
import { Html, RoundedBox, Text , useTexture, useVideoTexture} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three'
import { useStore } from '../stores/useStore';

export default function IdleVideo({ position, text, videoSrc, name, beschreibung, className, htmlPosition, onStart }) {
    
    const [startVideo, setStartVideo] = useState(false);
    const [hover, setHovered] = useState(false);
    const idleVideo = useStore((state) => state.idleVideo);
    const setIdleVideo = useStore((state) => state.setIdleVideo);
    const infoField = useTexture('/textures/infoField.png')
    const startButton = useTexture('/textures/startField.png')
    const { opacity: idleVideosOpacity } = useSpring({
        opacity: idleVideo ? 1 : 0, // Opacity is 1 if idleVideo is true, otherwise 0
    });

    const handleStart = () => {
        console.log("clicked")
        onStart();
        // setStartVideo(true);
        setHovered(false);
    }

    const texture = useVideoTexture(videoSrc);

    
    return (
        <group rotation={[0, -1.57, 0]} position={position}>
            {/* Video */}
            <mesh>
                <planeGeometry args={name === "Leonie" ? [2.2,3.5,1] : [2.7,5,1]} />
                <animated.meshBasicMaterial map={texture} opacity={idleVideosOpacity} transparent />
            </mesh>
            {/* transparent Plane für Hover */}
            {idleVideo && (
            <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position-z={-0.43}>
                <planeGeometry args={[1.1,3.6,1]}/>
                <meshBasicMaterial opacity={0} transparent />    
            </mesh> 
            )}

            {hover && (
            <group>
            {/* Start */}
            <group position={[0,-1.6,0.02]}>
                <mesh onClick={handleStart}>
                    <planeGeometry args={[0.5,0.17,1]} />
                    <meshStandardMaterial map={startButton} opacity={0.9} transparent/>
                </mesh>
                <Text  position={[0,0,0.01]} color="white" fontSize={0.08}>
                    START
                    <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white" emissiveIntensity={5}/> 
                </Text>          
            </group>

            
            {/* Name und Beschreibung*/}
            <group position={[0,1.8,0.15]}>
                <mesh onClick={handleStart} >
                    <planeGeometry args={[1.1,0.4,1]} />
                    <meshStandardMaterial map={infoField} opacity={0.5} transparent/>
                </mesh>
                <group position={[-0.44,0,0]}>
                <Text position={[0,0,0.1]} anchorX="left" color="white" fontSize={0.12}>
                    {name}
                    <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white" intensity={2}/> 
                </Text>          
                <Text position={[0,-0.1,0.01]} anchorX="left" color="white" fontSize={0.08}>
                    {beschreibung}
                    <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white"/> 
                </Text> 
                </group> 
            </group>
            </group>
            )}
            
        </group>
    );
}