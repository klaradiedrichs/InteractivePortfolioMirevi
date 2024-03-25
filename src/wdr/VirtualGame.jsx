import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'


export default function VirtualGame () {

    return(

        <>
        {/* <Environment files='./UnderwaterWorld.hdr' background /> */}
        <mesh>
            <sphereGeometry />
            <meshBasicMaterial />
        </mesh>
        <ArWing />
        </>
    )
}

function ArWing() {
    const [shipPosition, setShipPosition] = useState();
    const cameraRef = useRef();

    const ship = useRef();
    useFrame(({ mouse }) => {
      setShipPosition({
        position: { x: mouse.x * 6, y: mouse.y * 2},
        rotation: { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 },
      });
    });
    // Update the ships position from the updated state.
    useFrame(() => {
      ship.current.rotation.z = shipPosition.rotation.z;
      ship.current.rotation.y = shipPosition.rotation.x;
      ship.current.rotation.x = shipPosition.rotation.y;
      ship.current.position.y = shipPosition.position.y;
      ship.current.position.x = shipPosition.position.x;
    });
  
    // const { nodes } = useLoader(GLTFLoader, "models/arwing.glb");
  
    return (
        <>
        <PerspectiveCamera ref={cameraRef} makeDefault fov={40} position-z={-3}/>
        <group ref={ship} position-z={-5}>
            <mesh scale={0.5}>
                <boxGeometry />
                <meshStandardMaterial
                    attach="material"
                    color="white"
                    roughness={1}
                    metalness={0} />
            </mesh>
        </group>
        </>
    );
  }