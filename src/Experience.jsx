import { Environment, Stage, Float, Text, ContactShadows, TransformControls} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Player from './Player'

  
export default function Experience({ cameraRoad })
{
    const textRef = useRef();
    
    return <>

      {/* <Stage intensity={0.5} environment="city" adjustCamera={false} shadows={{ type: 'accumulative', bias: -0.001 }}> */}
       
       <Environment background preset="dawn" blur={0.5}></Environment>
       {/* CameraStart */}
        <mesh position={[0,0,0]} scale={0.3}>
            <boxGeometry />
            <meshStandardMaterial color="purple" />
        </mesh>
        {/* Road */}
        <mesh position={[0,-0.1,-17]} scale-z={ 30 } scale-y={0.01} scale-x={0.3}>
            <boxGeometry />
            <meshStandardMaterial color="gray" />
        </mesh>

        {/* Second Project */}
        <group>
            <mesh castShadow position={[7.5,3.5,-25]} rotation-y={ - Math.PI * 0.12 } scale-x={7.5} scale-y={4}>
                <planeGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
                <Text ref={textRef} color="black" fontSize={2} rotation={[-1.5,-0.01, -0.39]} position={[7.5,0,-25]} >Third</Text>
        </group>
        <group>
            <mesh castShadow position={[-7.5,3.5,0]} rotation-y={ - Math.PI * -0.12 } scale-x={7.5} scale-y={4}>
                <planeGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
            <Text fontSize={0.3} position={[-7.5,6,0]}>Second</Text>

        </group>
        {/* Third Project */}
        <group>
            <mesh castShadow={true} position={[-2,1,-15]}>
                <sphereGeometry />
                <meshStandardMaterial color="skyblue" />
            </mesh>
        </group>
        <ContactShadows color="black" resolution={1024} frames={1} scale={10} blur={1.5} opacity={0.65} far={0.5} />

        {/* Player / Camera Controller */}
        <Player cameraRoad={cameraRoad}/>
      {/* </Stage> */}
    </>
}