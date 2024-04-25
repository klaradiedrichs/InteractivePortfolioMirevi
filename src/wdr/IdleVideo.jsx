import React from "react";
import { Html, RoundedBox, Text } from '@react-three/drei';

export default function IdleVideo({ position, text, videoSrc, name, beschreibung }) {
    
    const handleStart = () => {
        console.log("hovered")
    }
    
    return (
        <group position={position}>
        {/* <Text rotation={[0, 0, 0]}>START</Text> */}
        {/* <Text rotation={[0, 0, 0]} fontSize={0.4}>{text}</Text> */}
        {/* Video */}
        <Html position={[0,2.9,-1.7]} >
            <div>
                <video className='max-w-[2200px] h-[900px]' autoPlay loop>
                    <source src={videoSrc} type="video/webm" />
                </video>
            </div>
        </Html>
        
        {/* Text */}
        <group rotation={[0, -1.57, 0]} position={position}>
            {/* transparent Plane */}
            <mesh position={[0,2.7,0.5]} onPointerOver={handleStart}>
                <planeGeometry args={[1.8,5,1]}/>
                <meshBasicMaterial opacity={0.2} transparent />
            </mesh> 
            {/* Start */}
            <group>
                <mesh position={[0,0,0.5]} onClick={handleStart} >
                    <planeGeometry args={[0.7,0.3,1]} />
                    <meshStandardMaterial color="green" opacity={0.3} transparent/>
                </mesh>
                <Text position={[0,0,0.52]} color="white" fontSize={0.15}>
                    START
                    <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white"/> 
                </Text>          
            </group>
            {/* Name und Beschreibung*/}
            <group>
                <mesh position={[-0.4,5.6,0.5]} onClick={handleStart} >
                    <planeGeometry args={[1.8,0.7,1]} />
                    <meshStandardMaterial color="black" opacity={0.3} transparent/>
                </mesh>
                <Text position={[-0.4,5.6,0.52]} color="white" fontSize={0.2}>
                    {name}
                    <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white"/> 
                </Text>          
                <Text position={[-0.4,5.4,0.52]} color="white" fontSize={0.15}>
                    {beschreibung}
                    <meshStandardMaterial opacity={1} color="#FFFFFF" emissive="white"/> 
                </Text>          
            </group>
            
        </group>
        </group>
    );
}