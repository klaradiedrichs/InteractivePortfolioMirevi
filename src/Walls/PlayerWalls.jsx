import { useRapier, RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls, PerspectiveCamera, PointerLockControls, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Player()
{
    const cameraRef = useRef()
    const [ subscribeKeys, getKeys ] = useKeyboardControls()

    // Use this to track camera position and rotation
    const cameraPosition = new THREE.Vector3(0, 1, 0);
    const cameraRotation = new THREE.Euler(0, 0, 0);
    cameraPosition.y += 0.6; 

    useFrame((state, delta) =>
    {
        /**
         * Controls
         */
        const { forward, backward, leftward, rightward } = getKeys()


        /**
         * Camera
         */
        // Update camera position and rotation based on user input
        const moveSpeed = 3;

        if (forward) cameraPosition.z -= moveSpeed * delta;
        if (backward) cameraPosition.z += moveSpeed * delta;
        if (leftward) cameraPosition.x -= moveSpeed * delta;
        if (rightward) cameraPosition.x += moveSpeed * delta;

        cameraRef.current.position.copy(cameraPosition);
        cameraRef.current.rotation.copy(cameraRotation);
    })

    return (
    
    <>
    <PerspectiveCamera ref={cameraRef} makeDefault fov={70} position-y={9}/>
    </>
    )
}