import React, { useRef } from 'react';
import {Canvas} from "@react-three/fiber";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export default function Scene() {
  const cameraRef = useRef();
  const controlsRef = useRef();

  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight args={[0xffffbb, 0x080820, 0.7]} />

      <spotLight position={[4, 7, 23]} intensity={0.5} />
      <spotLight position={[4, 7, -23]} intensity={0.5} />

      <mesh position={[-0.041, 1.9, -1.21]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color={0x00ff00} />
      </mesh>

      <orbitControls
        ref={controlsRef}
        args={[cameraRef.current, document.body]}
      />
      <camera
        ref={cameraRef}
        position={[-1.57, -1.95, 1.64]}
        fov={45}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={10000}
      />
    </>
  );
}

