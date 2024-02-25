import { Html, MeshReflectorMaterial, CameraControls, Text } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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

    // Model 1

    // Model 2
    // Levas

    const { showPerformance } = useControls({
        showPerformance:false
    })  

    const { scale, position, visible } = useControls('Room', {
        position:
        {
            value: { x: -6.5, y: 0, z:-8 },
            step: 0.01,
            joystick: 'invertY'
        },
        scale:
        {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        },
        visible: true
    })

    const { positionCube,scaleCube, visibleCube } = useControls('Robo', {
        scaleCube:
        {
            value: 1.5,
            step: 0.01,
            min: 0,
            max: 5
        },
        positionCube:
        {
            value: { x: 10, y: 0, z: -5.5 },
            step: 0.01,
            joystick: 'invertY'
        },
        visibleCube: true
    })

    return <>

        {showPerformance && <Perf position='top-left'/>}

        {/* <CameraControls makeDefault />  */}
        
        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />
        
        <Physics>

        {/* Placeholder Objects */}
        <RigidBody>
            <mesh castShadow position={ [ 12, 2, 7 ] } scale={2.5}>
                <boxGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
        </RigidBody>

        <RigidBody>
            <mesh castShadow position={ [ 9.8, 2, 0 ] } scale={1.5}>
                <boxGeometry />
                <meshStandardMaterial color="red" />
            </mesh>
        </RigidBody>

        {/* Walls and Floor */}
        <RigidBody type = "fixed">
            <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 30 }>
                <planeGeometry />
                <MeshReflectorMaterial resolution= {512} blur = {[1000,1000]} mixBlur={1} mirror={0.5} color="#494949"  />
            </mesh>
            <mesh position={ [0, 2.5,-15 ]} scale={ [30 , 15 ,10] }>
                <planeGeometry />
                <meshStandardMaterial color="#DAC58C"  />
            </mesh>
            <mesh position={ [15,2.5,0] } rotation-y={ - Math.PI * 0.5 } scale={ [30 , 15 ,10] }>
                <planeGeometry />
                <meshStandardMaterial color="#DAC58C"  />
            </mesh>
            <mesh position={ [-15, 2.5, 0] } rotation-y={ - Math.PI * -0.5 } scale={ [30 , 15 ,10] }>
                <planeGeometry />
                <meshStandardMaterial color="#DAC58C"  />
            </mesh>
            <mesh position={ [0, 2.5, 15] } rotation-y={ - Math.PI * -1 } scale={ [30 , 15 ,10] }>
                <planeGeometry />
                <meshStandardMaterial color="#DAC58C"  />
            </mesh>
        </RigidBody>

        <Player />

        </Physics>
    </>
}