import { Environment, Stage, Float, Text, ContactShadows, TransformControls} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Player from './Player'
import PlayerOld from './PlayerOld'

  
export default function Experience({ cameraRoad })
{
    const textRef = useRef();
    
    return <>

    <Stage adjustCamera={false} environment="apartment" intensity={0.7}>      

       {/* <Environment background preset="dawn" blur={0.9}></Environment> */}
       {/* CameraStart */}
        <mesh position={[0,0.1,0]} scale={0.3} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="grey" />
        </mesh>
        {/* Mitte */}
        <mesh castshadow position={[0,0.1,-30]} scale={0.3} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="darkgrey" />
        </mesh>
        {/* First */}
        <group>
            <mesh castShadow position={[0,3,-8]} scale-x={7.5} scale-y={4}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
            <Text fontSize={0.3} position={[0,3,-7]}>First</Text>
        </group>
        
        {/* Second Project */}
        <group>
            <mesh castShadow position={[20,3,-48]} scale-x={7.5} scale-y={4}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        {/* Third Project */}
        <group>
            <mesh castShadow position={[50,3,-88]} scale-x={7.5} scale-y={4}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        
        {/* Fourth Project */}
        <group>
            <mesh castShadow position={[80,3,-128]} scale-x={7.5} scale-y={4}>
                <planeGeometry />
                <meshStandardMaterial color="dimgrey" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[0,0,-25]} >Second</Text>
        </group>
        <ContactShadows color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} />

        {/* Player / Camera Controller */}
        <Player cameraRoad={cameraRoad}/>
        {/* <PlayerOld cameraRoad={cameraRoad}/> */}
      </Stage>
    </>
}