import React, { useState } from "react";
import { Html, RoundedBox, Text , useVideoTexture} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three'
import { useStore } from '../stores/useStore';

export default function IdleVideo({ position, text, videoSrc, name, beschreibung, className, htmlPosition, onStart }) {
    
    const [startVideo, setStartVideo] = useState(false);
    const [hover, setHovered] = useState(false);
    const idleVideo = useStore((state) => state.idleVideo);
    const setIdleVideo = useStore((state) => state.setIdleVideo);
    
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
                    <meshStandardMaterial color="#1E4738" opacity={0.5} transparent/>
                </mesh>
                <Text  position={[0,0,0.01]} color="white" fontSize={0.08}>
                    START
                    <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white"/> 
                </Text>          
            </group>


            {/* Name und Beschreibung*/}
            <group position={[0,1.8,-0.1]}>
                <mesh onClick={handleStart} >
                    <planeGeometry args={[1,0.35,1]} />
                    <meshStandardMaterial color="black" opacity={0.4} transparent/>
                    <Text position={[-0.1,0.01,0.01]} anchorX="right" color="white" fontSize={0.12}>
                        {name}
                        <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white"/> 
                    </Text>          
                    <Text position={[0,-0.1,0.01]} color="white" fontSize={0.08}>
                        {beschreibung}
                        <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white"/> 
                    </Text>  
                </mesh>
                        
            </group>
            </group>
            )}
            
        </group>
    );
}