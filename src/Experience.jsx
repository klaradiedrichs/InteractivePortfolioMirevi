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
        {/* Performance Fenster */}

        {/* um sich in der Szene umzuschauen (nur für Testzwecke)  */}
        
        {/* <Environment preset="night" background blur={0.2} /> */}
        <Stage>
            {/* NULLPUNKT */}
            <Float>
            <mesh position={[0,0,0]} scale={ 0.2 }>
                <boxGeometry />
                <meshStandardMaterial color="purple" />
            </mesh>
            </Float>
            {/* First Project */}
            <group>
                <mesh position-y={ 1 } position-x={ -2 } onClick={handleMeshClick} >
                    <boxGeometry/>
                    <meshStandardMaterial color="orange" />
                </mesh>
                <Text fontSize={0.3} position={[-2,2,0]}>Kassia</Text>
            </group>
            {/* Second Project */}
            <group>
                <mesh position={[-2,1,-7]} onClick={handleMeshClick}>
                    <sphereGeometry />
                    <meshStandardMaterial color="blue" />
                </mesh>
            </group>
        </Stage>
        <Player newRotation={newRotation} />
    </>
}