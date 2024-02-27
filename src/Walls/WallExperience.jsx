import { Html, MeshReflectorMaterial, CameraControls, Text, Stage, useVideoTexture, Text3D } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three";

import { Suspense, useEffect, useRef, useState } from "react";


import { CuboidCollider,Debug,Physics,RigidBody} from "@react-three/rapier";
import Player from './PlayerWalls'

export default function Experience()
{

    // useState wenn Room getriggert wird
    const [intersecting, setIntersection] = useState(false);

    // useState wenn Robo getriggert wird
    const [intersectingRobo, setIntersectionRobo] = useState(false);

    const onClickFunction = () => {
        console.log("clickecd")
    }

    const { showPerformance } = useControls({
        showPerformance:false
    })  

    return <>

        {showPerformance && <Perf position='top-left'/>}

        {/* <CameraControls makeDefault />  */}
        
        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />
        <Stage adjustCamera={false}>
            <Html position={[0, 2, 0]}>
                <div className= "top-3" style={{ textAlign: 'center', color: 'white', fontSize: '20px', opacity: 0.5 }}>
                    Control with W, A, S, D
                </div>
            </Html>
            
            <group position={ [ 8, 2, -13.001 ] }>
            <mesh scale-x={5.07} scale-y={3.57} >
                <planeGeometry />
                <meshStandardMaterial color="black"/>
            </mesh>
            <mesh castShadow scale-x={5} scale-y={3.5}>
                <planeGeometry />
                <VideoMaterial url="M09-1317.mp4" />
                <Text fontSize={0.05} font="fonts/PlayfairDisplay-Regular.ttf" position-y={0.54} position-x={-0.31} color="grey">
                IQAROS
                </Text>
            </mesh>
            </group>
            <group position={ [ 9, 2, -7 ] }>
            <mesh scale-x={5.07} scale-y={3.57} >
                <planeGeometry />
                <meshStandardMaterial color="black"/>
            </mesh>
            <mesh castShadow scale-x={5} scale-y={3.5}>
                <planeGeometry />
                <VideoMaterial url="M09-1317.mp4" />
                <Text fontSize={0.05} font="fonts/PlayfairDisplay-Regular.ttf" position-y={0.54} position-x={-0.31} color="grey">
                IQAROS
                </Text>
            </mesh>
            </group>
            <group position={ [ -3, 2, -13 ] }>
            <mesh scale-x={5.07} scale-y={3.57} >
                <planeGeometry />
                <meshStandardMaterial color="black"/>
            </mesh>
            <mesh castShadow scale-x={5} scale-y={3.5}>
                <planeGeometry />
                <VideoMaterial url="M09-1317.mp4" />
                <Text fontSize={0.05} font="fonts/PlayfairDisplay-Regular.ttf" position-y={0.54} position-x={-0.31} color="grey">
                IQAROS
                </Text>
            </mesh>
            </group>
            <group position={ [ -9.8, 2, -9 ] }>
            <mesh scale-x={5.07} scale-y={3.57} >
                <planeGeometry />
                <meshStandardMaterial color="black"/>
            </mesh>
            <mesh castShadow scale-x={5} scale-y={3.5}>
                <planeGeometry />
                <VideoMaterial url="M09-1317.mp4" />
                <Text fontSize={0.05} font="fonts/PlayfairDisplay-Regular.ttf" position-y={0.54} position-x={-0.31} color="grey">
                IQAROS
                </Text>
            </mesh>
            </group>
            <group position={ [ 8, 2, -13.001 ] }>
            <mesh scale-x={5.07} scale-y={3.57} >
                <planeGeometry />
                <meshStandardMaterial color="black"/>
            </mesh>
            <mesh castShadow scale-x={5} scale-y={3.5}>
                <planeGeometry />
                <VideoMaterial url="M09-1317.mp4" />
                <Text fontSize={0.05} font="fonts/PlayfairDisplay-Regular.ttf" position-y={0.54} position-x={-0.31} color="grey">
                IQAROS
                </Text>
            </mesh>
            </group>
    
            {/* Walls and Floor */}
            <mesh position-y={ 0 } position-z={-10} rotation-x={ - Math.PI * 0.5 } scale={ 60 }>
                <planeGeometry />
                <MeshReflectorMaterial resolution= {512} blur = {[1000,1000]} mixBlur={1} mirror={0.5} color="#494949"  />
            </mesh>
            
        <Player />
        </Stage>
    </>
}

function VideoMaterial({ url }) {
    const texture = useVideoTexture(url)
    return <meshBasicMaterial map={texture} toneMapped={false}  side={THREE.DoubleSide} />
  }