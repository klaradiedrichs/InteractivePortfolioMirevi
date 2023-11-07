import { Environment, Stage, Float, Text} from '@react-three/drei'
import React, { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Player from './Player'

  
export default function Experience()
{

    const [newRotation, setNewRotation] = useState(null);

    const handleMeshClick = (e) => {
        setNewRotation([0, 0.2, 0]);

      };
    
    return <>

      <Stage adjustCamera={false}>
        {/* NULLPUNKT */}
        <mesh position={[0,0,0]} scale={ 0.2 }>
            <boxGeometry />
            <meshStandardMaterial color="purple" />
        </mesh>
        {/* First Project */}
        <group>
            <mesh castShadow position-y={ 1 } position-x={ -2 } onClick={handleMeshClick} >
                <boxGeometry/>
                <meshStandardMaterial color="orange" />
            </mesh>
            <Text fontSize={0.3} position={[-2,2,0]}>Kassia</Text>
        </group>
        {/* Second Project */}
        <group>
            <mesh castShadow position={[-2,1,-4]} onClick={handleMeshClick}>
                <sphereGeometry />
                <meshStandardMaterial color="blue" />
            </mesh>
        </group>
        {/* Third Project */}
        <group>
            <mesh castShadow={true} receiveShadow={true} position={[-2,1,-15]} onClick={handleMeshClick}>
                <sphereGeometry />
                <meshStandardMaterial color="skyblue" />
            </mesh>
        </group>
        <Player newRotation={newRotation} />
      </Stage>
    </>
}