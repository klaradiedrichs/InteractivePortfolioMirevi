import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Html, MeshReflectorMaterial, PointerLockControls, useVideoTexture } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { Physics } from '@react-three/rapier';
import { useKeyboardControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
 
export default function Experience() {
 
  const { showPerformance } = useControls({
    showPerformance: false,
  });
 
  return (
    <>
 
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
 
        {/* <Html position={[0, 2, 0]}>
          <div className="top-3" style={{ textAlign: 'center', color: 'white', fontSize: '20px', opacity: 0.5 }}>
            Control with W, A, S, D
          </div>
        </Html> */}
 
        <group position={ [ 8, 2, -13 ] }>
            <mesh scale-x={5.07} scale-y={3.57} >
                <planeGeometry />
                <meshStandardMaterial color="black"/>
            </mesh>
            <mesh castShadow scale-x={5} scale-y={3.5} position-z={0.01}>
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
            <mesh castShadow scale-x={5} scale-y={3.5} position-z={0.01}>
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
            <mesh castShadow scale-x={5} scale-y={3.5} position-z={0.01}>
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
            <mesh castShadow scale-x={5} scale-y={3.5} position-z={0.01}>
                <planeGeometry />
                <VideoMaterial url="M09-1317.mp4" />
                <Text fontSize={0.05} font="fonts/PlayfairDisplay-Regular.ttf" position-y={0.54} position-x={-0.31} color="grey">
                IQAROS
                </Text>
            </mesh>
        </group>
           
 
        <mesh position-y={0} position-z={-10} rotation-x={-Math.PI * 0.5} scale={60}>
          <planeGeometry />
          <MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={0.5} color="black" />
        </mesh>
 
        <Player />
    </>
  );
}
 
function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />;
}
 
export function Player() {
  const cameraRef = useRef();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const controlsRef = useRef();
 
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    canvas.addEventListener('click', () => {
      document.body.requestPointerLock();
    });
 
    return () => {
      canvas.removeEventListener('click', () => {
        document.body.requestPointerLock();
      });
    };
  }, []);
 
 
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward } = getKeys();
    const moveSpeed = 6;
 
    if (forward) cameraRef.current.translateZ(-moveSpeed * delta);
    if (backward) cameraRef.current.translateZ(moveSpeed * delta);
    if (leftward) cameraRef.current.translateX(-moveSpeed * delta);
    if (rightward) cameraRef.current.translateX(moveSpeed * delta);
  });
 
  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={70} position-y={2} />
      <PointerLockControls ref={controlsRef} args={[cameraRef.current]} />
    </>
  );
}