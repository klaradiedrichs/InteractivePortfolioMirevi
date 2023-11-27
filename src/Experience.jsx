import { Environment, Stage, Float, Text, ContactShadows, TransformControls} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Player from './Player'

  
export default function Experience({ cameraRoad })
{
    const textRef = useRef();
    
    return <>

    <Stage adjustCamera={false} intensity={0.5} shadows="contact">      

       {/* <Environment background preset="dawn" blur={0.9}></Environment> */}
       {/* CameraStart */}
        <mesh position={[0,0.1,0]} scale={0.3} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="purple" />
        </mesh>
        {/* Road */}
        <mesh position={[0,-0.1,-17]} scale-z={ 30 } scale-y={0.01} scale-x={0.3}>
            <boxGeometry />
            <meshStandardMaterial color="gray" />
        </mesh>
        {/* First */}
        <group>
            <mesh castShadow position={[0,3.5,4]} scale-x={7.5} scale-y={4}>
                <planeGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
            <Text fontSize={0.3} position={[0,6,-10]}>First</Text>
        </group>
        
        {/* Second Project */}
        <group>
            <mesh castShadow position={[0,5,-25]} scale-x={7.5} scale-y={4}>
                <planeGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        
        {/* Third Project */}
        <group>
            <mesh castShadow={true} position={[0,3.5 ,4]} scale={0.3}>
                <sphereGeometry />
                <meshStandardMaterial color="skyblue" />
            </mesh>
        </group>
        <ContactShadows color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} />

        {/* Player / Camera Controller */}
        <Player cameraRoad={cameraRoad}/>
      </Stage>
    </>
}